import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constant'
import { PetitionState } from '@/@types/reducer/petition'
import { getPetitionAPI, getPetitionExtendedAPI } from '@/services/entrepreneur/PetitionService'
import { GetPetitionParams } from '@/@types/services/petition'

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
	}
})



export const {
	setPetitionData,
	setPetitionDetail,
	setPetitionExtendedData,
	setPetitionExtendedDetail
} = petitionSlice.actions

export default petitionSlice.reducer