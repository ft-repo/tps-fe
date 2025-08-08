import { EntityState, SubDistrictState, ThailandState } from '@/@types/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEntityAPI } from '@/services/master/MasterService';

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

export const getEntity = createAsyncThunk(SLICE_NAME + '/getApiData', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getEntityAPI()
  return response.data
})

const masterSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getEntity: (state, action) => {
      state.entity = action.payload
    },
  },
  extraReducers: (builder) => {
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
  },
})

export default masterSlice.reducer