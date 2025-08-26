/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Detail, VehicleListState } from '@/@types/reducer/vehicle'
import {
  getVehicleAPI,
  getVehicleByIDAPI,
} from '@/services/entrepreneur/VehicleListService'
import {
  GetVehicleListParams,
} from '@/@types/services/vehicle'

const initialState: VehicleListState = {
  overview: {
    search: {
      // vehicle_type_id: '',
      page: 1,
      limit: 10,
    },
    data: {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0,
    },
  },
  detail: {
    vehicle_detail: {
      weight: 0,
      vehicle_type_id: 0,
      vehicle_type_name: '',
      plate_no: '',
      plate_province: '',
      brand: '',
      color: '',
      kingpin_distance: 0,
      width: 0,
      length: 0,
      height: 0,
      registration_document_url: '',
    },
    vehicle_owner_documents: {
      owner_document_url: '',
      employment_contact_url: '',
      buyer_contact_url: '',
      assignment_contact_url: '',
    },
    vehicle_pictures: {
      front_rear_url: '',
      side_rear_url: '',
      back_rear_url: '',
    },
  },
  detailForRouteEstimation: {
    towing_vehicle_detail: {} as Detail,
    semi_trailer_vehicle_detail: {} as Detail,
    etc_vehicle_detail: {} as Detail,
  },
  loading: false,
}

export const SLICE_NAME = 'vehicleList'

export const getVehicleData = createAsyncThunk(
  SLICE_NAME + '/apiGetVehicleData',
  async (params: GetVehicleListParams) => {
    // assume someService required reesponse & require type as generic
    const response = await getVehicleAPI(params)
    return response.data
  },
)

export const getVehicleDetail = createAsyncThunk(
  SLICE_NAME + '/apiGetVehicleDetail',
  async (id: string | number) => {
    // assume someService required reesponse & require type as generic
    const response = await getVehicleByIDAPI(id)
    return response.data
  },
)

const vehicleListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setVehicleList: (state, action) => {
      ;(state.overview.search = action.payload.params),
        (state.overview.data = action.payload.data)
    },
    setVehicleListByID: (state, action) => {
      state.detail = action.payload
    },
    setVehicleDetailForRouteEstimation: (state, action) => {
      state.detailForRouteEstimation = action.payload
    },
    clearVehicleList: (state) => {
      state.overview.search = initialState.overview.search
      state.overview.data = initialState.overview.data
    },
    clearVehicleDetailForRouteEstimation: (state) => {
      state.detailForRouteEstimation = initialState.detailForRouteEstimation
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleData.fulfilled, (state, action) => {
        ;(state.overview.data = action.payload), (state.loading = false)
      })
      .addCase(getVehicleData.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicleData.rejected, (state) => {
        state.loading = false
      })
      .addCase(getVehicleDetail.fulfilled, (state, action) => {
        state.detail = action.payload
      })
      .addCase(getVehicleDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicleDetail.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setVehicleList, setVehicleListByID, clearVehicleList, setVehicleDetailForRouteEstimation, clearVehicleDetailForRouteEstimation } =
  vehicleListSlice.actions

export default vehicleListSlice.reducer
