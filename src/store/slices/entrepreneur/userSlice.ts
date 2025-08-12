import { UserState } from '@/@types/reducer/user'
import { createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constant'

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
}

// export const SLICE_NAME = 'userSlice'

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setClient: (state, action) => {
      state = action.payload
    },
    },
})
export const {setClient} = userSlice.actions
export default userSlice.reducer
