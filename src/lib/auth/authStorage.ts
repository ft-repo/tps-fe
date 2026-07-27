import deepParseJson from '@/utils/deepParseJson'
import { computeRefreshAt } from './refreshSchedule'

export type AuthRole = 'client' | 'admin'

/**
 * The cross-tab source of truth for the refresh token, kept in a dedicated
 * localStorage key rather than the redux-persist `admin` blob. redux-persist
 * writes asynchronously (batched on a tick), which would make the rotation-
 * race window flaky; this key is written synchronously and carries a `rev`
 * counter so writers can detect (and lose to) a concurrent writer via
 * compare-and-swap instead of clobbering it.
 */
export interface AuthSnapshot {
    accessToken: string | null
    refreshToken: string | null
    /** epoch ms; 0 = unknown/not scheduled */
    refreshAt: number
    /** which backend path to refresh against; null for legacy/migrated sessions */
    role: AuthRole | null
    /** monotonic write counter — the CAS and rotation-race primitive */
    rev: number
}

export const EMPTY_SNAPSHOT: AuthSnapshot = {
    accessToken: null,
    refreshToken: null,
    refreshAt: 0,
    role: null,
    rev: 0,
}

export const AUTH_STORAGE_KEY = 'tps.auth.v1'

function isAuthRole(value: unknown): value is AuthRole {
    return value === 'client' || value === 'admin'
}

/** Never throws. Unknown/partial/garbage input -> EMPTY_SNAPSHOT. */
export function parseAuthSnapshot(raw: string | null | undefined): AuthSnapshot {
    if (!raw) return EMPTY_SNAPSHOT
    try {
        const parsed: unknown = JSON.parse(raw)
        if (!parsed || typeof parsed !== 'object') return EMPTY_SNAPSHOT
        const p = parsed as Record<string, unknown>
        const accessToken = typeof p.accessToken === 'string' && p.accessToken ? p.accessToken : null
        if (!accessToken) return EMPTY_SNAPSHOT
        const refreshToken =
            typeof p.refreshToken === 'string' && p.refreshToken ? p.refreshToken : null
        const refreshAt =
            typeof p.refreshAt === 'number' && Number.isFinite(p.refreshAt) ? p.refreshAt : 0
        const role = isAuthRole(p.role) ? p.role : null
        const rev = typeof p.rev === 'number' && Number.isFinite(p.rev) ? p.rev : 0
        return { accessToken, refreshToken, refreshAt, role, rev }
    } catch {
        return EMPTY_SNAPSHOT
    }
}

export function serializeAuthSnapshot(snapshot: AuthSnapshot): string {
    return JSON.stringify(snapshot)
}

/** ['ADMIN'] -> 'admin'; ['USER'] -> 'client'; anything else -> null. */
export function roleFromAuthority(authority: string[] | null | undefined): AuthRole | null {
    if (!Array.isArray(authority)) return null
    if (authority.includes('ADMIN')) return 'admin'
    if (authority.includes('USER')) return 'client'
    return null
}

/**
 * Migration seed: build a snapshot from the redux-persist `admin` blob for a
 * user who was already signed in before this feature shipped (tps.auth.v1
 * does not exist yet for them). refreshToken is deliberately null — such a
 * session gets exactly one clean sign-out on its next 401 (today's
 * behaviour, preserved) instead of a doomed refresh attempt.
 */
export function snapshotFromPersistBlob(
    rawPersistBlob: string | null | undefined,
    now: number,
): AuthSnapshot {
    if (!rawPersistBlob) return EMPTY_SNAPSHOT
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = deepParseJson(rawPersistBlob) as any
        const token = parsed?.auth?.session?.token
        if (!token || typeof token !== 'string') return EMPTY_SNAPSHOT
        const authority = parsed?.auth?.user?.authority
        return {
            accessToken: token,
            refreshToken: null,
            refreshAt: computeRefreshAt(token, now),
            role: roleFromAuthority(authority),
            rev: 0,
        }
    } catch {
        return EMPTY_SNAPSHOT
    }
}

export interface AuthStorage {
    read(): AuthSnapshot
    /**
     * Compare-and-swap. When expectedRev is given and it no longer matches
     * the stored rev, the write is DROPPED and the current (winning)
     * snapshot is returned instead. Bumps rev on a successful write.
     */
    write(next: Omit<AuthSnapshot, 'rev'>, expectedRev?: number): AuthSnapshot
    clear(): void
    /** Cross-tab fan-out. Returns an unsubscribe function. */
    subscribe(listener: (snapshot: AuthSnapshot) => void): () => void
}

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
type WindowLike = Pick<Window, 'addEventListener' | 'removeEventListener'>

/**
 * Production implementation: localStorage + the browser's `storage` event
 * (which only ever fires in OTHER documents/tabs, never the one that wrote —
 * this is what makes the cross-tab wiring dispatch-loop-free by construction).
 */
export function createLocalStorageAuthStorage(options?: {
    key?: string
    storage?: StorageLike
    target?: WindowLike
}): AuthStorage {
    const key = options?.key ?? AUTH_STORAGE_KEY
    const storage: StorageLike | undefined =
        options?.storage ?? (typeof localStorage !== 'undefined' ? localStorage : undefined)
    const target: WindowLike | undefined =
        options?.target ?? (typeof window !== 'undefined' ? window : undefined)

    let cache: { raw: string; snapshot: AuthSnapshot } | null = null

    function safeGetItem(): string | null {
        try {
            return storage?.getItem(key) ?? null
        } catch {
            // private-mode / storage disabled / quota errors on read (rare)
            return null
        }
    }

    function read(): AuthSnapshot {
        const raw = safeGetItem()
        if (raw === null) {
            cache = null
            return EMPTY_SNAPSHOT
        }
        if (cache && cache.raw === raw) return cache.snapshot
        const snapshot = parseAuthSnapshot(raw)
        cache = { raw, snapshot }
        return snapshot
    }

    function write(next: Omit<AuthSnapshot, 'rev'>, expectedRev?: number): AuthSnapshot {
        const current = read()
        if (expectedRev !== undefined && current.rev !== expectedRev) {
            return current
        }
        const snapshot: AuthSnapshot = { ...next, rev: current.rev + 1 }
        const raw = serializeAuthSnapshot(snapshot)
        try {
            storage?.setItem(key, raw)
            cache = { raw, snapshot }
        } catch {
            // storage full/unavailable — still hand back the intended value so
            // this tab keeps working; other tabs simply won't see the update
            cache = null
        }
        return snapshot
    }

    function clear(): void {
        try {
            storage?.removeItem(key)
        } catch {
            // ignore
        }
        cache = null
    }

    function subscribe(listener: (snapshot: AuthSnapshot) => void): () => void {
        if (!target?.addEventListener) return () => {}
        let lastAppliedRev = read().rev
        const handler = (event: Event) => {
            const storageEvent = event as StorageEvent
            if (storageEvent.key !== key) return
            if (storageEvent.newValue === null) {
                // explicit clear from another tab — always propagate
                cache = null
                lastAppliedRev = 0
                listener(EMPTY_SNAPSHOT)
                return
            }
            if (storageEvent.newValue === storageEvent.oldValue) return
            const snapshot = parseAuthSnapshot(storageEvent.newValue)
            // Feedback-loop / stale-event guard: only react to a strictly
            // newer write than the last one we already applied.
            if (snapshot.rev <= lastAppliedRev) return
            lastAppliedRev = snapshot.rev
            cache = { raw: storageEvent.newValue, snapshot }
            listener(snapshot)
        }
        target.addEventListener('storage', handler)
        return () => target.removeEventListener('storage', handler)
    }

    return { read, write, clear, subscribe }
}

/**
 * Simple in-memory AuthStorage for tests. Read/write/clear behave like the
 * real thing (including CAS); `subscribe` just bookkeeps listeners — it does
 * NOT self-notify on write/clear (mirroring the real `storage` event, which
 * never fires in the document that made the change). Tests that need to
 * simulate "another tab wrote" should invoke the captured listener directly.
 */
export function createMemoryAuthStorage(initial?: Partial<AuthSnapshot>): AuthStorage {
    let snapshot: AuthSnapshot = { ...EMPTY_SNAPSHOT, ...initial }
    const listeners = new Set<(snapshot: AuthSnapshot) => void>()

    function read(): AuthSnapshot {
        return snapshot
    }

    function write(next: Omit<AuthSnapshot, 'rev'>, expectedRev?: number): AuthSnapshot {
        if (expectedRev !== undefined && snapshot.rev !== expectedRev) {
            return snapshot
        }
        snapshot = { ...next, rev: snapshot.rev + 1 }
        return snapshot
    }

    function clear(): void {
        snapshot = EMPTY_SNAPSHOT
    }

    function subscribe(listener: (snapshot: AuthSnapshot) => void): () => void {
        listeners.add(listener)
        return () => listeners.delete(listener)
    }

    return { read, write, clear, subscribe }
}
