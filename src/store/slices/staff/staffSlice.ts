import { ClientListsResponse, StaffListsResponse } from '@/@types/staff/user-info'
import { createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type StaffState = {
  userLists: ClientListsResponse | StaffListsResponse
}

const initialState: StaffState = {
  userLists: {
    data: [],
    page: 1,
    limit: 10,
    total_pages: 0,
    total: 0,
  },
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