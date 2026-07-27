import axios from 'axios'
import ApiService from './ApiService'
import appConfig from '@/configs/app.config'
import { API_KEY } from '@/constants/api.constant'
import type {
	SignInCredential,
	SignUpCredential,
	ForgotPassword,
	ResetPassword,
	SignInResponse,
	SignUpResponse,
	SignInStaffCredential,
	SignInStaffResponse,
} from '@/@types/auth'

export type RefreshRole = 'client' | 'admin'

export type RefreshResponse = {
	access_token: string
	refresh_token?: string
}

// Bare axios instance for the token refresh call ONLY — it must never go
// through BaseService/ApiService. Routing it there would re-enter the
// request interceptor's proactive refresh check and the response
// interceptor's 401 handler, turning a refresh 401 into an infinite loop.
const RefreshHttpClient = axios.create({
	baseURL: appConfig.apiPrefix,
	timeout: 60000,
})

export async function apiRefresh(data: { refresh_token: string }, role: RefreshRole) {
	const path = role === 'admin' ? 'admin/auth/refresh' : 'client/auth/refresh'
	const headers: Record<string, string> = {}
	if (import.meta.env.VITE_API_KEY) {
		headers[API_KEY] = import.meta.env.VITE_API_KEY
	}
	return RefreshHttpClient.post<RefreshResponse>(path, data, { headers })
}

export async function apiSignIn(data: SignInCredential, is_personal?: boolean) {
	return ApiService.fetchData<SignInResponse>({
		url: `/client/auth/login`,
		method: 'post',
		data,
		params: {
			is_personal: is_personal
		}
	})
}

export function apiSignInWithToken(token: string) {
	return ApiService.fetchData<SignInResponse>({
		url: `/me/${token}`,
		method: 'POST',
	})
}

export async function apiSignInStaff(data: SignInStaffCredential) {
	return ApiService.fetchData<SignInStaffResponse>({
		url: '/admin/auth/login',
		method: 'post',
		data,
	})
}

export async function apiSignUp(data: SignUpCredential) {
	return ApiService.fetchData<SignUpResponse>({
		url: '/client/auth/register',
		method: 'post',
		data,
	})
}

export async function apiForgotPassword(data: ForgotPassword) {
	return ApiService.fetchData({
		url: '/forgot-password',
		method: 'post',
		data,
	})
}

export async function apiResetPassword(data: ResetPassword) {
	return ApiService.fetchData({
		url: '/reset-password',
		method: 'post',
		data,
	})
}
