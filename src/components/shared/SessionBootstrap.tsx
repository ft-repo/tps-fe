import { useEffect } from 'react'
import sessionManager from '@/services/sessionManagerInstance'

/**
 * Starts/stops the session manager's background refresh timer and cross-tab
 * subscription for the lifetime of the app. Must be mounted inside
 * <PersistGate> so redux-persist has already rehydrated before the
 * migration seed (for a pre-existing session with no refresh token yet)
 * would run. start()/stop() are idempotent, so React 19 StrictMode's
 * double-invoke of this effect is safe.
 */
const SessionBootstrap = () => {
	useEffect(() => {
		sessionManager.start()
		return () => sessionManager.stop()
	}, [])

	return null
}

export default SessionBootstrap
