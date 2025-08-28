import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RouteDirectionResponse } from "@/@types/shared"
import { getRouteDirection, RouteDirectionRequest } from "@/services/route/RouteDirectionService";

export type RouteDirectionState = {
  routeDirection: RouteDirectionResponse | null,
  loading: boolean,
}

const initialState: RouteDirectionState = {
  routeDirection: null,
  loading: false,
}

export const SLICE_NAME = 'routeDirectionAPI';

export const getRouteDirectionAPI = createAsyncThunk(
  `${SLICE_NAME}/getRouteDirection`,
  async (data: RouteDirectionRequest) => {
    const response = await getRouteDirection(data)
    return response.data
  }
)

const routeDirectionSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setRouteDirection: (state: RouteDirectionState, action: PayloadAction<RouteDirectionResponse>) => {
      state.routeDirection = action.payload
    },
    clearRouteDirection: (state: RouteDirectionState) => {
      state.routeDirection = null
    },
  },extraReducers: (builder) => {
    builder
      .addCase(getRouteDirectionAPI.fulfilled, (state, action) => {
        state.routeDirection = action.payload
      })
      .addCase(getRouteDirectionAPI.pending, (state) => {
        state.loading = true
      })
      .addCase(getRouteDirectionAPI.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setRouteDirection, clearRouteDirection } = routeDirectionSlice.actions
export default routeDirectionSlice.reducer