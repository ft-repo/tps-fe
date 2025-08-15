import { combineReducers } from '@reduxjs/toolkit'
import staff from './staffSlice'
// TYPE
import { StaffState } from '@/@types/reducer/user'

const reducer = combineReducers({
  staff
})

export type AdminState = {
  staff: StaffState
}

export * from './staffSlice'


export default reducer
