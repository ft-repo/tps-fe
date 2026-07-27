import { describe, it, expect, vi, afterEach } from 'vitest'
import {
    createWebLock,
    createPassthroughLock,
    resolveRefreshLock,
    AUTH_REFRESH_LOCK_NAME,
    type LockManagerLike,
} from '@/lib/auth/refreshLock'

/** A fake LockManager that grants the lock immediately, running fn inline. */
function makeImmediateLock(): LockManagerLike & { request: ReturnType<typeof vi.fn> } {
    const request = vi.fn((_name: string, _opts: unknown, fn: () => Promise<unknown>) => fn())
    return { request } as unknown as LockManagerLike & { request: ReturnType<typeof vi.fn> }
}

/** A fake LockManager that queues callers FIFO, like the real Web Locks API. */
function makeQueueingLock(): LockManagerLike {
    let chain: Promise<unknown> = Promise.resolve()
    const request = vi.fn((_name: string, _opts: unknown, fn: () => Promise<unknown>) => {
        const run = chain.then(() => fn())
        chain = run.catch(() => undefined)
        return run
    })
    return { request } as unknown as LockManagerLike
}

/**
 * A fake LockManager that honours the AbortSignal the way the real Web
 * Locks API does: if the request hasn't been granted and the signal aborts,
 * the request rejects and the callback never runs.
 */
function makeNeverGrantingLock(): LockManagerLike {
    return {
        request: (_name, opts) =>
            new Promise((_resolve, reject) => {
                opts.signal?.addEventListener('abort', () => {
                    const err = new Error('The operation was aborted')
                    err.name = 'AbortError'
                    reject(err)
                })
            }),
    }
}

afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
})

describe('createWebLock', () => {
    it('passes the lock name through and propagates the callback return value', async () => {
        const locks = makeImmediateLock()
        const lock = createWebLock('my-lock-name', locks)
        await expect(lock(async () => 42)).resolves.toBe(42)
        expect(locks.request).toHaveBeenCalledWith(
            'my-lock-name',
            expect.any(Object),
            expect.any(Function),
        )
    })

    it('runs fn directly when no lock manager is available', async () => {
        const lock = createWebLock('x', undefined)
        await expect(lock(async () => 'ok')).resolves.toBe('ok')
    })

    it('serializes callers: the second does not start until the first resolves', async () => {
        const lock = createWebLock('x', makeQueueingLock())
        const order: string[] = []
        let releaseFirst: () => void = () => undefined

        const first = lock(async () => {
            order.push('first-start')
            await new Promise<void>((resolve) => {
                releaseFirst = resolve
            })
            order.push('first-end')
            return 'first'
        })
        const second = lock(async () => {
            order.push('second-start')
            return 'second'
        })

        await Promise.resolve()
        await Promise.resolve()
        expect(order).toEqual(['first-start'])

        releaseFirst()
        const [firstResult, secondResult] = await Promise.all([first, second])

        expect(order).toEqual(['first-start', 'first-end', 'second-start'])
        expect(firstResult).toBe('first')
        expect(secondResult).toBe('second')
    })

    it('proceeds unlocked when the acquire timeout elapses (no deadlock)', async () => {
        vi.useFakeTimers()
        const lock = createWebLock('x', makeNeverGrantingLock(), { acquireTimeoutMs: 1000 })
        const fn = vi.fn(async () => 'fallback-result')

        const resultPromise = lock(fn)
        await vi.advanceTimersByTimeAsync(1000)

        await expect(resultPromise).resolves.toBe('fallback-result')
        expect(fn).toHaveBeenCalledTimes(1)
    })
})

describe('createPassthroughLock', () => {
    it('always runs fn directly', async () => {
        const lock = createPassthroughLock()
        await expect(lock(async () => 'ok')).resolves.toBe('ok')
    })
})

describe('resolveRefreshLock', () => {
    it('falls back to running unlocked when navigator.locks is absent (e.g. jsdom)', async () => {
        const lock = resolveRefreshLock()
        await expect(lock(async () => 'ok')).resolves.toBe('ok')
    })

    it('uses an injected navigator.locks when provided', async () => {
        const locks = makeImmediateLock()
        const lock = resolveRefreshLock({ navigator: { locks } })
        await expect(lock(async () => 'ok')).resolves.toBe('ok')
        expect(locks.request).toHaveBeenCalledWith(
            AUTH_REFRESH_LOCK_NAME,
            expect.any(Object),
            expect.any(Function),
        )
    })

    it('reads the real navigator.locks global when no override is given', async () => {
        const locks = makeImmediateLock()
        vi.stubGlobal('navigator', { locks })
        const lock = resolveRefreshLock()
        await expect(lock(async () => 'ok')).resolves.toBe('ok')
        expect(locks.request).toHaveBeenCalled()
    })
})
