import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { PetitionAdminState } from '@/@types/reducer/petition'
import { getAdminPetitionAPI, getAdminPetitionExtendedAPI, getPetitionDocumentAPI } from '@/services/staff/PetitionService'
import { GetPetitionDetailParams, GetPetitionParams } from '@/@types/services/petition'

const initialState: PetitionAdminState = {
  petition: {
    overview: {
      search: {
        search: '',
        is_finish: false,
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
    detail: {
      document: {
        petition_id: 0,
        business_name: '',
        entity_type: '',
        address: '',
        business_phone_no: '',
        contact_name: '',
        contact_phone_no: '',
        project_name: '',
        petition_type: '',
        start_date: '',
        end_date: '',
        start_point: '',
        end_point: '',
        poa_url: '',
        mach_book_url: '',
      },
      estimate: {},
      vehicle: {}
    }
  },
  petition_extended: {
    overview: {
      search: {
        search: '',
        is_finish: false,
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
  petition_history: {
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
    detail: {
      document: {
        petition_id: 0,
        business_name: '',
        entity_type: '',
        address: '',
        business_phone_no: '',
        contact_name: '',
        contact_phone_no: '',
        project_name: '',
        petition_type: '',
        start_date: '',
        end_date: '',
        start_point: '',
        end_point: '',
        poa_url: '',
        mach_book_url: '',
      },
      estimate: {},
      vehicle: {}
    }
  },
  petition_history_extended: {
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

export const getAdminPetitionHistoryData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionHistoryData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionAPI(params)
  return response.data
})

export const getAdminPetitionHistoryExtendedData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionHistoryExtendedData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionExtendedAPI(params)
  return response.data
})

export const getPetitionDocument = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionDocument', async (params: GetPetitionDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionDocumentAPI(params)
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
    setAdminPetitionHistoryData: (state, action) => {
      state.petition_history.overview.search = action.payload.params,
        state.petition_history.overview.data = action.payload.data
    },
    setAdminPetitionHistoryExtendedData: (state, action) => {
      state.petition_history_extended.overview.search = action.payload.params,
        state.petition_history_extended.overview.data = action.payload.data
    },
    setAdminPetitionDocument: (state, action) => {
      state.petition.detail = action.payload.data
    }
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
    builder.addCase(getAdminPetitionHistoryData.fulfilled, (state, action) => {
      state.petition_history.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionHistoryData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionHistoryData.rejected, (state) => {
        state.loading = false
      })
    builder.addCase(getAdminPetitionHistoryExtendedData.fulfilled, (state, action) => {
      state.petition_history_extended.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionHistoryExtendedData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionHistoryExtendedData.rejected, (state) => {
        state.loading = false
      })
    builder.addCase(getPetitionDocument.fulfilled, (state, action) => {
      state.petition.detail.document = action.payload,
        state.loading = false
    })
      .addCase(getPetitionDocument.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionDocument.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { setAdminPetitionData, setAdminPetitionExtendedData, setAdminPetitionHistoryData, setAdminPetitionHistoryExtendedData } = petitionSlice.actions

export default petitionSlice.reducer