import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constant'
import { PetitionState } from '@/@types/reducer/petition'
import { getPetitionAPI, getPetitionEstimateBridgeAPI, getPetitionEstimateDetailAPI, getPetitionEstimateSummaryAPI, getPetitionEstimateTurnRadiusAPI, getPetitionExtendedAPI } from '@/services/entrepreneur/PetitionService'
import { GetEstimateDetailParams, GetEstimateParams, GetPetitionParams } from '@/@types/services/petition'

const initialState: PetitionState = {
	petition: {
		overview: {
			search: {
				search: '',
				page: 1,
				limit: 10
			},
			data: {
				data: [],
				total: 0,
				page: 1,
				limit: 10,
				total_pages: 0
			},
		},
		detail: {}
	},
	petition_extended: {
		overview: {
			search: {
				search: '',
				page: 1,
				limit: 10
			},
			data: {
				data: [],
				total: 0,
				page: 1,
				limit: 10,
				total_pages: 0
			},
		},
		detail: {},
	},
	estimate: {
		detail: {
			towing_vehicle: {
				vehicle_type: '',
				vehicle_weight: 0,
				vehicle_plate: '',
				vehicle_province: '',
				vehicle_picture: '',
			},
			semi_trailer_vehicle: {
				vehicle_type: '',
				vehicle_weight: 0,
				vehicle_plate: '',
				vehicle_province: '',
				vehicle_picture: '',
			},
			etc_vehicle: {
				vehicle_type: '',
				vehicle_weight: 0,
				vehicle_plate: '',
				vehicle_province: '',
				vehicle_picture: '',
			},
			towing_axis_weight: [],
			semi_trailer_axis_weight: [],
			start_point: [],
			end_point: [],
			vehicle_route: [],
			estimate_rural_roads: '',
			start_road: '',
			end_road: '',
			start_road_code: '',
			end_road_code: '',
		},
		summary: {
			search: {
				estimate_id: '',
				page: 1,
				limit: 10
			},
			data: {
				data: [],
				page: 1,
				limit: 10,
				total_pages: 0,
				total: 0,
			}
		},
		bridge: {
			search: {
				estimate_id: '',
				page: 1,
				limit: 10
			},
			data: {
				data: [],
				page: 1,
				limit: 10,
				total_pages: 0,
				total: 0,
			}
		},
		turn_radius: {
			search: {
				estimate_id: '',
				page: 1,
				limit: 10
			},
			data: {
				data: [],
				page: 1,
				limit: 10,
				total_pages: 0,
				total: 0,
			}
		}
	},
	loading: false
}

// export const SLICE_NAME = 'yourSliceName';

export const getPetitionData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetPetitionData', async (params: GetPetitionParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionAPI(params)
	return response.data
})

export const getPetitionExtendedData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetPetitionExtendedData', async (params: GetPetitionParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionExtendedAPI(params)
	return response.data
})

export const getEstimateDetailData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetEstimateDetailData', async (params: GetEstimateParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionEstimateDetailAPI(params)
	return response.data
})

export const getEstimateSummaryData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetEstimateSummaryData', async (params: GetEstimateParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionEstimateSummaryAPI(params)
	return response.data
})

export const getEstimateBridgeData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetEstimateBridgeData', async (params: GetEstimateDetailParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionEstimateBridgeAPI(params)
	return response.data
})

export const getEstimateTurnRadiusData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetEstimateTurnRadiusData', async (params: GetEstimateDetailParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionEstimateTurnRadiusAPI(params)
	return response.data
})

const petitionSlice = createSlice({
	name: `${SLICE_BASE_NAME}/petition`,
	initialState,
	reducers: {
		setPetitionData: (state, action) => {
			state.petition.overview.search = action.payload.params,
				state.petition.overview.data = action.payload.data
		},
		setPetitionDetail: (state, action) => {
			state.petition.detail = action.payload
		},
		setPetitionExtendedData: (state, action) => {
			state.petition_extended.overview.search = action.payload.params,
				state.petition_extended.overview.data = action.payload.data
		},
		setPetitionExtendedDetail: (state, action) => {
			state.petition_extended.detail = action.payload
		},
		setRouteEstimationDetail: (state, action) => {
			state.estimate.detail = action.payload.data
		},
		setRouteEstimationSummary: (state, action) => {
			state.estimate.summary.search = action.payload.params,
				state.estimate.summary.data = action.payload.data
		},
		setRouteEstimationBridge: (state, action) => {
			state.estimate.bridge.search = action.payload.params,
				state.estimate.bridge.data = action.payload.data
		},
		setRouteEstimationTurnRadius: (state, action) => {
			state.estimate.turn_radius.search = action.payload.params,
				state.estimate.turn_radius.data = action.payload.data
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getPetitionData.fulfilled, (state, action) => {
			state.petition.overview.data = action.payload,
				state.loading = false
		})
			.addCase(getPetitionData.pending, (state) => {
				state.loading = true
			})
			.addCase(getPetitionData.rejected, (state) => {
				state.loading = false
			})
		builder.addCase(getPetitionExtendedData.fulfilled, (state, action) => {
			state.petition_extended.overview.data = action.payload,
				state.loading = false
		})
			.addCase(getPetitionExtendedData.pending, (state) => {
				state.loading = true
			})
			.addCase(getPetitionExtendedData.rejected, (state) => {
				state.loading = false
			})
		// ESTIMATE DETAIL
		builder.addCase(getEstimateDetailData.fulfilled, (state, action) => {
			state.estimate.detail = action.payload,
				state.loading = false
		})
			.addCase(getEstimateDetailData.pending, (state) => {
				state.loading = true
			})
			.addCase(getEstimateDetailData.rejected, (state) => {
				state.loading = false
			})
		// ESTIMATE SUMMARY
		builder.addCase(getEstimateSummaryData.fulfilled, (state, action) => {
			state.estimate.summary.data.data = action.payload,
				state.loading = false
		})
			.addCase(getEstimateSummaryData.pending, (state) => {
				state.loading = true
			})
			.addCase(getEstimateSummaryData.rejected, (state) => {
				state.loading = false
			})
		// ESTIMATE BRIDGE
		builder.addCase(getEstimateBridgeData.fulfilled, (state, action) => {
			state.estimate.bridge.data = action.payload,
				state.loading = false
		})
			.addCase(getEstimateBridgeData.pending, (state) => {
				state.loading = true
			})
			.addCase(getEstimateBridgeData.rejected, (state) => {
				state.loading = false
			})
		// ESTIMATE BRIDGE
		builder.addCase(getEstimateTurnRadiusData.fulfilled, (state, action) => {
			state.estimate.turn_radius.data = action.payload,
				state.loading = false
		})
			.addCase(getEstimateTurnRadiusData.pending, (state) => {
				state.loading = true
			})
			.addCase(getEstimateTurnRadiusData.rejected, (state) => {
				state.loading = false
			})
	}
})



export const {
	setPetitionData,
	setPetitionDetail,
	setPetitionExtendedData,
	setPetitionExtendedDetail,
	setRouteEstimationDetail,
	setRouteEstimationSummary,
	setRouteEstimationBridge,
	setRouteEstimationTurnRadius
} = petitionSlice.actions

export default petitionSlice.reducer