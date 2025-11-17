import { createSlice } from '@reduxjs/toolkit'

export type TrackingState = {
  overview: TrackingOverview;
  detail: any;
  loading: boolean;
}

export interface TrackingOverview {
  search: TrackingOverviewSearch;
  data: TrackingOverviewData;
}

export interface TrackingOverviewSearch {
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

const initialState: TrackingState = {
  overview: {
    search: {
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
  detail: {},
  loading: false
}

export const SLICE_NAME = 'TRACKING_SLICE';

const trackingSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTrackingData: (state, action) => {
      state.overview.search = action.payload.params,
        state.overview.data = action.payload.data
    },
  }
})

export const {
  setTrackingData
} = trackingSlice.actions

export default trackingSlice.reducer