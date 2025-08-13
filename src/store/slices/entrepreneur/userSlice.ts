import { UserState } from '@/@types/reducer/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constant'
import { getUserAPI } from '@/services/entrepreneur/UserService'

const initialState: UserState = {
	important_info: {
		entity_name: '',
		business_name: '',
		business_address: {
			house_number: '',
			village: '',
			lane: '',
			road: '',
			sub_district: '',
			district: '',
			province: '',
			zip_code: '',
		},
		business_phone_number: '',
		registration_no: '',
		contact_name: '',
		contact_type: {
			id: 0,
			name: '',
		},
		cid: '',
		contact_phone_number: '',
		permission_date: '',
	},
	business_document: {
		cid_card_file_url: '',
		certificate_file_url: '',
		business_file_url: '',
	},
	loading: false
}

// export const SLICE_NAME = 'userSlice'

export const getUserData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetClient', async () => {
	// assume someService required reesponse & require type as generic
	const response = await getUserAPI()
	return response.data
})

const userSlice = createSlice({
	name: `${SLICE_BASE_NAME}/user`,
	initialState,
	reducers: {
		setClient: (state, action) => {
			state.business_document = action.payload.business_document,
			state.important_info = action.payload.important_info
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserData.fulfilled, (state, action) => {
			state.business_document = action.payload.business_document,
			state.important_info = action.payload.important_info,
			state.loading = false
		})
			.addCase(getUserData.pending, (state) => {
				state.loading = true
			})
			.addCase(getUserData.rejected, (state) => {
				state.loading = false
			})
	}
})
export const { setClient } = userSlice.actions
export default userSlice.reducer
