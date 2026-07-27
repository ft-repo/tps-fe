import { isJwtExpired } from './jwt'

export const TOKEN_INVALID_CODE = 40100
export const TOKEN_EXPIRED_CODE = 40199

export type RefreshErrorKind = 'transient' | 'invalid'

type ResCodeError = { response?: { status?: number; data?: { res_code?: number } } }

/**
 * Classify a rejection from the refresh endpoint itself.
 *
 * `res_code === 40100` is a definitive rejection on both backends we've
 * verified (drr-auth and tps_service). We deliberately go one step further
 * than the drr-new-its-fe reference: tps's res_code values for a dead/rotated
 * refresh token are unverified, so a plain 4xx status FROM THE REFRESH CALL
 * ITSELF (400/401/403/422) is also treated as definitive — on a refresh
 * endpoint a 4xx can only mean "this refresh_token is no good". Restricting
 * this to the refresh response (never a general API call) keeps it
 * unambiguous. Anything else — 5xx, network error, timeout, no response — is
 * transient and must never sign the user out on its own.
 */
export function classifyRefreshError(err: unknown): RefreshErrorKind {
    if (!err || typeof err !== 'object') return 'transient'
    const e = err as ResCodeError
    if (e.response?.data?.res_code === TOKEN_INVALID_CODE) return 'invalid'
    const status = e.response?.status
    if (status === 400 || status === 401 || status === 403 || status === 422) return 'invalid'
    return 'transient'
}

/**
 * Should a failed API response (from any endpoint, not the refresh call)
 * trigger a refresh attempt? A bare 401, or either of the two backend
 * res_codes that mean "your access token is no longer good".
 *
 * Deliberately excludes 403: that is an authorization failure (wrong role/
 * permission), not an authentication one — refreshing cannot fix it, and
 * treating it as a challenge would burn a refresh on every ordinary
 * permission denial.
 */
export function isAuthChallenge(err: unknown): boolean {
    if (!err || typeof err !== 'object') return false
    const e = err as ResCodeError
    if (e.response?.status === 401) return true
    const resCode = e.response?.data?.res_code
    return resCode === TOKEN_INVALID_CODE || resCode === TOKEN_EXPIRED_CODE
}

export type RefreshBlockedReason = 'no-refresh-token' | 'refresh-token-expired'

export type RefreshDecision = { attempt: true } | { attempt: false; reason: RefreshBlockedReason }

/**
 * Local, network-free fail-fast check performed before ever calling the
 * refresh endpoint:
 *  - no refresh token at all -> 'no-refresh-token' (a pre-this-feature/
 *    migrated session; NOT proof the user's credentials are bad)
 *  - the refresh token's OWN exp has passed -> 'refresh-token-expired'
 *    (definitive — tps refresh tokens live ~7 days, so a tab reopened after
 *    a week would otherwise burn the whole retry ladder on a guaranteed-dead
 *    call before finally being classified transient)
 */
export function decideRefresh(
    snapshot: { refreshToken: string | null },
    now: number,
): RefreshDecision {
    if (!snapshot.refreshToken) return { attempt: false, reason: 'no-refresh-token' }
    if (isJwtExpired(snapshot.refreshToken, now)) {
        return { attempt: false, reason: 'refresh-token-expired' }
    }
    return { attempt: true }
}
