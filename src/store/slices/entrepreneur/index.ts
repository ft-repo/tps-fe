import { combineReducers } from '@reduxjs/toolkit'
import vehicleList from './vehicleListSlice'
import user from './userSlice'
import permitList from './permitSlice'
// TYPE
import { VehicleListState } from '@/@types/reducer/vehicle'
import { UserState } from '@/@types/reducer/user'
import { PetitionState } from '@/@types/reducer/petition'

const reducer = combineReducers({
  vehicleList,
  user,
  permitList
})

export type EntrepreneurState = {
  vehicleList: VehicleListState;
  user: UserState;
  permitList: PetitionState;
}

export * from './vehicleListSlice'
export * from './userSlice'
export * from './permitSlice'

export default reducer
