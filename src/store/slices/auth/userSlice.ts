import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    id: string
    userName: string
    name: string
    details: {
        department?: {
            dept_name: string
            dept_type: number
            dept_group: number
            dept_province: string
        }
        role?: {
            name: string
        }
        entity_type?: {
            id: number
            name: string
        }
    }
    authority: string[]
}

const initialState: UserState = {
    id: '',
    userName: '',
    name: '',
    details: {
        department: undefined,
        role: undefined,
        entity_type: undefined,
    },
    authority: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload?.id
            state.userName = action.payload?.userName
            state.name = action.payload?.name
            state.details = action.payload?.details
            state.authority = action.payload?.authority
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
