// Cross-tab mutex around the refresh call, so two tabs racing to refresh at
// the same moment don't both send the same (about to be rotated) refresh
// token. This is a contention OPTIMISER, not the correctness mechanism —
// correctness comes from the rev-based compare-and-swap in authStorage.ts.
// Ported from drr-new-its-fe's withRefreshLock, with one addition: an acquire
// timeout, since Web Locks has none and a hung refresh (network timeout x a
// multi-attempt retry ladder) would otherwise freeze every other tab.

export const AUTH_REFRESH_LOCK_NAME = 'tps-auth-refresh'

export type RefreshLock = <T>(fn: () => Promise<T>) => Promise<T>

export interface LockManagerLike {
    request<T>(
        name: string,
        options: { signal?: AbortSignal },
        callback: () => Promise<T>,
    ): Promise<T>
}

const DEFAULT_ACQUIRE_TIMEOUT_MS = 10_000

/**
 * `locks` is an ARGUMENT, not read from a global — tests inject a fake
 * LockManagerLike rather than stubbing `navigator.locks`.
 */
export function createWebLock(
    name: string,
    locks: LockManagerLike | undefined,
    options?: { acquireTimeoutMs?: number },
): RefreshLock {
    const acquireTimeoutMs = options?.acquireTimeoutMs ?? DEFAULT_ACQUIRE_TIMEOUT_MS

    return async function withLock<T>(fn: () => Promise<T>): Promise<T> {
        if (!locks?.request) return fn()

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), acquireTimeoutMs)
        try {
            return await locks.request(name, { signal: controller.signal }, fn)
        } catch (err) {
            // Per the Web Locks spec, aborting has no effect once the lock has
            // already been granted (the callback runs to completion and the
            // request resolves normally) — so reaching this catch with our own
            // abort signal set means the lock was never granted within the
            // timeout. Proceed unlocked rather than deadlock indefinitely.
            if (controller.signal.aborted) return fn()
            throw err
        } finally {
            clearTimeout(timeoutId)
        }
    }
}

export function createPassthroughLock(): RefreshLock {
    return function withoutLock<T>(fn: () => Promise<T>): Promise<T> {
        return fn()
    }
}

/** Composition helper used by the production wiring. */
export function resolveRefreshLock(env?: {
    navigator?: { locks?: LockManagerLike }
    acquireTimeoutMs?: number
}): RefreshLock {
    const nav = env?.navigator ?? (typeof navigator !== 'undefined' ? navigator : undefined)
    const locks = nav?.locks as LockManagerLike | undefined
    return createWebLock(AUTH_REFRESH_LOCK_NAME, locks, {
        acquireTimeoutMs: env?.acquireTimeoutMs,
    })
}
