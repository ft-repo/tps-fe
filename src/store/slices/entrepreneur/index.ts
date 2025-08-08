import { combineReducers } from '@reduxjs/toolkit'
import vehicleList from './vehicleListSlice'
// TYPE
import { VehicleListState } from '@/@types/entrepreneur/vehicle-list'

const reducer = combineReducers({
  vehicleList
})

export type EntrepreneurState = {
  vehicleList: VehicleListState
}

export * from './vehicleListSlice'

export default reducer
