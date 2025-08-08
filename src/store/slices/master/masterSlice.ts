import { EntityState, SubDistrictState, ThailandState } from '@/@types/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getContactTypeAPI, getEntityAPI, getVechicleTypeAPI } from '@/services/master/MasterService';

export type MasterState = {
  entity: EntityState[];
  contact_type: EntityState[];
  vehicle_type: EntityState[];
  province: ThailandState[];
  district: ThailandState[];
  sub_district: SubDistrictState[];
  loading: boolean;
}

const initialState: MasterState = {
  entity: [],
  contact_type: [],
  vehicle_type: [],
  province: [],
  district: [],
  sub_district: [],
  loading: false
}

export const SLICE_NAME = 'masterSlice';

export const getEntity = createAsyncThunk(SLICE_NAME + '/apiGetEntity', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getEntityAPI()
  return response.data
})

export const getContactType = createAsyncThunk(SLICE_NAME + '/apiGetContactType', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getContactTypeAPI()
  return response.data
})

export const getVehicleType = createAsyncThunk(SLICE_NAME + '/apiGetVehicleType', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getVechicleTypeAPI()
  return response.data
})

const masterSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getEntity: (state, action) => {
      state.entity = action.payload
    },
    getContactType: (state, action) => {
      state.contact_type = action.payload
    },
    getVehicleType: (state, action) => {
      state.vehicle_type = action.payload
    },
  },
  extraReducers: (builder) => {
    // GET ENTITY
    builder.addCase(getEntity.fulfilled, (state, action) => {
      state.entity = action.payload
      state.loading = false
    })
      .addCase(getEntity.pending, (state) => {
        state.loading = true
      })
      .addCase(getEntity.rejected, (state) => {
        state.loading = false
      })
    // GET CONTACT_TYPE
    builder.addCase(getContactType.fulfilled, (state, action) => {
      state.contact_type = action.payload
      state.loading = false
    })
      .addCase(getContactType.pending, (state) => {
        state.loading = true
      })
      .addCase(getContactType.rejected, (state) => {
        state.loading = false
      })
    // GET VEHICLE_TYPE
    builder.addCase(getVehicleType.fulfilled, (state, action) => {
      state.vehicle_type = action.payload
      state.loading = false
    })
      .addCase(getVehicleType.pending, (state) => {
        state.loading = true
      })
      .addCase(getVehicleType.rejected, (state) => {
        state.loading = false
      })
  },
})

export default masterSlice.reducer