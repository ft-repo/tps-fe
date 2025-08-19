/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { VehicleListState } from '@/@types/reducer/vehicle'
import { getVehicleAPI, getVehicleByIDAPI } from '@/services/entrepreneur/VehicleListService';
import { GetVehicleListParams } from '@/@types/services/vehicle';

const initialState: VehicleListState = {
  overview: {
    search: {
      // vehicle_type_id: '',
      page: 1,
      limit: 10
    },
    data: {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0
    }
  },
  detail: {},
  loading: false
}

export const SLICE_NAME = 'vehicleList';

export const getVehicleData = createAsyncThunk(SLICE_NAME + '/apiGetVehicleData', async (params: GetVehicleListParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getVehicleAPI(params)
  return response.data
})

export const getVehicleDetail = createAsyncThunk(SLICE_NAME + '/apiGetVehicleDetail', async (id: string | number) => {
  // assume someService required reesponse & require type as generic
  const response = await getVehicleByIDAPI(id)
  return response.data
})

const vehicleListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setVehicleList: (state, action) => {
      state.overview.search = action.payload.params,
      state.overview.data = action.payload.data
    },
    setVehicleListByID: (state, action) => {
      state.detail = action.payload
    },
    clearVehicleList: (state) => {
      state.overview.search = initialState.overview.search
      state.overview.data = initialState.overview.data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getVehicleData.fulfilled, (state, action) => {
      state.overview.data = action.payload,
      state.loading = false
    })
      .addCase(getVehicleData.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicleData.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { setVehicleList, setVehicleListByID, clearVehicleList } = vehicleListSlice.actions

export default vehicleListSlice.reducer