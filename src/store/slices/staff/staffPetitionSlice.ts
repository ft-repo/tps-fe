import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PetitionState } from '@/@types/reducer/petition'
import { getPetitionAdminAPI } from '@/services/entrepreneur/PetitionService'
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

export const getStaffPetitionData = createAsyncThunk(
    'staffPetition/apiGetPetitionData',
    async (params: GetPetitionParams) => {
        const response = await getPetitionAdminAPI(params)
        return response.data
    }
)

const staffPetitionSlice = createSlice({
    name: 'staffPetition',
    initialState,
    reducers: {
        setStaffPetitionData: (state, action) => {
            state.petition.overview.search = action.payload.params
            state.petition.overview.data = action.payload.data
        },
        setStaffPetitionDetail: (state, action) => {
            state.petition.detail = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStaffPetitionData.pending, (state) => {
                state.loading = true
            })
            .addCase(getStaffPetitionData.fulfilled, (state, action) => {
                state.loading = false
                state.petition.overview.data = action.payload
            })
            .addCase(getStaffPetitionData.rejected, (state) => {
                state.loading = false
            })
    }
})

export const {
    setStaffPetitionData,
    setStaffPetitionDetail
} = staffPetitionSlice.actions

export default staffPetitionSlice.reducer
