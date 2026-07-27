import { EMPTY_SNAPSHOT, type AuthSnapshot, type AuthStorage, type AuthRole } from './authStorage'
import type { RefreshLock } from './refreshLock'
import {
    computeRefreshAt,
    isRefreshDue,
    refreshTimerDelay,
    REFRESH_RETRY_DELAYS_MS,
    PROACTIVE_COOLDOWN_MS,
    IN_FLIGHT_RECHECK_MS,
} from './refreshSchedule'
import { classifyRefreshError, decideRefresh, type RefreshBlockedReason } from './refreshPolicy'

export type TimerHandle = unknown

export type RefreshResult = {
    accessToken: string
    /** undefined when the backend response omits it — the merge rule then
     * keeps the previously-stored refresh token, so rotating and
     * non-rotating backends both work unchanged. */
    refreshToken?: string | null
}

export type RefreshFn = (args: { refreshToken: string; role: AuthRole }) => Promise<RefreshResult>

export type RefreshTrigger = 'proactive' | 'reactive' | 'scheduled'

export type SessionExpiredReason =
    | 'invalid_refresh_token'
    | 'refresh_token_expired'
    | 'no_refresh_token'
    | 'other_tab_logout'
    | 'role_changed'

export class RefreshUnavailableError extends Error {
    reason: RefreshBlockedReason
    constructor(reason: RefreshBlockedReason) {
        super(`refresh unavailable: ${reason}`)
        this.name = 'RefreshUnavailableError'
        this.reason = reason
    }
}

export class RefreshFailedError extends Error {
    cause: unknown
    constructor(cause: unknown) {
        super('refresh failed')
        this.name = 'RefreshFailedError'
        this.cause = cause
    }
}

export interface SessionManagerDeps {
    storage: AuthStorage
    refresh: RefreshFn
    lock: RefreshLock
    now: () => number
    setTimer: (fn: () => void, ms: number) => TimerHandle
    clearTimer: (handle: TimerHandle) => void
    sleep: (ms: number) => Promise<void>
    /** Redux mirror update — production dispatches the new access token. */
    onTokens: (snapshot: AuthSnapshot) => void
    /** Terminal: production clears auth state and signals "session expired". */
    onSessionExpired: (reason: SessionExpiredReason) => void
    /** This tab's currently-known role, for the cross-tab identity-swap guard. */
    currentRole?: () => AuthRole | null
}

export interface SessionManagerState {
    readonly isRefreshing: boolean
    readonly proactiveCooldownUntil: number
    readonly waiters: number
    readonly armedFor: number
    readonly started: boolean
}

export interface SessionManager {
    getAccessToken(): string | null
    /** Request-interceptor entry point: park on an in-flight refresh, else
     * run the proactive check. Never rejects except for a parked request
     * whose in-flight refresh turned out to be a definitive failure. */
    ensureFreshToken(): Promise<void>
    /** Response-interceptor entry point for a 401/40100/40199. Never throws. */
    handleAuthChallenge(): Promise<'refreshed' | 'failed'>
    onLogin(args: { accessToken: string; refreshToken?: string | null; role: AuthRole }): void
    onLogout(): void
    /** Idempotent — safe to call from a React effect that may double-invoke. */
    start(): void
    /** Full teardown: clears the timer, unsubscribes, releases any waiters. */
    stop(): void
    readonly state: SessionManagerState
}

/**
 * All of drr-new-its-fe's module-level mutable state (isRefreshing,
 * subscribers, proactiveCooldownUntil, refreshTimer, refreshTimerFor) lives
 * inside this closure instead, so a test gets a virgin coordinator by simply
 * calling this function again — no resetForTests() needed.
 */
export function createSessionManager(deps: SessionManagerDeps): SessionManager {
    const { storage, refresh, lock, now, setTimer, clearTimer, sleep, onTokens, onSessionExpired, currentRole } =
        deps

    let isRefreshing = false
    let proactiveCooldownUntil = 0
    let waiters: Array<{ resolve: () => void; reject: (e: unknown) => void }> = []
    let timer: TimerHandle | null = null
    let armedFor = 0
    let unsubscribe: (() => void) | null = null
    let started = false

    function park(): Promise<void> {
        return new Promise((resolve, reject) => waiters.push({ resolve, reject }))
    }

    function settle(err?: unknown): void {
        const list = waiters
        waiters = []
        list.forEach((waiter) => (err ? waiter.reject(err) : waiter.resolve()))
    }

    function disarmTimer(): void {
        if (timer !== null) clearTimer(timer)
        timer = null
        armedFor = 0
    }

    // Idempotent re-arm keyed on refreshAt: repeatedly arming for the same
    // target time is a no-op, so callers can call this freely.
    function armTimer(refreshAt: number): void {
        if (refreshAt <= 0) return
        if (timer !== null && armedFor === refreshAt) return
        if (timer !== null) clearTimer(timer)
        armedFor = refreshAt
        timer = setTimer(() => void onTimerFire(), refreshTimerDelay(refreshAt, now()))
    }

    function applySnapshot(snapshot: AuthSnapshot): void {
        onTokens(snapshot)
        armTimer(snapshot.refreshAt)
    }

    function expireSession(reason: SessionExpiredReason): void {
        disarmTimer()
        storage.clear()
        onSessionExpired(reason)
    }

    /**
     * Runs under the cross-tab lock. Ported from drr-new-its-fe's
     * refreshWithRetry, plus a local refresh-token-expiry pre-check the
     * reference lacks (decideRefresh) and role-scoped endpoint selection.
     */
    async function refreshUnderLock(revBefore: number, tokenBefore: string | null): Promise<void> {
        // Someone else may have rotated the token while we queued on the
        // lock — re-check before ever calling the network.
        const snapshot = storage.read()
        if (snapshot.accessToken && (snapshot.rev > revBefore || snapshot.accessToken !== tokenBefore)) {
            applySnapshot(snapshot)
            return
        }

        const decision = decideRefresh(snapshot, now())
        if (!decision.attempt) throw new RefreshUnavailableError(decision.reason)

        let lastErr: unknown
        for (let attempt = 0; attempt < REFRESH_RETRY_DELAYS_MS.length; attempt++) {
            const delay = REFRESH_RETRY_DELAYS_MS[attempt]
            if (delay > 0) await sleep(delay)
            try {
                const result = await refresh({
                    refreshToken: snapshot.refreshToken as string,
                    role: snapshot.role ?? 'client',
                })
                const winner = storage.write(
                    {
                        accessToken: result.accessToken,
                        // Rotation-agnostic merge: keep the old RT unless a new
                        // non-blank one arrives, so rotating and non-rotating
                        // backends both work without knowing which we have.
                        refreshToken: result.refreshToken?.trim()
                            ? result.refreshToken
                            : snapshot.refreshToken,
                        refreshAt: computeRefreshAt(result.accessToken, now()),
                        role: snapshot.role,
                    },
                    snapshot.rev,
                )
                applySnapshot(winner)
                return
            } catch (err) {
                lastErr = err
                if (classifyRefreshError(err) === 'invalid') {
                    // Usually a rotation race: another holder already rotated
                    // this refresh_token. Re-check the shared snapshot before
                    // failing fast.
                    const current = storage.read()
                    if (
                        current.accessToken &&
                        (current.rev > revBefore || current.accessToken !== tokenBefore)
                    ) {
                        applySnapshot(current)
                        return
                    }
                    throw err
                }
            }
        }
        throw lastErr
    }

    async function runRefresh(trigger: RefreshTrigger): Promise<'refreshed' | 'failed'> {
        const before = storage.read()
        try {
            await lock(() => refreshUnderLock(before.rev, before.accessToken))
            proactiveCooldownUntil = 0
            settle()
            return 'refreshed'
        } catch (err) {
            // Last-chance rotation check: even a "definitive" failure might
            // have been overtaken by a concurrent successful write.
            const after = storage.read()
            if (after.accessToken && (after.rev > before.rev || after.accessToken !== before.accessToken)) {
                applySnapshot(after)
                settle()
                return 'refreshed'
            }
            if (err instanceof RefreshUnavailableError) {
                if (err.reason === 'refresh-token-expired') {
                    // Definitively dead — no ambiguity, no need to wait for a
                    // reactive 401 to confirm it.
                    settle(new RefreshFailedError(err))
                    expireSession('refresh_token_expired')
                } else if (trigger === 'reactive') {
                    // A migrated/legacy session with no refresh token hit a
                    // real 401 — today's behaviour (401 -> sign out), preserved.
                    settle(new RefreshFailedError(err))
                    expireSession('no_refresh_token')
                } else {
                    // Migrated session, but nothing failed yet (proactive/
                    // scheduled trigger) — do NOT sign the user out just
                    // because they have no refresh token; let them keep
                    // working until a real 401 says otherwise.
                    disarmTimer()
                    proactiveCooldownUntil = now() + PROACTIVE_COOLDOWN_MS
                    settle()
                }
                return 'failed'
            }
            if (classifyRefreshError(err) === 'invalid') {
                settle(new RefreshFailedError(err))
                expireSession('invalid_refresh_token')
                return 'failed'
            }
            // Transient (network/5xx/timeout): keep the session, fail only
            // this refresh attempt, cool down before trying proactively again.
            proactiveCooldownUntil = now() + PROACTIVE_COOLDOWN_MS
            settle(trigger === 'reactive' ? new RefreshFailedError(err) : undefined)
            return 'failed'
        } finally {
            isRefreshing = false
        }
    }

    function getAccessToken(): string | null {
        return storage.read().accessToken
    }

    async function ensureFreshToken(): Promise<void> {
        if (isRefreshing) {
            try {
                await park()
            } catch {
                // A parked reactive refresh failed definitively; the request
                // that called us will proceed with whatever token is current
                // (possibly none) and fail on its own — we don't rethrow here
                // because a *proactive* check must never reject the caller.
            }
            return
        }
        const snapshot = storage.read()
        if (!snapshot.accessToken) return
        armTimer(snapshot.refreshAt)
        const t = now()
        if (t < proactiveCooldownUntil) return
        if (!isRefreshDue(snapshot.refreshAt, t)) return
        // Claim synchronously, before any await — two requests racing into
        // this function in the same microtask both see `isRefreshing` only
        // after it has been set by whichever runs first, so at most one ever
        // starts a refresh. (drr-new-its-fe awaits its session read BEFORE
        // this check, which lets two concurrent requests both slip through.)
        isRefreshing = true
        await runRefresh('proactive')
    }

    async function handleAuthChallenge(): Promise<'refreshed' | 'failed'> {
        if (isRefreshing) {
            try {
                await park()
                return 'refreshed'
            } catch {
                return 'failed'
            }
        }
        const snapshot = storage.read()
        if (!snapshot.accessToken) return 'failed'
        isRefreshing = true
        return runRefresh('reactive')
    }

    async function onTimerFire(): Promise<void> {
        timer = null
        armedFor = 0
        const snapshot = storage.read()
        if (!snapshot.accessToken || snapshot.refreshAt <= 0) return // logged out — stay disarmed
        if (!isRefreshDue(snapshot.refreshAt, now())) {
            armTimer(snapshot.refreshAt) // refreshed elsewhere in the meantime
            return
        }
        if (isRefreshing) {
            armTimer(now() + IN_FLIGHT_RECHECK_MS)
            return
        }
        isRefreshing = true
        await runRefresh('scheduled')
        const next = storage.read()
        if (!next.accessToken) return // session ended during the attempt
        armTimer(next.refreshAt > now() ? next.refreshAt : now() + PROACTIVE_COOLDOWN_MS)
    }

    function onExternal(snapshot: AuthSnapshot): void {
        if (!snapshot.accessToken) {
            disarmTimer()
            onSessionExpired('other_tab_logout')
            return
        }
        const mine = currentRole?.() ?? null
        if (mine && snapshot.role && snapshot.role !== mine) {
            onSessionExpired('role_changed')
            return
        }
        applySnapshot(snapshot)
        // Another tab already refreshed for us — unpark anything waiting.
        // Harmless no-op if nothing is parked; if OUR OWN refresh is still
        // in flight it will find the rotated token via refreshUnderLock's
        // own rev/token comparison and skip the network call.
        settle()
    }

    function onLogin(args: { accessToken: string; refreshToken?: string | null; role: AuthRole }): void {
        const snapshot = storage.write({
            accessToken: args.accessToken,
            refreshToken: args.refreshToken ?? null,
            refreshAt: computeRefreshAt(args.accessToken, now()),
            role: args.role,
        })
        proactiveCooldownUntil = 0
        applySnapshot(snapshot)
    }

    function onLogout(): void {
        disarmTimer()
        storage.clear()
    }

    function start(): void {
        if (started) return
        started = true
        unsubscribe = storage.subscribe(onExternal)
        const snapshot = storage.read()
        if (snapshot.accessToken) armTimer(snapshot.refreshAt)
    }

    function stop(): void {
        started = false
        disarmTimer()
        if (unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
        settle()
    }

    return {
        getAccessToken,
        ensureFreshToken,
        handleAuthChallenge,
        onLogin,
        onLogout,
        start,
        stop,
        get state(): SessionManagerState {
            return { isRefreshing, proactiveCooldownUntil, waiters: waiters.length, armedFor, started }
        },
    }
}

export { EMPTY_SNAPSHOT }
