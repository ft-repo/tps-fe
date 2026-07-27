import { describe, it, expect } from 'vitest'
import sessionReducer, {
    signInSuccess,
    signOutSuccess,
    sessionTokenRefreshed,
    SessionState,
} from '@/store/slices/auth/sessionSlice'

const initialState: SessionState = { signedIn: false, token: null }

describe('sessionSlice', () => {
    it('has correct initial state', () => {
        expect(sessionReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
    })

    it('signInSuccess sets signedIn=true and stores token', () => {
        const token = 'jwt-token-abc123'
        const state = sessionReducer(initialState, signInSuccess(token))
        expect(state.signedIn).toBe(true)
        expect(state.token).toBe(token)
    })

    it('signOutSuccess clears signedIn and token', () => {
        const loggedIn: SessionState = { signedIn: true, token: 'some-token' }
        const state = sessionReducer(loggedIn, signOutSuccess())
        expect(state.signedIn).toBe(false)
        expect(state.token).toBeNull()
    })

    it('signInSuccess overwrites previous token', () => {
        const first = sessionReducer(initialState, signInSuccess('token-1'))
        const second = sessionReducer(first, signInSuccess('token-2'))
        expect(second.token).toBe('token-2')
    })

    it('signOutSuccess is idempotent when already signed out', () => {
        const state = sessionReducer(initialState, signOutSuccess())
        expect(state).toEqual(initialState)
    })

    it('sessionTokenRefreshed sets signedIn=true and stores the new token', () => {
        const loggedIn: SessionState = { signedIn: true, token: 'old-token' }
        const state = sessionReducer(loggedIn, sessionTokenRefreshed('new-token'))
        expect(state.signedIn).toBe(true)
        expect(state.token).toBe('new-token')
    })

    it('sessionTokenRefreshed also signs in a session that was signed out', () => {
        const state = sessionReducer(initialState, sessionTokenRefreshed('refreshed-token'))
        expect(state.signedIn).toBe(true)
        expect(state.token).toBe('refreshed-token')
    })
})
