/* eslint-disable import/no-unresolved */
import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'routeEstimationPub',
        path: '/tms',
        component: lazy(() => import('@/views/entrepreneur/route-estimation/public')),
        authority: [],
        meta: {
            layout: 'blank',
        },
    },
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
    {
        key: 'signInStaff',
        path: `/staff/sign-in`,
        component: lazy(() => import('@/views/auth/SignInStaff')),
        authority: [],
    },
]

export default authRoute
