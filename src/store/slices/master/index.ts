import { combineReducers } from '@reduxjs/toolkit'
// TYPE
import master, { } from './masterSlice'

const reducer = combineReducers({
  master
})

export type MasterState = {
  master: MasterState
}

export * from './masterSlice'

export default reducer
