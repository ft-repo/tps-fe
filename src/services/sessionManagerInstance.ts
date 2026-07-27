import { createSessionManager, type SessionManager, type RefreshFn } from '@/lib/auth/sessionManager'
import {
	createLocalStorageAuthStorage,
	roleFromAuthority,
	snapshotFromPersistBlob,
} from '@/lib/auth/authStorage'
import { resolveRefreshLock } from '@/lib/auth/refreshLock'
import { apiRefresh } from './AuthService'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import { sessionTokenRefreshed } from '@/store/slices/auth/sessionSlice'
import { clearAuthState } from '@/store/slices/auth/authActions'
import store from '../store'

export const SESSION_EXPIRED_STORAGE_KEY = 'tps.session_expired'

const refresh: RefreshFn = async ({ refreshToken, role }) => {
	const response = await apiRefresh({ refresh_token: refreshToken }, role)
	return { accessToken: response.data.access_token, refreshToken: response.data.refresh_token }
}

const authStorage = createLocalStorageAuthStorage()

// One-time migration seed: a user already signed in when this feature ships
// has no tps.auth.v1 entry yet, only the legacy redux-persist "admin" blob.
// Seed a snapshot in the new shape (refreshToken deliberately null — see
// snapshotFromPersistBlob) so their next request finds an access token
// instead of nothing. Such a session gets exactly one clean sign-out on its
// next 401 (today's behaviour, preserved) rather than a doomed refresh
// attempt. Purely localStorage-driven — no `store` dependency, safe to run
// at module-eval time.
if (!authStorage.read().accessToken) {
	const legacySnapshot = snapshotFromPersistBlob(localStorage.getItem(PERSIST_STORE_NAME), Date.now())
	if (legacySnapshot.accessToken) {
		authStorage.write(legacySnapshot)
	}
}

// This module is part of the same import cycle as BaseService.ts
// (store -> RtkQueryService -> BaseService -> sessionManagerInstance ->
// store): `store` may still be in its temporal-dead-zone while this file's
// top-level body runs. Every reference to `store` below is inside a
// callback, never at module-eval time, so by the time any of them actually
// execute the cycle has long finished resolving (the app has to render and
// the user has to log in or make a request first). Each is still wrapped in
// try/catch as a defensive backstop against that assumption ever breaking.
const sessionManager: SessionManager = createSessionManager({
	storage: authStorage,
	lock: resolveRefreshLock(),
	refresh,
	now: () => Date.now(),
	setTimer: (fn, ms) => setTimeout(fn, ms),
	clearTimer: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
	sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
	onTokens: (snapshot) => {
		if (!snapshot.accessToken) return
		try {
			store.dispatch(sessionTokenRefreshed(snapshot.accessToken))
		} catch {
			// store not ready — should not happen in practice, see note above
		}
	},
	onSessionExpired: () => {
		try {
			clearAuthState(store.dispatch)
		} catch {
			// store not ready — should not happen in practice, see note above
		}
		try {
			sessionStorage.setItem(SESSION_EXPIRED_STORAGE_KEY, '1')
		} catch {
			// private mode / storage disabled — the user just won't see the notice
		}
	},
	currentRole: () => {
		try {
			return roleFromAuthority(store.getState().auth.user.authority)
		} catch {
			return null
		}
	},
})

export default sessionManager
