import { combineReducers, Action, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import master, { MasterState } from './slices/master/masterSlice'
import layout, { LayoutState } from './slices/layout/LayoutSlice'
import RtkQueryService from '@/services/RtkQueryService'
import entrepreneur, { EntrepreneurState } from './slices/entrepreneur'
import staff, { StaffState } from './slices/staff/staffSlice'

export type RootState = {
	auth: AuthState;
	base: BaseState;
	locale: LocaleState;
	theme: ThemeState;
	master: MasterState;
	entrepreneur: EntrepreneurState;
	layout: LayoutState;
	staff: StaffState;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[RtkQueryService.reducerPath]: any;
}

export interface AsyncReducers {
	[key: string]: Reducer<any, Action>
}

const staticReducers = {
	auth,
	base,
	locale,
	theme,
	master,
	entrepreneur,
	layout,
	staff,
	[RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

const rootReducer =
	(asyncReducers?: AsyncReducers) => (state: RootState, action: Action) => {
		const combinedReducer = combineReducers({
			...staticReducers,
			...asyncReducers,
		})
		return combinedReducer(state, action)
	}

export default rootReducer
