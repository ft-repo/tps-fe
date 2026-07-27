import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const mockEnsureFreshToken = vi.fn()
const mockHandleAuthChallenge = vi.fn()
const mockGetAccessToken = vi.fn()

vi.mock('@/services/sessionManagerInstance', () => ({
    default: {
        ensureFreshToken: mockEnsureFreshToken,
        handleAuthChallenge: mockHandleAuthChallenge,
        getAccessToken: mockGetAccessToken,
    },
}))

const { default: BaseService } = await import('@/services/BaseService')

function makeResponse(
    config: InternalAxiosRequestConfig,
    status: number,
    data: unknown = {},
): AxiosResponse {
    return { data, status, statusText: '', headers: {}, config } as AxiosResponse
}

/**
 * A real axios adapter (xhr/http) rejects a non-2xx response into a proper
 * AxiosError itself (via its internal `settle()`) — a custom test adapter
 * that just resolves with `{status: 401, ...}` does NOT get that for free,
 * since dispatchRequest trusts whatever the adapter's promise settles with.
 * This replicates that behaviour so BaseService's interceptors see the same
 * shape they would against the real network.
 */
function settle(
    config: InternalAxiosRequestConfig,
    status: number,
    data: unknown = {},
): Promise<AxiosResponse> {
    const response = makeResponse(config, status, data)
    if (status >= 200 && status < 300) return Promise.resolve(response)
    return Promise.reject(
        new AxiosError(`Request failed with status code ${status}`, undefined, config, undefined, response),
    )
}

beforeEach(() => {
    mockEnsureFreshToken.mockReset().mockResolvedValue(undefined)
    mockHandleAuthChallenge.mockReset()
    mockGetAccessToken.mockReset().mockReturnValue(null)
})

describe('BaseService request interceptor', () => {
    it('attaches Authorization from sessionManager.getAccessToken()', async () => {
        mockGetAccessToken.mockReturnValue('abc123')
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 200))
        BaseService.defaults.adapter = adapter

        await BaseService.get('/client/protected')

        const sentConfig = adapter.mock.calls[0][0]
        expect(sentConfig.headers.Authorization).toBe('Bearer abc123')
    })

    it('does not attach an Authorization header when there is no token', async () => {
        mockGetAccessToken.mockReturnValue(null)
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 200))
        BaseService.defaults.adapter = adapter

        await BaseService.get('/client/protected')

        const sentConfig = adapter.mock.calls[0][0]
        expect(sentConfig.headers.Authorization).toBeUndefined()
    })

    it('calls ensureFreshToken before a non-auth request', async () => {
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 200))
        BaseService.defaults.adapter = adapter

        await BaseService.get('/client/user/me')

        expect(mockEnsureFreshToken).toHaveBeenCalledTimes(1)
    })

    it.each(['/client/auth/login', '/admin/auth/login', '/client/auth/register', '/me/some-token'])(
        'does not call ensureFreshToken for the auth endpoint %s',
        async (url) => {
            const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 200))
            BaseService.defaults.adapter = adapter

            await BaseService.post(url, {})

            expect(mockEnsureFreshToken).not.toHaveBeenCalled()
        },
    )
})

describe('BaseService response interceptor (auth challenge -> refresh -> retry)', () => {
    it('on a 401, calls handleAuthChallenge and replays the original request exactly once', async () => {
        mockGetAccessToken.mockReturnValue('fresh-token')
        mockHandleAuthChallenge.mockResolvedValue('refreshed')
        let call = 0
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => {
            call += 1
            return call === 1 ? settle(config, 401) : settle(config, 200, { ok: true })
        })
        BaseService.defaults.adapter = adapter

        const response = await BaseService.get('/client/protected')

        expect(adapter).toHaveBeenCalledTimes(2)
        expect(mockHandleAuthChallenge).toHaveBeenCalledTimes(1)
        expect(response.data).toEqual({ ok: true })
        expect(adapter.mock.calls[1][0]._retry).toBe(true)
    })

    it('rejects with the original error when handleAuthChallenge fails', async () => {
        mockHandleAuthChallenge.mockResolvedValue('failed')
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 401))
        BaseService.defaults.adapter = adapter

        await expect(BaseService.get('/client/protected')).rejects.toMatchObject({
            response: { status: 401 },
        })
        expect(adapter).toHaveBeenCalledTimes(1)
    })

    it('does not attempt a second refresh when _retry is already set on the config', async () => {
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 401))
        BaseService.defaults.adapter = adapter

        await expect(
            BaseService.get('/client/protected', {
                _retry: true,
            } as Partial<InternalAxiosRequestConfig>),
        ).rejects.toMatchObject({ response: { status: 401 } })

        expect(mockHandleAuthChallenge).not.toHaveBeenCalled()
        expect(adapter).toHaveBeenCalledTimes(1)
    })

    it('does not attempt a refresh for a 401 from an auth endpoint itself (e.g. wrong password)', async () => {
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) =>
            settle(config, 401, { res_data: { message: 'wrong password' } }),
        )
        BaseService.defaults.adapter = adapter

        await expect(BaseService.post('/client/auth/login', {})).rejects.toMatchObject({
            response: { status: 401 },
        })
        expect(mockHandleAuthChallenge).not.toHaveBeenCalled()
        expect(adapter).toHaveBeenCalledTimes(1)
    })

    it('treats res_code 40199 (token expired) as an auth challenge even without an HTTP 401', async () => {
        mockHandleAuthChallenge.mockResolvedValue('refreshed')
        let call = 0
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => {
            call += 1
            return call === 1
                ? settle(config, 400, { res_code: 40199 })
                : settle(config, 200, { ok: true })
        })
        BaseService.defaults.adapter = adapter

        const response = await BaseService.get('/client/protected')

        expect(mockHandleAuthChallenge).toHaveBeenCalledTimes(1)
        expect(response.data).toEqual({ ok: true })
    })

    it('does not treat an ordinary 500 as an auth challenge', async () => {
        const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => settle(config, 500))
        BaseService.defaults.adapter = adapter

        await expect(BaseService.get('/client/protected')).rejects.toMatchObject({
            response: { status: 500 },
        })
        expect(mockHandleAuthChallenge).not.toHaveBeenCalled()
    })
})
