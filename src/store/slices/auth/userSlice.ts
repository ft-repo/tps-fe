import { createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
	id: string
	userName: string
	name: string
	profile_url: string
	details: {
		id: string
		registration_no: string
		created_at: string
		profile_url: string
		is_personal: boolean
		business_details: {
			entity_type_id: number
			business_name: string
			entity_type: {
				id: number
				name: string
			}
		}
		business_address: {
			house_number: string
			village: string
			lane: string
			road: string
			sub_district_id: number
			district_id: number
			zip_codes: string
			province_id: number
			phone_number: string
			province: {
				id: number
				name_th: string
				name_en: string
			}
			district: {
				id: number
				name_th: string
				name_en: string
				province_id: number
			}
			sub_district: {
				id: number
				name_th: string
				name_en: string
				zip_code: string
				province_id: number
				district_id: number
			}
		}
		contact_info: {
			contact_name: string
			contact_type_id: number
			phone_number: string
			cid: string
			contact_type: {
				id: number
				name: string
			}
		}
		department: {
			dept_name: string;
			dept_type: number;
			dept_group: number;
			dept_province: string;
		}
		role: {
			name: string;
		}
	}
	authority: string[]
	from_web?: boolean | null
}

const initialState: UserState = {
	id: '',
	userName: '',
	name: '',
	profile_url: '',
	details: {
		id: '',
		registration_no: '',
		created_at: '',
		profile_url: '',
		is_personal: false,
		business_details: {
			entity_type_id: 0,
			business_name: '',
			entity_type: {
				id: 0,
				name: '',
			}
		},
		business_address: {
			house_number: '',
			village: '',
			lane: '',
			road: '',
			sub_district_id: 0,
			district_id: 0,
			zip_codes: '',
			province_id: 0,
			phone_number: '',
			province: {
				id: 0,
				name_th: '',
				name_en: '',
			},
			district: {
				id: 0,
				name_th: '',
				name_en: '',
				province_id: 0,
			},
			sub_district: {
				id: 0,
				name_th: '',
				name_en: '',
				zip_code: '',
				province_id: 0,
				district_id: 0,
			}
		},
		contact_info: {
			contact_name: '',
			contact_type_id: 0,
			phone_number: '',
			cid: '',
			contact_type: {
				id: 0,
				name: '',
			}
		},
		department: {
			dept_name: '',
			dept_type: 0,
			dept_group: 0,
			dept_province: ''
		},
		role: {
			name: ''
		}
	},
	authority: [],
	from_web: null
}

const userSlice = createSlice({
	name: `${SLICE_BASE_NAME}/user`,
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.id = action.payload?.id
			state.userName = action.payload?.userName
			state.name = action.payload?.name
			state.profile_url = action.payload?.profile_url
			state.details = action.payload?.details
			state.authority = action.payload?.authority
			state.from_web = action.payload?.from_web
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
