import { combineReducers, configureStore } from '@reduxjs/toolkit'
import vehicleList from './vehicleListSlice'
import permitReducer from '@/store/slices/entrepreneur/permitSlice'
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

export const store = configureStore({
  reducer: {
    entrepreneur: combineReducers({
      permit: permitReducer,
    }),
  }
})

export * from './vehicleListSlice'
export * from './userSlice'

export default reducer
