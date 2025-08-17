import { combineReducers } from '@reduxjs/toolkit'
import staff from './staffSlice'
import petition from './petitionSlice'
// TYPE
import { StaffState } from '@/@types/reducer/user'
import { PetitionAdminState } from '@/@types/reducer/petition'

const reducer = combineReducers({
  staff,
  petition
})

export type AdminState = {
  staff: StaffState;
  petition: PetitionAdminState;
}

export * from './staffSlice'
export * from './petitionSlice'

export default reducer
