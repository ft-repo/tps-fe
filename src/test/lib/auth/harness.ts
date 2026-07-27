// Shared, non-suite test helpers for src/lib/auth/**. Not a *.test.ts file, so
// vitest's default include never collects it as a suite of its own.

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

    async function advance(ms: number): Promise<void> {
        const target = currentTime + ms
        for (;;) {
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
            // Let microtasks queued by this timer (promise chains) settle
            // before deciding whether another timer is now due.
            await Promise.resolve()
            await Promise.resolve()
        }
        currentTime = target
    }

    function pending(): number {
        return timers.size
    }

    return { now, setTimer, clearTimer, sleep, advance, pending }
}
