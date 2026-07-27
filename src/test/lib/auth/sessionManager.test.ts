import { describe, it, expect, vi } from 'vitest'
import { createSessionManager } from '@/lib/auth/sessionManager'
import {
    createMemoryAuthStorage,
    EMPTY_SNAPSHOT,
    type AuthSnapshot,
    type AuthStorage,
} from '@/lib/auth/authStorage'
import { makeClock, makeDeps, makeJwt, makeInvalidError, makeTransientError } from './harness'

const NOW = 1_700_000_000_000

function healthyRefreshToken(now: number): string {
    return makeJwt({ exp: (now + 7 * 24 * 60 * 60 * 1000) / 1000 })
}

/**
 * A hand-rolled AuthStorage whose subscribe() listener can be invoked
 * directly by a test to simulate "another tab wrote this". Distinct from
 * createMemoryAuthStorage (which deliberately never self-notifies, mirroring
 * real same-document storage-event semantics) — this one exists purely to
 * drive the cross-tab path under test control.
 */
function makeStorageWithExternalTrigger(initial: Partial<AuthSnapshot> = {}) {
    let snapshot: AuthSnapshot = { ...EMPTY_SNAPSHOT, ...initial }
    let listener: ((s: AuthSnapshot) => void) | null = null
    const storage: AuthStorage = {
        read: () => snapshot,
        write: (next, expectedRev) => {
            if (expectedRev !== undefined && snapshot.rev !== expectedRev) return snapshot
            snapshot = { ...next, rev: snapshot.rev + 1 }
            return snapshot
        },
        clear: () => {
            snapshot = EMPTY_SNAPSHOT
        },
        subscribe: (l) => {
            listener = l
            return () => {
                listener = null
            }
        },
    }
    return {
        storage,
        /** Simulate "another tab wrote `next`, and we received the storage event". */
        fireExternal(next: AuthSnapshot) {
            snapshot = next
            listener?.(next)
        },
    }
}

describe('sessionManager basics', () => {
    it('getAccessToken reflects the current snapshot', () => {
        const { deps } = makeDeps({ clock: makeClock(NOW), storage: createMemoryAuthStorage({ accessToken: 'a' }) })
        const sm = createSessionManager(deps)
        expect(sm.getAccessToken()).toBe('a')
    })

    it('ensureFreshToken is a no-op when signed out', async () => {
        const refresh = vi.fn()
        const { deps } = makeDeps({ clock: makeClock(NOW), refresh })
        const sm = createSessionManager(deps)
        await sm.ensureFreshToken()
        expect(refresh).not.toHaveBeenCalled()
    })

    it('handleAuthChallenge returns failed immediately when already signed out', async () => {
        const refresh = vi.fn()
        const { deps } = makeDeps({ clock: makeClock(NOW), refresh })
        const sm = createSessionManager(deps)
        expect(await sm.handleAuthChallenge()).toBe('failed')
        expect(refresh).not.toHaveBeenCalled()
    })

    it('onLogin writes a fresh snapshot and arms the timer', () => {
        const clock = makeClock(NOW)
        const { deps, onTokens } = makeDeps({ clock })
        const sm = createSessionManager(deps)
        const accessToken = makeJwt({ exp: (clock.now() + 60 * 60 * 1000) / 1000 })
        sm.onLogin({ accessToken, refreshToken: healthyRefreshToken(clock.now()), role: 'client' })
        expect(sm.getAccessToken()).toBe(accessToken)
        expect(onTokens).toHaveBeenCalled()
        expect(clock.pending()).toBe(1)
    })

    it('onLogout clears the snapshot and disarms the timer', () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({ accessToken: 'a', refreshAt: clock.now() + 5000, rev: 1 })
        const { deps } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()
        expect(clock.pending()).toBe(1)
        sm.onLogout()
        expect(sm.getAccessToken()).toBeNull()
        expect(clock.pending()).toBe(0)
    })
})

describe('single-flight', () => {
    it('N concurrent handleAuthChallenge calls trigger exactly one refresh call', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        let resolveRefresh: (value: { accessToken: string }) => void = () => undefined
        const refresh = vi.fn(
            () =>
                new Promise<{ accessToken: string }>((resolve) => {
                    resolveRefresh = resolve
                }),
        )
        const { deps, onTokens } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const p1 = sm.handleAuthChallenge()
        const p2 = sm.handleAuthChallenge()
        const p3 = sm.handleAuthChallenge()

        await Promise.resolve()
        expect(refresh).toHaveBeenCalledTimes(1)
        expect(sm.state.waiters).toBe(2)

        resolveRefresh({ accessToken: 'new-access' })
        const results = await Promise.all([p1, p2, p3])

        expect(results).toEqual(['refreshed', 'refreshed', 'refreshed'])
        expect(refresh).toHaveBeenCalledTimes(1)
        expect(onTokens).toHaveBeenCalledWith(expect.objectContaining({ accessToken: 'new-access' }))
    })

    it('the request interceptor path (ensureFreshToken) also parks behind an in-flight refresh', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: clock.now() - 1,
            role: 'client',
            rev: 1,
        })
        let resolveRefresh: (value: { accessToken: string }) => void = () => undefined
        const refresh = vi.fn(
            () =>
                new Promise<{ accessToken: string }>((resolve) => {
                    resolveRefresh = resolve
                }),
        )
        const { deps } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const firstCheck = sm.ensureFreshToken() // proactive: kicks off the refresh
        await Promise.resolve()
        expect(refresh).toHaveBeenCalledTimes(1)

        const secondCheck = sm.ensureFreshToken() // a second outbound request, parks
        await Promise.resolve()
        expect(sm.state.waiters).toBe(1)

        resolveRefresh({ accessToken: 'new-access' })
        await Promise.all([firstCheck, secondCheck])
        expect(refresh).toHaveBeenCalledTimes(1)
    })
})

describe('retry ladder', () => {
    it('retries at [0, 800, 2000]ms and succeeds on the third attempt', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi
            .fn()
            .mockRejectedValueOnce(makeTransientError())
            .mockRejectedValueOnce(makeTransientError())
            .mockResolvedValueOnce({ accessToken: 'new-access' })
        const { deps, onTokens } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const resultPromise = sm.handleAuthChallenge()

        await clock.advance(0)
        expect(refresh).toHaveBeenCalledTimes(1)
        await clock.advance(800)
        expect(refresh).toHaveBeenCalledTimes(2)
        await clock.advance(2000)
        expect(refresh).toHaveBeenCalledTimes(3)

        expect(await resultPromise).toBe('refreshed')
        expect(onTokens).toHaveBeenCalledWith(expect.objectContaining({ accessToken: 'new-access' }))
    })

    it('all-transient failures fail the call, keep the session, and start a cooldown', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn().mockRejectedValue(makeTransientError())
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const resultPromise = sm.handleAuthChallenge()
        await clock.advance(0)
        await clock.advance(800)
        await clock.advance(2000)

        expect(await resultPromise).toBe('failed')
        expect(refresh).toHaveBeenCalledTimes(3)
        expect(onSessionExpired).not.toHaveBeenCalled()
        expect(sm.state.proactiveCooldownUntil).toBe(clock.now() + 60_000)
    })

    it('fails fast (no further retries) on a definitive-invalid error and logs out', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn().mockRejectedValue(makeInvalidError())
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const result = await sm.handleAuthChallenge()

        expect(result).toBe('failed')
        expect(refresh).toHaveBeenCalledTimes(1)
        expect(onSessionExpired).toHaveBeenCalledWith('invalid_refresh_token')
    })
})

describe('rotation race', () => {
    it('never calls refresh when the lock reveals the token was already rotated', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn()
        const rotatingLock = async <T,>(fn: () => Promise<T>): Promise<T> => {
            storage.write({ accessToken: 'rotated-by-other-tab', refreshToken: rt, refreshAt: 0, role: 'client' })
            return fn()
        }
        const { deps } = makeDeps({ clock, storage, refresh, lock: rotatingLock })
        const sm = createSessionManager(deps)

        const result = await sm.handleAuthChallenge()

        expect(result).toBe('refreshed')
        expect(refresh).not.toHaveBeenCalled()
        expect(sm.getAccessToken()).toBe('rotated-by-other-tab')
    })

    it('treats a rotation that happened during our own failed call as success (no logout)', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn(async () => {
            // Simulate a concurrent rotation landing exactly around our call.
            storage.write({ accessToken: 'rotated-during-call', refreshToken: rt, refreshAt: 0, role: 'client' })
            throw makeInvalidError()
        })
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const result = await sm.handleAuthChallenge()

        expect(result).toBe('refreshed')
        expect(onSessionExpired).not.toHaveBeenCalled()
        expect(sm.getAccessToken()).toBe('rotated-during-call')
    })

    it('logs out exactly once on a genuine invalid failure with no concurrent write', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn().mockRejectedValue(makeInvalidError())
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const result = await sm.handleAuthChallenge()

        expect(result).toBe('failed')
        expect(onSessionExpired).toHaveBeenCalledTimes(1)
        expect(onSessionExpired).toHaveBeenCalledWith('invalid_refresh_token')
        expect(sm.getAccessToken()).toBeNull()
    })
})

describe('background timer', () => {
    it('start() arms exactly one timer', () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({
            accessToken: 'a',
            refreshToken: 'r',
            refreshAt: clock.now() + 5000,
            role: 'client',
            rev: 1,
        })
        const { deps } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()
        expect(clock.pending()).toBe(1)
    })

    it('start() is idempotent (React StrictMode double-invoke safe)', () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({
            accessToken: 'a',
            refreshToken: 'r',
            refreshAt: clock.now() + 5000,
            role: 'client',
            rev: 1,
        })
        const { deps } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()
        sm.start()
        expect(clock.pending()).toBe(1)
    })

    it('a fire before the refresh is due re-arms without calling refresh (heartbeat)', async () => {
        const clock = makeClock(NOW)
        const farRefreshAt = clock.now() + 24 * 60 * 60 * 1000 // ~24h out
        const storage = createMemoryAuthStorage({
            accessToken: 'a',
            refreshToken: 'r',
            refreshAt: farRefreshAt,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn()
        const { deps } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)
        sm.start()

        // The first arm is clamped to MAX_TIMER_DELAY_MS (10 min), long before farRefreshAt.
        await clock.advance(10 * 60 * 1000)

        expect(refresh).not.toHaveBeenCalled()
        expect(clock.pending()).toBe(1) // re-armed
    })

    it('a fire once due calls refresh exactly once', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const dueAt = clock.now() + 2000
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: dueAt,
            role: 'client',
            rev: 1,
        })
        const refresh = vi.fn().mockResolvedValue({ accessToken: 'new' })
        const { deps, onTokens } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)
        sm.start()

        await clock.advance(2000)

        expect(refresh).toHaveBeenCalledTimes(1)
        expect(onTokens).toHaveBeenCalledWith(expect.objectContaining({ accessToken: 'new' }))
    })

    it('a timer firing while a refresh is already in flight re-arms at +5s without calling refresh again', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        // refreshAt already due -> ensureFreshToken both starts a refresh AND
        // arms a ~1s timer (clamped up from a negative delay).
        const storage = createMemoryAuthStorage({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: clock.now() - 1,
            role: 'client',
            rev: 1,
        })
        let resolveRefresh: (value: { accessToken: string }) => void = () => undefined
        const refresh = vi.fn(
            () =>
                new Promise<{ accessToken: string }>((resolve) => {
                    resolveRefresh = resolve
                }),
        )
        const { deps } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        void sm.ensureFreshToken()
        await Promise.resolve()
        expect(refresh).toHaveBeenCalledTimes(1)
        expect(sm.state.isRefreshing).toBe(true)
        expect(clock.pending()).toBe(1) // the ~1s timer armed by ensureFreshToken

        await clock.advance(1000) // that timer fires while still in flight

        expect(refresh).toHaveBeenCalledTimes(1) // not called again
        expect(clock.pending()).toBe(1) // re-armed at +5s

        resolveRefresh({ accessToken: 'new' })
        await Promise.resolve()
        await Promise.resolve()
    })

    it('stop() clears the armed timer', () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({
            accessToken: 'a',
            refreshToken: 'r',
            refreshAt: clock.now() + 5000,
            role: 'client',
            rev: 1,
        })
        const { deps } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()
        sm.stop()
        expect(clock.pending()).toBe(0)
    })
})

describe('cross-tab sync', () => {
    it('an external snapshot updates tokens and re-arms the timer', () => {
        const clock = makeClock(NOW)
        const { storage, fireExternal } = makeStorageWithExternalTrigger({
            accessToken: 'old',
            refreshToken: 'r',
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const { deps, onTokens } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()

        fireExternal({
            accessToken: 'from-other-tab',
            refreshToken: 'r2',
            refreshAt: clock.now() + 5000,
            role: 'client',
            rev: 2,
        })

        expect(onTokens).toHaveBeenCalledWith(expect.objectContaining({ accessToken: 'from-other-tab' }))
        expect(clock.pending()).toBe(1)
    })

    it('resolves a parked waiter when another tab already refreshed', async () => {
        const clock = makeClock(NOW)
        const rt = healthyRefreshToken(clock.now())
        const { storage, fireExternal } = makeStorageWithExternalTrigger({
            accessToken: 'old',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        let resolveRefresh: (value: { accessToken: string }) => void = () => undefined
        const refresh = vi.fn(
            () =>
                new Promise<{ accessToken: string }>((resolve) => {
                    resolveRefresh = resolve
                }),
        )
        const { deps } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)
        sm.start()

        const p1 = sm.handleAuthChallenge() // starts the (hanging) refresh
        await Promise.resolve()
        const p2 = sm.handleAuthChallenge() // parks behind it
        await Promise.resolve()
        expect(sm.state.waiters).toBe(1)

        fireExternal({
            accessToken: 'rotated-elsewhere',
            refreshToken: rt,
            refreshAt: 0,
            role: 'client',
            rev: 2,
        })

        expect(await p2).toBe('refreshed')

        // Let the still-hanging first refresh settle so nothing dangles.
        resolveRefresh({ accessToken: 'ignored' })
        await p1
    })

    it('an empty external snapshot triggers other_tab_logout and disarms the timer', () => {
        const clock = makeClock(NOW)
        const { storage, fireExternal } = makeStorageWithExternalTrigger({
            accessToken: 'old',
            refreshToken: 'r',
            refreshAt: clock.now() + 5000,
            role: 'client',
            rev: 1,
        })
        const { deps, onSessionExpired } = makeDeps({ clock, storage })
        const sm = createSessionManager(deps)
        sm.start()
        expect(clock.pending()).toBe(1)

        fireExternal(EMPTY_SNAPSHOT)

        expect(onSessionExpired).toHaveBeenCalledWith('other_tab_logout')
        expect(clock.pending()).toBe(0)
    })

    it('a role mismatch triggers role_changed instead of silently swapping identity', () => {
        const clock = makeClock(NOW)
        const { storage, fireExternal } = makeStorageWithExternalTrigger({
            accessToken: 'old',
            refreshToken: 'r',
            refreshAt: 0,
            role: 'client',
            rev: 1,
        })
        const { deps, onSessionExpired } = makeDeps({ clock, storage, currentRole: () => 'client' })
        const sm = createSessionManager(deps)
        sm.start()

        fireExternal({
            accessToken: 'staff-token',
            refreshToken: 'r2',
            refreshAt: 0,
            role: 'admin',
            rev: 2,
        })

        expect(onSessionExpired).toHaveBeenCalledWith('role_changed')
    })
})

describe('migration (session with no refresh token)', () => {
    it('a proactive check does not log out when there is no refresh token yet', async () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({
            accessToken: 'legacy',
            refreshToken: null,
            refreshAt: clock.now() - 1,
            role: null,
            rev: 0,
        })
        const refresh = vi.fn()
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        await sm.ensureFreshToken()

        expect(refresh).not.toHaveBeenCalled()
        expect(onSessionExpired).not.toHaveBeenCalled()
        expect(sm.state.proactiveCooldownUntil).toBeGreaterThan(clock.now())
    })

    it('a reactive 401 does log out when there is no refresh token', async () => {
        const clock = makeClock(NOW)
        const storage = createMemoryAuthStorage({
            accessToken: 'legacy',
            refreshToken: null,
            refreshAt: clock.now() - 1,
            role: null,
            rev: 0,
        })
        const refresh = vi.fn()
        const { deps, onSessionExpired } = makeDeps({ clock, storage, refresh })
        const sm = createSessionManager(deps)

        const result = await sm.handleAuthChallenge()

        expect(result).toBe('failed')
        expect(refresh).not.toHaveBeenCalled()
        expect(onSessionExpired).toHaveBeenCalledWith('no_refresh_token')
    })
})
