import type { AppDispatch } from '@/store'
import { signOutSuccess } from './sessionSlice'
import { setUser } from './userSlice'

/**
 * Shared reset of the auth slices. Used by both a user-initiated sign-out
 * (useAuth.handleSignOut) and a session-manager-detected expiry
 * (sessionManagerInstance's onSessionExpired), so both paths land in
 * exactly the same signed-out state instead of maintaining two copies.
 */
export function clearAuthState(dispatch: AppDispatch): void {
	dispatch(signOutSuccess())
	dispatch(
		setUser({
			id: '',
			userName: '',
			name: '',
			details: {
				department: undefined,
				role: undefined,
				entity_type: undefined,
			},
			authority: [],
			from_web: null,
		}),
	)
}
