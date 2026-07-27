import { describe, it, expect } from 'vitest'
import {
    decodeJwtPayload,
    getJwtExpMs,
    isJwtExpired,
    getJwtRole,
} from '@/lib/auth/jwt'
import { makeJwt } from './harness'

// Real sample token recorded in bruno-collections/tps_service/client/authen/refresh.yml
// Decodes to: { exp: 1785742126, iat: 1785137326, nbf: 1785137326, role: 'client', user_id: '019eafc9-669c-74b8-8daa-24b75e91ccb8' }
const REAL_TPS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODU3NDIxMjYsImlhdCI6MTc4NTEzNzMyNiwibmJmIjoxNzg1MTM3MzI2LCJyb2xlIjoiY2xpZW50IiwidXNlcl9pZCI6IjAxOWVhZmM5LTY2OWMtNzRiOC04ZGFhLTI0Yjc1ZTkxY2NiOCJ9.zR6AGzI62N1VxduA_wWkERKm-z94ldZkj5-q7ILQezI'

describe('decodeJwtPayload', () => {
    it('decodes the real recorded tps sample token', () => {
        expect(decodeJwtPayload(REAL_TPS_TOKEN)).toEqual({
            exp: 1785742126,
            iat: 1785137326,
            nbf: 1785137326,
            role: 'client',
            user_id: '019eafc9-669c-74b8-8daa-24b75e91ccb8',
        })
    })

    it('decodes a token built with makeJwt', () => {
        const token = makeJwt({ exp: 1_800_000_000, role: 'admin' })
        expect(decodeJwtPayload(token)).toEqual({ exp: 1_800_000_000, role: 'admin' })
    })

    it('handles base64url -/_ characters and missing padding', () => {
        // Payload chosen so its base64 form needs 1 and then 2 '=' of padding
        const token1 = makeJwt({ a: 'x' })
        const token2 = makeJwt({ ab: 'xy' })
        expect(decodeJwtPayload(token1)).toEqual({ a: 'x' })
        expect(decodeJwtPayload(token2)).toEqual({ ab: 'xy' })
    })

    it('round-trips a UTF-8 (Thai) claim', () => {
        const token = makeJwt({ name: 'ทดสอบภาษาไทย' })
        expect(decodeJwtPayload(token)).toEqual({ name: 'ทดสอบภาษาไทย' })
    })

    it.each([null, undefined, '', 'not.a.jwt', 'onlyonepart', 'a.!!!.c'])(
        'returns null for invalid input %p without throwing',
        (input) => {
            expect(() => decodeJwtPayload(input as never)).not.toThrow()
            expect(decodeJwtPayload(input as never)).toBeNull()
        },
    )
})

describe('getJwtExpMs', () => {
    it('converts the exp claim from seconds to milliseconds', () => {
        expect(getJwtExpMs(REAL_TPS_TOKEN)).toBe(1785742126000)
    })

    it('returns null when exp is missing', () => {
        expect(getJwtExpMs(makeJwt({ role: 'client' }))).toBeNull()
    })

    it('returns null when exp is not a number', () => {
        expect(getJwtExpMs(makeJwt({ exp: '1785742126' }))).toBeNull()
    })

    it('returns null for an undecodable token', () => {
        expect(getJwtExpMs('garbage')).toBeNull()
    })
})

describe('isJwtExpired', () => {
    const expMs = 1785742126000

    it('is true once now has passed exp', () => {
        const token = makeJwt({ exp: expMs / 1000 })
        expect(isJwtExpired(token, expMs + 1)).toBe(true)
    })

    it('is false before exp', () => {
        const token = makeJwt({ exp: expMs / 1000 })
        expect(isJwtExpired(token, expMs - 1)).toBe(false)
    })

    it('honours a positive skew (treats as expired earlier)', () => {
        const token = makeJwt({ exp: expMs / 1000 })
        expect(isJwtExpired(token, expMs - 500, 1000)).toBe(true)
    })

    it('never guesses "expired" for a token it cannot decode', () => {
        expect(isJwtExpired('garbage', Number.MAX_SAFE_INTEGER)).toBe(false)
        expect(isJwtExpired(null, Number.MAX_SAFE_INTEGER)).toBe(false)
        expect(isJwtExpired(undefined, Number.MAX_SAFE_INTEGER)).toBe(false)
    })
})

describe('getJwtRole', () => {
    it('reads the role claim from the real sample token', () => {
        expect(getJwtRole(REAL_TPS_TOKEN)).toBe('client')
    })

    it('returns null when there is no role claim', () => {
        expect(getJwtRole(makeJwt({ exp: 1 }))).toBeNull()
    })

    it('returns null for a garbage token', () => {
        expect(getJwtRole('garbage')).toBeNull()
    })
})
