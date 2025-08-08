/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import RtkQueryService from '@/services/RtkQueryService';
import { Data, VehicleListState } from '@/@types/reducer/vehicle'
import { GetVehicleListParams } from '@/@types/services/vehicle';

const initialState: VehicleListState = {
  overview: {
    search: {
      vehicle_type_id: '',
      page: 1,
      limit: 5
    },
    data: {
      data: [],
      total: 0,
      page: 1,
      limit: 5,
      total_pages: 0
    }
  },
  detail: {}
}

export const SLICE_NAME = 'vehicleList';

const getVehicleListApi = RtkQueryService.injectEndpoints({
  endpoints: (build) => ({
    getVehicleList: build.query<Data, GetVehicleListParams>({
      query: (query) => (
        {
          // Specify the URL for the endpoint
          url: '/client/vehicle',
          // Specify the method for the endpoint (GET, POST, PUT, etc.)
          method: 'GET',
          params: {
            vehicle_type_id: query.vehicle_type_id,
            page: query.page,
            limit: query.limit
          }
        }
      ),
    }),
  }),
})

const vehicleListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getVehicleList: (state, action) => {
      state.overview.search = action.payload.param,
        state.overview.data = action.payload.data
    },
    getVehicleListByID: (state, action) => {
      state.detail = action.payload
    }
  }
})

export const { useGetVehicleListQuery } = getVehicleListApi
export const { getVehicleList, getVehicleListByID } = vehicleListSlice.actions

export default vehicleListSlice.reducer