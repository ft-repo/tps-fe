import { ClientList, ClientListsResponse, StaffListsResponse } from '@/@types/staff/user-info'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { getClientById } from '@/services/staff/UserManagement'

export type StaffState = {
  userLists: ClientListsResponse | StaffListsResponse
  userData: ClientList | null
  loading: boolean
}

const initialState: StaffState = {
  userLists: {
    data: [],
    page: 1,
    limit: 10,
    total_pages: 0,
    total: 0,
  },
  userData: null,
  loading: false,
}

export const getUserById = createAsyncThunk(SLICE_BASE_NAME + '/apiGetUserById', async (id: string) => {
  const response = await getClientById(id)
  return response
})

const UserManageSlice = createSlice({
  name: SLICE_BASE_NAME,
  initialState,
  reducers: {
    setUserLists: (state, action) => {
      state.userLists = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.userData = action.payload
      state.loading = false
    }).addCase(getUserById.pending, (state) => {
      state.loading = true
    }).addCase(getUserById.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { setUserLists, setUserData } = UserManageSlice.actions

export default UserManageSlice.reducer