import { getJwtExpMs } from './jwt'

// Refresh this long before the access token's own `exp`. Ported from
// drr-new-its-fe's REFRESH_LEAD_MS — deriving refresh_at from the JWT
// auto-tracks the backend TTL with no manual sync needed.
export const REFRESH_LEAD_MS = 3 * 60 * 1000
export const MIN_REFRESH_DELAY_MS = 30 * 1000
export const FALLBACK_REFRESH_MS = 12 * 60 * 1000

export const PROACTIVE_COOLDOWN_MS = 60 * 1000
export const IN_FLIGHT_RECHECK_MS = 5 * 1000

export const MIN_TIMER_DELAY_MS = 1000
// Chunk long waits into a heartbeat: tps-fe's ~24h access tokens would need a
// single ~24h setTimeout, which browsers throttle in a backgrounded tab and
// which drifts arbitrarily after the machine sleeps. A short, self-re-arming
// heartbeat self-corrects on the very next tick instead.
export const MAX_TIMER_DELAY_MS = 10 * 60 * 1000

export const REFRESH_RETRY_DELAYS_MS: readonly number[] = [0, 800, 2000]

/**
 * exp*1000 - REFRESH_LEAD_MS, clamped to >= now + MIN_REFRESH_DELAY_MS.
 * Falls back to now + FALLBACK_REFRESH_MS when the token is unparseable or
 * carries no `exp`. Ported 1:1 from drr-new-its-fe's computeRefreshAt.
 */
export function computeRefreshAt(accessToken: string | null | undefined, now: number): number {
    const expMs = getJwtExpMs(accessToken)
    if (expMs !== null) {
        return Math.max(now + MIN_REFRESH_DELAY_MS, expMs - REFRESH_LEAD_MS)
    }
    return now + FALLBACK_REFRESH_MS
}

/** A positive refreshAt that has already been reached. Tolerates 0/undefined. */
export function isRefreshDue(refreshAt: number | null | undefined, now: number): boolean {
    return typeof refreshAt === 'number' && refreshAt > 0 && now >= refreshAt
}

/** Delay for a setTimeout targeting refreshAt, clamped to [MIN, MAX]. */
export function refreshTimerDelay(refreshAt: number, now: number): number {
    return Math.min(MAX_TIMER_DELAY_MS, Math.max(MIN_TIMER_DELAY_MS, refreshAt - now))
}
