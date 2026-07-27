import { describe, it, expect } from 'vitest'
import {
    computeRefreshAt,
    isRefreshDue,
    refreshTimerDelay,
    MIN_REFRESH_DELAY_MS,
    FALLBACK_REFRESH_MS,
    MAX_TIMER_DELAY_MS,
    MIN_TIMER_DELAY_MS,
} from '@/lib/auth/refreshSchedule'
import { makeJwt } from './harness'

const NOW = 1_700_000_000_000

describe('computeRefreshAt', () => {
    it('is exp - 3min when that stays comfortably in the future', () => {
        const expMs = NOW + 1_000_000
        const token = makeJwt({ exp: expMs / 1000 })
        expect(computeRefreshAt(token, NOW)).toBe(expMs - 3 * 60 * 1000)
    })

    it('clamps to now + MIN_REFRESH_DELAY_MS when exp is only ~1 minute out', () => {
        const expMs = NOW + 60 * 1000
        const token = makeJwt({ exp: expMs / 1000 })
        expect(computeRefreshAt(token, NOW)).toBe(NOW + MIN_REFRESH_DELAY_MS)
    })

    it('clamps to now + MIN_REFRESH_DELAY_MS when exp has already passed', () => {
        const expMs = NOW - 5_000
        const token = makeJwt({ exp: expMs / 1000 })
        expect(computeRefreshAt(token, NOW)).toBe(NOW + MIN_REFRESH_DELAY_MS)
    })

    it('falls back to now + FALLBACK_REFRESH_MS for an undecodable token', () => {
        expect(computeRefreshAt('garbage', NOW)).toBe(NOW + FALLBACK_REFRESH_MS)
    })

    it('falls back to now + FALLBACK_REFRESH_MS when exp is missing', () => {
        expect(computeRefreshAt(makeJwt({ role: 'client' }), NOW)).toBe(NOW + FALLBACK_REFRESH_MS)
    })

    it('falls back for null/undefined input', () => {
        expect(computeRefreshAt(null, NOW)).toBe(NOW + FALLBACK_REFRESH_MS)
        expect(computeRefreshAt(undefined, NOW)).toBe(NOW + FALLBACK_REFRESH_MS)
    })
})

describe('isRefreshDue', () => {
    it('is false when refreshAt is 0 (unknown)', () => {
        expect(isRefreshDue(0, NOW)).toBe(false)
    })

    it('is false when refreshAt is undefined/null', () => {
        expect(isRefreshDue(undefined, NOW)).toBe(false)
        expect(isRefreshDue(null, NOW)).toBe(false)
    })

    it('is true once now has reached refreshAt', () => {
        expect(isRefreshDue(NOW - 1, NOW)).toBe(true)
        expect(isRefreshDue(NOW, NOW)).toBe(true)
    })

    it('is false before refreshAt', () => {
        expect(isRefreshDue(NOW + 1, NOW)).toBe(false)
    })
})

describe('refreshTimerDelay', () => {
    it('clamps a ~24h-out refreshAt down to MAX_TIMER_DELAY_MS', () => {
        expect(refreshTimerDelay(NOW + 24 * 60 * 60 * 1000, NOW)).toBe(MAX_TIMER_DELAY_MS)
    })

    it('clamps a near-immediate refreshAt up to MIN_TIMER_DELAY_MS', () => {
        expect(refreshTimerDelay(NOW + 10, NOW)).toBe(MIN_TIMER_DELAY_MS)
    })

    it('clamps a past refreshAt up to MIN_TIMER_DELAY_MS', () => {
        expect(refreshTimerDelay(NOW - 5_000, NOW)).toBe(MIN_TIMER_DELAY_MS)
    })

    it('passes through a delay that is already within bounds', () => {
        expect(refreshTimerDelay(NOW + 5_000, NOW)).toBe(5_000)
    })
})
