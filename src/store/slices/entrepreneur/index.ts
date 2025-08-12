import { combineReducers } from '@reduxjs/toolkit'
import vehicleList from './vehicleListSlice'
// TYPE
import { VehicleListState } from '@/@types/reducer/vehicle'
import user from './userSlice'
import { UserState } from '../auth'
const reducer = combineReducers({
  vehicleList,
  user
})

export type EntrepreneurState = {
  vehicleList: VehicleListState,
  user: UserState
}

export * from './vehicleListSlice'
export * from './userSlice'

export default reducer
