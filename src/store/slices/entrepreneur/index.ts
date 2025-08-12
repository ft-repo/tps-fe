import { combineReducers, configureStore } from '@reduxjs/toolkit'
import vehicleList from './vehicleListSlice'
import permitReducer from '@/store/slices/entrepreneur/permitSlice'
// TYPE
import { VehicleListState } from '@/@types/reducer/vehicle'

const reducer = combineReducers({
  vehicleList
})

export type EntrepreneurState = {
  vehicleList: VehicleListState
}

export const store = configureStore({
  reducer: {
    entrepreneur: combineReducers({
      permit: permitReducer,
    }),
  }
})

export * from './vehicleListSlice'

export default reducer
