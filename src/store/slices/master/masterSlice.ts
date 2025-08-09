import { EntityState, SubDistrictState, ThailandState } from '@/@types/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants';
import { getContactTypeAPI, getDistrictAPI, getSubDistrictAPI, getEntityAPI, getProvinceAPI, getVechicleTypeAPI, getEntityTypeAPI } from '@/services/master/MasterService';

export type MasterState = {
  entity: EntityState[];
  contact_type: EntityState[];
  vehicle_type: EntityState[];
  province: ThailandState[];
  district: ThailandState[];
  sub_district: SubDistrictState[];
  entity_type: EntityState[];
  loading: boolean;
}

const initialState: MasterState = {
  entity: [],
  contact_type: [],
  vehicle_type: [],
  province: [],
  district: [],
  sub_district: [],
  entity_type: [],
  loading: false
}

// export const SLICE_NAME = 'masterSlice';

export const getEntity = createAsyncThunk(SLICE_BASE_NAME + '/apiGetEntity', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getEntityAPI()
  return response.data
})

export const getContactType = createAsyncThunk(SLICE_BASE_NAME + '/apiGetContactType', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getContactTypeAPI()
  return response.data
})

export const getVehicleType = createAsyncThunk(SLICE_BASE_NAME + '/apiGetVehicleType', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getVechicleTypeAPI()
  return response.data
})

export const getProvince = createAsyncThunk(SLICE_BASE_NAME + '/apiGetProvince', async () => {
  const response = await getProvinceAPI('', '', '')
  return response.data
})

export const getDistrict = createAsyncThunk(SLICE_BASE_NAME + '/apiGetDistrict', async (provinceId: string) => {
  const response = await getDistrictAPI(provinceId, '', '')
   return response.data
})

export const getSubDistrict = createAsyncThunk(SLICE_BASE_NAME + '/apiGetSubDistrict', async (districtId:string) => {
  const response = await getSubDistrictAPI('', districtId, '')
   return response.data
})

export const getEntityType = createAsyncThunk(SLICE_BASE_NAME + '/apiGetEntityType', async () => {
  const response = await getEntityTypeAPI()
  return response.data
})

const masterSlice = createSlice({
  name: SLICE_BASE_NAME,
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
    getProvince: (state, action) => {
      state.province = action.payload
    },
    getDistrict: (state, action) => {
      state.district = action.payload
    },
    getSubDistrict: (state, action)=>{
      state.sub_district = action.payload
    },
    getEntityType: (state, action) => {
      state.entity_type = action.payload
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
    // GET PROVINCE
    builder.addCase(getProvince.fulfilled, (state, action) => {
      state.province = action.payload
      state.loading = false
    })
      .addCase(getProvince.pending, (state) => {
        state.loading = true
      })
      .addCase(getProvince.rejected, (state) => {
        state.loading = false
      })
    // GET DISTRICT
    builder.addCase(getDistrict.fulfilled, (state, action) => {
      state.district = action.payload
      state.loading = false
    })
      .addCase(getDistrict.pending, (state) => {
        state.loading = true
      })
      .addCase(getDistrict.rejected, (state) => {
        state.loading = false
      })
    // GET SUBDISTRICT
    builder.addCase(getSubDistrict.fulfilled, (state, action) => {
      state.sub_district = action.payload
      state.loading = false
    })
    .addCase(getSubDistrict.pending, (state) => {
      state.loading = true
    })
    .addCase(getSubDistrict.rejected, (state) => {
      state.loading = false
    })
    // GET ENTITY_TYPE
    builder.addCase(getEntityType.fulfilled, (state, action) => {
      state.entity_type = action.payload
      state.loading = false
    })
      .addCase(getEntityType.pending, (state) => {
        state.loading = true
      })
      .addCase(getEntityType.rejected, (state) => {
        state.loading = false
      })
  },
})


export default masterSlice.reducer