import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
    signedIn: boolean
    token: string | null
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
        /**
         * Dispatched by the session manager after a silent (proactive or
         * reactive) token refresh. Kept distinct from signInSuccess so a
         * search for "where do we log in" doesn't also surface every silent
         * refresh; behaviourally it just sets the current token the same way.
         */
        sessionTokenRefreshed(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
    },
})

export const { signInSuccess, signOutSuccess, sessionTokenRefreshed } = sessionSlice.actions
export default sessionSlice.reducer
