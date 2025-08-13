import { ClientList, StaffList } from '@/@types/staff/user-info'
import { createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type StaffState = {
  userLists: ClientList[] | StaffList[]
}

const initialState: StaffState = {
  userLists: [],
}

const UserManageSlice = createSlice({
  name: SLICE_BASE_NAME,
  initialState,
  reducers: {
    setUserLists: (state, action) => {
      state.userLists = action.payload
    },
  },
})

export const { setUserLists } = UserManageSlice.actions

export default UserManageSlice.reducer