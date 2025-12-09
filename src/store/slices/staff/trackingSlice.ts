import { getGPSBusinessAPI, getGPSBusinessDetailAPI, getTrackingAPI } from '@/services/staff/TrackingService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TrackingState = {
  overview: TrackingOverview;
  detail: TrackingDetail;
  loading: boolean;
}

export interface TrackingOverview {
  search: TrackingOverviewSearch;
  data: TrackingOverviewData;
}

export interface TrackingOverviewSearch {
  search: string;
  page: number;
  limit: number;
}

export interface TrackingOverviewData {
  data: TrackingData[]
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface TrackingData {
  business_id: string;
  business_name: string;
  entity_type: string;
  contact_name: string;
  petition_count: number;
}

export interface TrackingDetail {
  business: TrackingBusiness;
  business_detail: TrackingBusinessDetail;
}

export interface TrackingBusiness {
  business_name: string;
  contact_name: string;
  entity_type: string;
  project: BusinessProject[];
}

export interface BusinessProject {
  project_id: number;
  project_name: string;
  vehicles: ProjectVehicle[];
}

export interface ProjectVehicle {
  plate: string;
  speed: number;
  timestamp: string;
  geom: number[];
  is_show: boolean;
}

export interface TrackingBusinessDetail {
  business_name: BusinessName;
  road_details: RoadDetails;
  estimate: Estimate[];
}

export interface BusinessName {
  business_name: string;
  entity_type: string;
  contact_name: string;
}

export interface RoadDetails {
  route: number[][];
  project_name: string;
  request_type: string;
  start_date: string;
  end_date: string;
  start_point: string;
  end_point: string;
  start_province: string;
  end_province: string;
}

export interface Estimate {
  id: string;
  turn_radius: number;
  towing_vehicle_id: number;
  semi_trailer_vehicle_id: number;
  etc_vehicle_id: any;
  towing_axis_weight: number[];
  semi_trailer_axis_weight: number[];
  sort: number;
  created_by: string;
  gps: GPS;
  towing_vehicle: TowingVehicle;
  semi_trailer_vehicle: SemiTrailerVehicle;
  etc_vehicle: ETCVehicle[];
}

export interface GPS {
  plate: string;
  speed: number;
  timestamp: string;
  geom: number[];
  is_show: boolean;
}

export interface TowingVehicle {
  id: number;
  user_id: string;
  vehicle_type_id: number;
  plate_no: string;
  plate_province: string;
  brand: string;
  weight: number;
  color: string;
  kingpin_distance: number;
  width: number;
  length: number;
  height: number;
  axis_number: number;
  registration_document_url: string;
}

export interface SemiTrailerVehicle {
  id: number;
  user_id: string;
  vehicle_type_id: number;
  plate_no: string;
  plate_province: string;
  brand: string;
  weight: number;
  color: string;
  kingpin_distance: number;
  width: number;
  length: number;
  height: number;
  axis_number: number;
  registration_document_url: string;
}

export interface ETCVehicle {
  // id: number;
  // user_id: string;
  // vehicle_type_id: number;
  // plate_no: string;
  // plate_province: string;
  // brand: string;
  // weight: number;
  // color: string;
  // kingpin_distance: number;
  // width: number;
  // length: number;
  // height: number;
  // axis_number: number;
  // registration_document_url: string;

  estimate_id: string;
  vehicle: ETCVehicleDetail;
  vehicle_id: number;

}

export interface ETCVehicleDetail {
  id: number;
  user_id: string;
  vehicle_type_id: number;
  plate_no: string;
  plate_province: string;
  brand: string;
  weight: number;
  color: string;
  kingpin_distance: number;
  width: number;
  length: number;
  height: number;
  axis_type_id: any;
  registration_document_url: string;
}

export interface ProjectParams {
  business_id: string | number;
  project_id: string | number;
}

const initialState: TrackingState = {
  overview: {
    search: {
      search: '',
      page: 1,
      limit: 10
    },
    data: {
      data: [],
      page: 1,
      limit: 10,
      total_pages: 0,
      total: 0,
    },
  },
  detail: {
    business: {
      business_name: '',
      contact_name: '',
      entity_type: '',
      project: []
    },
    business_detail: {
      business_name: {
        business_name: '',
        entity_type: '',
        contact_name: '',
      },
      road_details: {
        route: [[]],
        project_name: '',
        request_type: '',
        start_date: '',
        end_date: '',
        start_point: '',
        end_point: '',
        start_province: '',
        end_province: '',
      },
      estimate: []
    }
  },
  loading: false
}

export const SLICE_NAME = 'TRACKING_SLICE';

export const getTrackingData = createAsyncThunk(SLICE_NAME + '/apiGetTrackingData', async (params: TrackingOverviewSearch) => {
  // assume someService required reesponse & require type as generic
  const response = await getTrackingAPI(params)
  return response.data
})

export const getGPSBusinessData = createAsyncThunk(SLICE_NAME + '/apiGetGPSBusinessData', async (id: string) => {
  // assume someService required reesponse & require type as generic
  const response = await getGPSBusinessAPI(id)
  return response.data
})

export const getGPSBusinessDetailData = createAsyncThunk(SLICE_NAME + '/apiGetGPSBusinessDetailData', async (params: ProjectParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getGPSBusinessDetailAPI(params)
  return response.data
})

const trackingSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTrackingData: (state, action) => {
      state.overview.search = action.payload.params,
        state.overview.data = action.payload.data
    },
    setTrackingBusiness: (state, action) => {
      state.detail.business = action.payload.data
    },
    setTrackingBusinessDetail: (state, action) => {
      state.detail.business_detail = action.payload.data
    },
    resetTrackingBusiness: (state) => {
      state.detail.business = initialState.detail.business
    },
    resetTrackingBusinessDetail: (state) => {
      state.detail.business_detail = initialState.detail.business_detail
    }
  },
  extraReducers: (builder) => {
    // CLIENT
    builder.addCase(getTrackingData.fulfilled, (state, action) => {
      state.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getTrackingData.pending, (state) => {
        state.loading = true
      })
      .addCase(getTrackingData.rejected, (state) => {
        state.loading = false
      })
    // CLIENT DETAIL
    builder.addCase(getGPSBusinessData.fulfilled, (state, action) => {
      state.detail.business = action.payload,
        state.loading = false
    })
      .addCase(getGPSBusinessData.pending, (state) => {
        state.loading = true
      })
      .addCase(getGPSBusinessData.rejected, (state) => {
        state.loading = false
      })
    builder.addCase(getGPSBusinessDetailData.fulfilled, (state, action) => {
      state.detail.business_detail = action.payload,
        state.loading = false
    })
      .addCase(getGPSBusinessDetailData.pending, (state) => {
        state.loading = true
      })
      .addCase(getGPSBusinessDetailData.rejected, (state) => {
        state.loading = false
      })
  }
})

export const {
  setTrackingData,
  setTrackingBusiness,
  setTrackingBusinessDetail,
  resetTrackingBusiness,
  resetTrackingBusinessDetail
} = trackingSlice.actions

export default trackingSlice.reducer