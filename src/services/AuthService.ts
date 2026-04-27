import ApiService from './ApiService'
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
