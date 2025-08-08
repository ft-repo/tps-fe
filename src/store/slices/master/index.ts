import { combineReducers } from '@reduxjs/toolkit'
// TYPE
import master, { MasterState } from './masterSlice'

const reducer = combineReducers({
  master
})

export type EntrepreneurState = {
  master: MasterState
}

export * from './masterSlice'

export default reducer
