import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constant'
import { PetitionState } from '@/@types/reducer/petition'
import { getPetitionAPI, getPetitionDetailDocumentAPI, getPetitionDetailVehicleAPI, getPetitionEstimateBridgeAPI, getPetitionEstimateDetailAPI, getPetitionEstimateSummaryAPI, getPetitionEstimateTurnRadiusAPI, getPetitionExtendedAPI, getPetitionRoadMapAPI } from '@/services/entrepreneur/PetitionService'
import { GetEstimateDetailParams, GetEstimateParams, GetPetitionDetailParams, GetPetitionParams, PetitionRoadMapRequest } from '@/@types/services/petition'

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
	petition_detail: {
		document: {
			"petition_id": 0,
			"registration_no": "",
			"business_name": "",
			"entity_type": "",
			"address": "",
			"business_phone_no": "",
			"contact_name": "",
			"contact_phone_no": "",
			"project_name": "",
			"petition_type": "",
			"start_date": "",
			"end_date": "",
			"start_point": "",
			"end_point": "",
			"poa_url": "",
			"mach_book_url": ""
		},
		vehicle: {
			"petition_id": 0,
			"vehicle_list": []
		},
		road_map: {
			id: '',
			vehicle_route: [],
			start_point: [],
			end_point: [],
			estimate: [],
		}
	},
	loading: {
		petition: {
			overview: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			detail: {
				is_loading: false,
				loading_string: 'IDLE'
			}
		},
		petition_extended: {
			overview: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			detail: {
				is_loading: false,
				loading_string: 'IDLE'
			}
		},
		estimate: {
			bridge: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			detail: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			summary: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			turn_radius: {
				is_loading: false,
				loading_string: 'IDLE'
			}
		},
		petition_detail: {
			document: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			vehicle: {
				is_loading: false,
				loading_string: 'IDLE'
			},
			road_map: {
				is_loading: false,
				loading_string: 'IDLE'
			}
		}
	}
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

export const getPetitionDetailDocumentData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetPetitionDetailDocumentData', async (params: GetPetitionDetailParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionDetailDocumentAPI(params)
	return response.data
})

export const getPetitionDetailVehicleData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetPetitionDetailVehicleData', async (params: GetPetitionDetailParams) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionDetailVehicleAPI(params)
	return response.data
})

export const getPetitionRoadMapData = createAsyncThunk(`${SLICE_BASE_NAME}/petition` + '/apiGetPetitionRoadMapData', async (params: PetitionRoadMapRequest) => {
	// assume someService required reesponse & require type as generic
	const response = await getPetitionRoadMapAPI(params)
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
		// SET
		setPetitionDetailDocument: (state, action) => {
			state.petition_detail.document = action.payload
		},
		setPetitionDetailRoadMap: (state, action) => {
			state.petition_detail.road_map = action.payload
		},
		setPetitionDetailVehicle: (state, action) => {
			state.petition_detail.vehicle = action.payload
		},
		// RESET
		resetPetitionDetailDocument: (state) => {
			state.petition_detail.document = initialState.petition_detail.document
		},
		resetPetitionDetailRoadMap: (state) => {
			state.petition_detail.road_map = initialState.petition_detail.road_map
		},
		resetPetitionDetailVehicle: (state) => {
			state.petition_detail.vehicle = initialState.petition_detail.vehicle
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPetitionData.fulfilled, (state, action) => {
				state.petition.overview.data = action.payload,
					state.loading.petition.overview.is_loading = false,
					state.loading.petition.overview.loading_string = 'SUCCESS'
			})
			.addCase(getPetitionData.pending, (state) => {
				state.loading.petition.overview.is_loading = true,
					state.loading.petition.overview.loading_string = 'LOADING'
			})
			.addCase(getPetitionData.rejected, (state) => {
				state.loading.petition.overview.is_loading = false,
					state.loading.petition.overview.loading_string = 'FAILED'
			})
		builder
			.addCase(getPetitionExtendedData.fulfilled, (state, action) => {
				state.petition_extended.overview.data = action.payload,
					state.loading.petition_extended.overview.is_loading = false,
					state.loading.petition_extended.overview.loading_string = 'SUCCESS'
			})
			.addCase(getPetitionExtendedData.pending, (state) => {
				state.loading.petition_extended.overview.is_loading = true,
					state.loading.petition_extended.overview.loading_string = 'LOADING'
			})
			.addCase(getPetitionExtendedData.rejected, (state) => {
				state.loading.petition_extended.overview.is_loading = false,
					state.loading.petition_extended.overview.loading_string = 'FAILED'
			})
		// ESTIMATE DETAIL
		builder
			.addCase(getEstimateDetailData.fulfilled, (state, action) => {
				state.estimate.detail = action.payload,
					state.loading.estimate.detail.is_loading = false,
					state.loading.estimate.detail.loading_string = 'SUCCESS'
			})
			.addCase(getEstimateDetailData.pending, (state) => {
				state.loading.estimate.detail.is_loading = true,
					state.loading.estimate.detail.loading_string = 'LOADING'

			})
			.addCase(getEstimateDetailData.rejected, (state) => {
				state.loading.estimate.detail.is_loading = false,
					state.loading.estimate.detail.loading_string = 'FAILED'
			})
		// ESTIMATE SUMMARY
		builder
			.addCase(getEstimateSummaryData.fulfilled, (state, action) => {
				state.estimate.summary.data.data = action.payload,
					state.loading.estimate.summary.is_loading = false,
					state.loading.estimate.summary.loading_string = 'SUCCESS'
			})
			.addCase(getEstimateSummaryData.pending, (state) => {
				state.loading.estimate.summary.is_loading = true,
					state.loading.estimate.summary.loading_string = 'LOADING'
			})
			.addCase(getEstimateSummaryData.rejected, (state) => {
				state.loading.estimate.summary.is_loading = false,
					state.loading.estimate.summary.loading_string = 'FAILED'
			})
		// ESTIMATE BRIDGE
		builder
			.addCase(getEstimateBridgeData.fulfilled, (state, action) => {
				state.estimate.bridge.data = action.payload,
					state.loading.estimate.bridge.is_loading = false,
					state.loading.estimate.bridge.loading_string = 'SUCCESS'
			})
			.addCase(getEstimateBridgeData.pending, (state) => {
				state.loading.estimate.bridge.is_loading = true,
					state.loading.estimate.bridge.loading_string = 'LOADING'
			})
			.addCase(getEstimateBridgeData.rejected, (state) => {
				state.loading.estimate.bridge.is_loading = false,
					state.loading.estimate.bridge.loading_string = 'FAILED'
			})
		// ESTIMATE TURN RADIUS
		builder
			.addCase(getEstimateTurnRadiusData.fulfilled, (state, action) => {
				state.estimate.turn_radius.data = action.payload,
					state.loading.estimate.turn_radius.is_loading = false,
					state.loading.estimate.turn_radius.loading_string = 'SUCCESS'
			})
			.addCase(getEstimateTurnRadiusData.pending, (state) => {
				state.loading.estimate.turn_radius.is_loading = true,
					state.loading.estimate.turn_radius.loading_string = 'LOADING'
			})
			.addCase(getEstimateTurnRadiusData.rejected, (state) => {
				state.loading.estimate.turn_radius.is_loading = false,
					state.loading.estimate.turn_radius.loading_string = 'FAILED'
			})
		// PETITION DETAIL DOCUMENT
		builder
			.addCase(getPetitionDetailDocumentData.fulfilled, (state, action) => {
				state.petition_detail.document = action.payload,
					state.loading.petition_detail.document.is_loading = false,
					state.loading.petition_detail.document.loading_string = 'SUCCESS'
			})
			.addCase(getPetitionDetailDocumentData.pending, (state) => {
				state.loading.petition_detail.document.is_loading = true,
					state.loading.petition_detail.document.loading_string = 'LOADING'
			})
			.addCase(getPetitionDetailDocumentData.rejected, (state) => {
				state.loading.petition_detail.document.is_loading = false,
					state.loading.petition_detail.document.loading_string = 'FAILED'
			})
		// PETITION DETAIL VEHICLE
		builder
			.addCase(getPetitionDetailVehicleData.fulfilled, (state, action) => {
				state.petition_detail.vehicle = action.payload,
					state.loading.petition_detail.vehicle.is_loading = false,
					state.loading.petition_detail.vehicle.loading_string = 'SUCCESS'
			})
			.addCase(getPetitionDetailVehicleData.pending, (state) => {
				state.loading.petition_detail.vehicle.is_loading = true,
					state.loading.petition_detail.vehicle.loading_string = 'LOADING'
			})
			.addCase(getPetitionDetailVehicleData.rejected, (state) => {
				state.loading.petition_detail.vehicle.is_loading = false,
					state.loading.petition_detail.vehicle.loading_string = 'FAILED'
			})
		// PETITION DETAIL ROAD MAP
		builder
			.addCase(getPetitionRoadMapData.fulfilled, (state, action) => {
				state.petition_detail.road_map = action.payload,
					state.loading.petition_detail.road_map.is_loading = false,
					state.loading.petition_detail.road_map.loading_string = 'SUCCESS'
			})
			.addCase(getPetitionRoadMapData.pending, (state) => {
				state.loading.petition_detail.road_map.is_loading = true,
					state.loading.petition_detail.road_map.loading_string = 'LOADING'
			})
			.addCase(getPetitionRoadMapData.rejected, (state) => {
				state.loading.petition_detail.road_map.is_loading = false,
					state.loading.petition_detail.road_map.loading_string = 'FAILED'
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
	setRouteEstimationTurnRadius,
	setPetitionDetailDocument,
	setPetitionDetailRoadMap,
	setPetitionDetailVehicle,
	resetPetitionDetailDocument,
	resetPetitionDetailRoadMap,
	resetPetitionDetailVehicle
} = petitionSlice.actions

export default petitionSlice.reducer