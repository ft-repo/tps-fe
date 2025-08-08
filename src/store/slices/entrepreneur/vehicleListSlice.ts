/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { VehicleListState } from '@/@types/reducer/vehicle'

const initialState: VehicleListState = {
  overview: {
    search: {
      vehicle_type_id: '',
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
  detail: {}
}

export const SLICE_NAME = 'vehicleList';

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
    }
  },
})

export const { setVehicleList, setVehicleListByID } = vehicleListSlice.actions

export default vehicleListSlice.reducer