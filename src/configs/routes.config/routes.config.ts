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
        component: lazy(() => import('@/views/admin/route-estimation')),
        authority: [],
    },
    {
        key: 'permitList',
        path: '/permit-list/overview',
        component: lazy(() => import('@/views/admin/permit-list/overview')),
        authority: [],
    },
    {
        key: 'permitListById',
        path: '/permit-list/view',
        component: lazy(() => import('@/views/admin/permit-list/view')),
        authority: [],
    },
    {
        key: 'vehicleList',
        path: '/vehicle-list/overview',
        component: lazy(() => import('@/views/admin/vehicle-list/overview')),
        authority: [],
    },
        {
        key: 'createVehicleList',
        path: '/vehicle-list/create',
        component: lazy(() => import('@/views/admin/vehicle-list/create')),
        authority: [],
    },
    {
        key: 'executiveData',
        path: '/executive-data',
        component: lazy(() => import('@/views/admin/executive-data')),
        authority: [],
    }
]
