import { createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants';

export type LayoutState = {
  loading: boolean;
  fullscreen_loading: boolean;
}

const initialState: LayoutState = {
  loading: false,
  fullscreen_loading: false
}

// export const SLICE_NAME = 'layoutSlice';

const layoutSlice = createSlice({
  name: SLICE_BASE_NAME,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setFullscreenLoading: (state, action) => {
      state.fullscreen_loading = action.payload
    }
  }
})

export const { setLoading, setFullscreenLoading } = layoutSlice.actions

export default layoutSlice.reducer