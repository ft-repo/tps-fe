// src/store/slices/entrepreneur/permitSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import PermitListService from '@/services/entrepreneur/PermitListService'
import type { PetitionListResponse, Petition } from '@/@types/entrepreneur/permit-list'

interface PermitState {
    data: Petition[]            // <-- explicit
    total: number
    loading: boolean
    error: string | null
}

const initialState: PermitState = {
    data: [],                   // <-- now typed as Petition[] (because of PermitState)
    total: 0,
    loading: false,
    error: null,
}

export const fetchPermitList = createAsyncThunk<
    PetitionListResponse,
    { page: number; limit: number }
>('permit/fetchPermitList', async (params, { rejectWithValue }) => {
    try {
        const { data } = await PermitListService.getPermitList(params) // unwrap .data
        return data
    } catch (e: any) {
        return rejectWithValue(e?.response?.data ?? e?.message ?? 'Request failed')
    }
})

const permitSlice = createSlice({
    name: 'permit',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchPermitList.pending, (s) => {
            s.loading = true
            s.error = null
        })
            .addCase(
                fetchPermitList.fulfilled,
                (s, a: PayloadAction<PetitionListResponse>) => {
                    s.loading = false
                    s.data = a.payload.data        // Petition[]
                    s.total = a.payload.total
                }
            )
            .addCase(fetchPermitList.rejected, (s, a) => {
                s.loading = false
                s.error = (a.payload as any)?.message ?? a.error.message ?? 'Error'
            })
    },
})

export default permitSlice.reducer
