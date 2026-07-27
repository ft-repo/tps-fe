// Shared, non-suite test helpers for src/lib/auth/**. Not a *.test.ts file, so
// vitest's default include never collects it as a suite of its own.

import { vi } from 'vitest'
import { createMemoryAuthStorage } from '@/lib/auth/authStorage'
import { createPassthroughLock } from '@/lib/auth/refreshLock'
import type { SessionManagerDeps } from '@/lib/auth/sessionManager'

function base64UrlEncode(input: string): string {
    const bytes = new TextEncoder().encode(input)
    let binary = ''
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
    })
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Build a real-shaped (unsigned) JWT string from a payload object, for tests. */
export function makeJwt(payload: Record<string, unknown>): string {
    const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const body = base64UrlEncode(JSON.stringify(payload))
    return `${header}.${body}.test-signature`
}

/** An error shaped like a definitive (res_code 40100) refresh rejection. */
export function makeInvalidError(status = 401) {
    return { response: { status, data: { res_code: 40100 } } }
}

/** An error shaped like a transient refresh failure (5xx / network / etc). */
export function makeTransientError(status = 500) {
    return { response: { status, data: {} } }
}

export type FakeTimerHandle = number

export type FakeClock = {
    now: () => number
    setTimer: (fn: () => void, ms: number) => FakeTimerHandle
    clearTimer: (handle: FakeTimerHandle) => void
    sleep: (ms: number) => Promise<void>
    /** Advance virtual time by ms, firing any timers due along the way in order. */
    advance: (ms: number) => Promise<void>
    /** Number of timers still armed. */
    pending: () => number
}

/**
 * A deterministic, manually-advanced clock: no real setTimeout, no vitest fake
 * timers. Tests control time explicitly via advance(), so there is no
 * interleaving ambiguity between "the timer fired" and "the promise chain
 * that timer triggered has settled".
 */
export function makeClock(start = 1_700_000_000_000): FakeClock {
    let currentTime = start
    let nextId = 1
    const timers = new Map<FakeTimerHandle, { at: number; fn: () => void }>()

    function now(): number {
        return currentTime
    }

    function setTimer(fn: () => void, ms: number): FakeTimerHandle {
        const id = nextId++
        timers.set(id, { at: currentTime + Math.max(0, ms), fn })
        return id
    }

    function clearTimer(handle: FakeTimerHandle): void {
        timers.delete(handle)
    }

    function sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimer(resolve, ms))
    }

    async function drainMicrotasks(): Promise<void> {
        for (let i = 0; i < 20; i++) await Promise.resolve()
    }

    async function advance(ms: number): Promise<void> {
        const target = currentTime + ms
        for (;;) {
            // Let any pending microtasks (promise .then chains from the last
            // timer fired, or from code that ran before advance() was even
            // called) settle BEFORE deciding what's due — a chain like
            // "sleep resolves -> reject -> arm the next sleep" needs to fully
            // play out or we'd miss the newly-armed timer.
            await drainMicrotasks()

            let dueId: FakeTimerHandle | null = null
            let dueAt = Infinity
            for (const [id, entry] of timers) {
                if (entry.at <= target && entry.at < dueAt) {
                    dueId = id
                    dueAt = entry.at
                }
            }
            if (dueId === null) break
            const entry = timers.get(dueId)!
            timers.delete(dueId)
            currentTime = entry.at
            entry.fn()
        }
        currentTime = target
    }

    function pending(): number {
        return timers.size
    }

    return { now, setTimer, clearTimer, sleep, advance, pending }
}

/**
 * Build a full SessionManagerDeps with sane defaults (memory storage,
 * passthrough lock, a fake clock, vi.fn() spies for refresh/onTokens/
 * onSessionExpired), overridable per test. Returns the pieces individually
 * too, so a test can assert on them without reaching back into `deps`.
 */
export function makeDeps(overrides?: {
    clock?: FakeClock
    storage?: SessionManagerDeps['storage']
    lock?: SessionManagerDeps['lock']
    refresh?: SessionManagerDeps['refresh']
    onTokens?: SessionManagerDeps['onTokens']
    onSessionExpired?: SessionManagerDeps['onSessionExpired']
    currentRole?: SessionManagerDeps['currentRole']
}) {
    const clock = overrides?.clock ?? makeClock()
    const storage = overrides?.storage ?? createMemoryAuthStorage()
    const lock = overrides?.lock ?? createPassthroughLock()
    const refresh = overrides?.refresh ?? vi.fn()
    const onTokens = overrides?.onTokens ?? vi.fn()
    const onSessionExpired = overrides?.onSessionExpired ?? vi.fn()

    const deps: SessionManagerDeps = {
        storage,
        refresh,
        lock,
        now: clock.now,
        setTimer: clock.setTimer,
        // FakeClock's handles are numbers; SessionManagerDeps only needs
        // whatever type setTimer hands back to be round-tripped into
        // clearTimer, so this narrowing is safe.
        clearTimer: clock.clearTimer as (handle: unknown) => void,
        sleep: clock.sleep,
        onTokens,
        onSessionExpired,
        currentRole: overrides?.currentRole,
    }

    return { deps, clock, storage, refresh, onTokens, onSessionExpired }
}
