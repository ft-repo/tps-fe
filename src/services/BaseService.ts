import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, API_KEY } from '@/constants/api.constant'
import { isAuthChallenge } from '@/lib/auth/refreshPolicy'
import sessionManager from './sessionManagerInstance'

declare module 'axios' {
	interface InternalAxiosRequestConfig {
		_retry?: boolean
	}
}

// Auth endpoints ARE the handshake itself — a 401 from /client/auth/login
// means "wrong password", not "session expired". They must never trigger a
// refresh (which would also be pointless: there is no session yet).
const AUTH_ENDPOINT_RE = /(^|\/)(client|admin)\/auth\/(login|register|refresh)(\/|$)|(^|\/)me\//

function isAuthEndpoint(url?: string): boolean {
	return !!url && AUTH_ENDPOINT_RE.test(url)
}

const BaseService = axios.create({
	timeout: 60000,
	baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
	async (config) => {
		const authEndpoint = isAuthEndpoint(config.url)
		if (!authEndpoint) {
			// Proactive silent refresh once the current token is past its
			// refresh_at, or park behind one already in flight. Resolves
			// (never rejects) so a request is never blocked by this call.
			await sessionManager.ensureFreshToken()
		}

		const accessToken = sessionManager.getAccessToken()
		if (accessToken) {
			config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
		}

		if (import.meta.env.VITE_API_KEY) {
			config.headers[API_KEY] = import.meta.env.VITE_API_KEY
		}

		if (import.meta.env.DEV) {
			const base = (config.baseURL ?? '').replace(/\/+$/, '')
			const path = (config.url ?? '').replace(/^\/+/, '')
			console.log('[REQ]', `${base}/${path}`, config.params ?? {}, config.method)
		}

		return config
	},
	(error) => Promise.reject(error),
)

async function handleAuthFailure(error: AxiosError) {
	const config = error.config as InternalAxiosRequestConfig | undefined
	if (!config || config._retry || isAuthEndpoint(config.url)) {
		return Promise.reject(error)
	}
	config._retry = true

	// Silently refreshes (single-flight; concurrent failures share one
	// refresh) and retries the original request. Signs the user out only on
	// a definitive refresh rejection — a transient failure (network/5xx)
	// keeps the session and just fails this one request.
	const outcome = await sessionManager.handleAuthChallenge()
	if (outcome === 'refreshed') {
		return BaseService(config)
	}
	return Promise.reject(error)
}

BaseService.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (isAuthChallenge(error)) {
			return handleAuthFailure(error)
		}
		return Promise.reject(error)
	},
)

export default BaseService
