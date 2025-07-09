import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'routeEstimation',
        path: '/route-estimation',
        component: lazy(() => import('@/views/admin/route-estimation/')),
        authority: [],
    },
    {
        key: 'permitList',
        path: '/permit-list',
        component: lazy(() => import('@/views/admin/permit-list')),
        authority: [],
    },
    {
        key: 'vehicleList',
        path: '/vehicle-list',
        component: lazy(() => import('@/views/admin/vehicle-list')),
        authority: [],
    },
    {
        key: 'executiveData',
        path: '/executive-data',
        component: lazy(() => import('@/views/admin/executive-data')),
        authority: [],
    }
]
