import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
	id: string
	registration_no: string
	business_details: {
		entity_type_id: number
		business_name: string
		entity_type: {
			id: number
			name: string
		}
	}
	authority: string[]
}

const initialState: UserState = {
	id: '',
	registration_no: '',
	business_details: {
		entity_type_id: 0,
		business_name: '',
		entity_type: {
			id: 0,
			name: '',
		},
	},
	authority: [],
}

const userSlice = createSlice({
	name: `${SLICE_BASE_NAME}/user`,
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.id = action.payload?.id
			state.registration_no = action.payload?.registration_no
			state.business_details = action.payload?.business_details
			state.authority = action.payload?.authority
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
