import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { PetitionAdminState } from '@/@types/reducer/petition'
import { getAdminPetitionAPI, getAdminPetitionExtendedAPI } from '@/services/staff/PetitionService'
import { GetPetitionParams } from '@/@types/services/petition'

const initialState: PetitionAdminState = {
  petition: {
    overview: {
      search: {
        search: '',
        is_finish: true,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {
        data: [],
        page: 1,
        limit: 10,
        total_pages: 0,
        total: 0,
      }
    },
    detail: {}
  },
  petition_extended: {
    overview: {
      search: {
        search: '',
        is_finish: true,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {}
    },
    detail: {}
  },
  loading: false
}

// export const SLICE_NAME = 'yourSliceName';

export const getAdminPetitionData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionAPI(params)
  return response.data
})

export const getAdminPetitionExtendedData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionExtendedData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionExtendedAPI(params)
  return response.data
})

const petitionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/petition`,
  initialState,
  reducers: {
    setAdminPetitionData: (state, action) => {
      state.petition.overview.search = action.payload.params,
        state.petition.overview.data = action.payload.data
    },
    setAdminPetitionExtendedData: (state, action) => {
      state.petition_extended.overview.search = action.payload.params,
        state.petition_extended.overview.data = action.payload.data
    },
  },
  extraReducers: (builder) => {
    // CLIENT
    builder.addCase(getAdminPetitionData.fulfilled, (state, action) => {
      state.petition.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionData.rejected, (state) => {
        state.loading = false
      })
    // CLIENT DETAIL
    builder.addCase(getAdminPetitionExtendedData.fulfilled, (state, action) => {
      state.petition_extended.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionExtendedData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionExtendedData.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { setAdminPetitionData, setAdminPetitionExtendedData } = petitionSlice.actions

export default petitionSlice.reducer