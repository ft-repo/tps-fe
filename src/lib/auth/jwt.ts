// Decodes a JWT payload client-side, with no signature verification — the
// token is issued by our own backend, we only need to read `exp` and `role`
// to schedule a refresh. Never throws: callers treat "can't decode" as
// "unknown", not as "expired".

export type JwtPayload = Record<string, unknown>

function base64UrlToBase64(segment: string): string {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
    const paddingNeeded = (4 - (base64.length % 4)) % 4
    return base64 + '='.repeat(paddingNeeded)
}

/**
 * Decode a JWT payload segment. Returns null for null/empty/malformed input
 * or a non-object payload — never throws.
 */
export function decodeJwtPayload(token: string | null | undefined): JwtPayload | null {
    if (!token || typeof token !== 'string') return null
    const segment = token.split('.')[1]
    if (!segment) return null
    try {
        const binary = atob(base64UrlToBase64(segment))
        // atob yields a latin1 string; re-decode the raw bytes as UTF-8 so
        // multi-byte claims (Thai names, etc.) survive intact.
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
        const json = new TextDecoder().decode(bytes)
        const parsed = JSON.parse(json)
        return parsed && typeof parsed === 'object' ? (parsed as JwtPayload) : null
    } catch {
        return null
    }
}

/** `exp` claim in epoch milliseconds, or null when absent/non-numeric/unparseable. */
export function getJwtExpMs(token: string | null | undefined): number | null {
    const exp = decodeJwtPayload(token)?.exp
    return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : null
}

/**
 * True only when `exp` is known AND has passed (minus an optional skew).
 * An unparseable/exp-less token is NOT considered expired — we can't prove
 * it's dead, so callers must not treat "unknown" as "expired".
 */
export function isJwtExpired(
    token: string | null | undefined,
    now: number,
    skewMs = 0,
): boolean {
    const expMs = getJwtExpMs(token)
    return expMs === null ? false : expMs - skewMs <= now
}

/** `role` claim when it is a string, else null. */
export function getJwtRole(token: string | null | undefined): string | null {
    const role = decodeJwtPayload(token)?.role
    return typeof role === 'string' ? role : null
}
