import { describe, it, expect } from 'vitest'
import {
    classifyRefreshError,
    isAuthChallenge,
    decideRefresh,
} from '@/lib/auth/refreshPolicy'
import { makeJwt } from './harness'

const NOW = 1_700_000_000_000

describe('classifyRefreshError', () => {
    it('classifies res_code 40100 as invalid', () => {
        expect(classifyRefreshError({ response: { status: 401, data: { res_code: 40100 } } })).toBe(
            'invalid',
        )
    })

    it.each([400, 401, 403, 422])('classifies a bare %i status as invalid', (status) => {
        expect(classifyRefreshError({ response: { status, data: {} } })).toBe('invalid')
    })

    it('classifies 500 as transient', () => {
        expect(classifyRefreshError({ response: { status: 500, data: {} } })).toBe('transient')
    })

    it('classifies a network error (no response) as transient', () => {
        expect(classifyRefreshError({ code: 'ERR_NETWORK', message: 'Network Error' })).toBe(
            'transient',
        )
    })

    it.each([undefined, null, 'oops', {}])('classifies %p as transient', (err) => {
        expect(classifyRefreshError(err)).toBe('transient')
    })
})

describe('isAuthChallenge', () => {
    it('is true for a bare 401', () => {
        expect(isAuthChallenge({ response: { status: 401 } })).toBe(true)
    })

    it('is true for res_code 40100 (invalid token)', () => {
        expect(isAuthChallenge({ response: { status: 400, data: { res_code: 40100 } } })).toBe(true)
    })

    it('is true for res_code 40199 (expired token)', () => {
        expect(isAuthChallenge({ response: { status: 400, data: { res_code: 40199 } } })).toBe(true)
    })

    it('is false for 403 (authorization, not authentication)', () => {
        expect(isAuthChallenge({ response: { status: 403 } })).toBe(false)
    })

    it('is false for an unrelated error shape', () => {
        expect(isAuthChallenge({ response: { status: 500, data: {} } })).toBe(false)
        expect(isAuthChallenge(undefined)).toBe(false)
        expect(isAuthChallenge('oops')).toBe(false)
    })
})

describe('decideRefresh', () => {
    it('blocks with no-refresh-token when there is none', () => {
        expect(decideRefresh({ refreshToken: null }, NOW)).toEqual({
            attempt: false,
            reason: 'no-refresh-token',
        })
    })

    it('blocks with refresh-token-expired when the RT itself has expired', () => {
        const expiredRt = makeJwt({ exp: (NOW - 60_000) / 1000 })
        expect(decideRefresh({ refreshToken: expiredRt }, NOW)).toEqual({
            attempt: false,
            reason: 'refresh-token-expired',
        })
    })

    it('allows the attempt for a healthy refresh token', () => {
        const healthyRt = makeJwt({ exp: (NOW + 7 * 24 * 60 * 60 * 1000) / 1000 })
        expect(decideRefresh({ refreshToken: healthyRt }, NOW)).toEqual({ attempt: true })
    })

    it('allows the attempt when the refresh token has no exp claim (cannot prove it is dead)', () => {
        expect(decideRefresh({ refreshToken: 'not-a-jwt' }, NOW)).toEqual({ attempt: true })
    })
})
