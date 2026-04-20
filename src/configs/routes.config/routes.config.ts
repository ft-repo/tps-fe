/* eslint-disable import/no-unresolved */
import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    // {
    //     key: 'home',
    //     path: '/home',
    //     component: lazy(() => import('@/views/Home')),
    //     authority: [],
    // },
    /** ROLE ADMIN */
    {
        // key: 'route_estimation',
        key: 'permit_list',
        path: '/route-estimation/route',
        component: lazy(() => import('@/views/entrepreneur/route-estimation/route')),
        authority: ['USER'],
    },
    {
        // key: 'other_route_estimation',
        key: 'permit_list',
        path: '/route-estimation/other',
        component: lazy(() => import('@/views/entrepreneur/route-estimation/other')),
        authority: ['USER'],
    },
    {
        key: 'permit_list',
        path: '/permit-list',
        component: lazy(() => import('@/views/entrepreneur/permit-list/overview')),
        authority: ['USER'],
    },
    {
        key: 'view_permit_list',
        path: '/permit-list/view',
        component: lazy(() => import('@/views/entrepreneur/permit-list/view')),
        authority: ['USER'],
    },
    {
        key: 'vehicle_list',
        path: '/vehicle-list/overview',
        component: lazy(() => import('@/views/entrepreneur/vehicle-list/overview')),
        authority: ['USER'],
    },
    {
        // key: 'create_vehicle_list',
        key: 'vehicle_list',
        path: '/vehicle-list/create',
        component: lazy(() => import('@/views/entrepreneur/vehicle-list/create')),
        authority: ['USER'],
    },
    {
        key: 'entrepreneur_info',
        path: '/entrepreneur-info',
        component: lazy(() => import('@/views/entrepreneur/entrepreneur-info')),
        authority: ['USER'],
    },
    {
        key: 'contact_channel',
        path: '/contact-channel',
        component: lazy(() => import('@/views/entrepreneur/contact-channel')),
        authority: ['USER'],
    },
    /** ROLE STAFF */
    // IF STAFF LOGIN IS READY, REMOVE USER FROM AUTHORITY
    {
        key: 'entrepreneur_overview',
        path: '/user-info/entrepreneur/overview',
        component: lazy(() => import('@/views/staff/user-info/entrepreneur/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'view_entrepreneur',
        path: '/user-info/entrepreneur/view/:id',
        component: lazy(() => import('@/views/staff/user-info/entrepreneur/view')),
        authority: ['ADMIN'],
    },
    {
        key: 'staff_overview',
        path: '/user-info/staff/overview',
        component: lazy(() => import('@/views/staff/user-info/staff/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'general_user_overview',
        path: '/user-info/general-user/overview',
        component: lazy(() => import('@/views/staff/user-info/general-user/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'general_user_view',
        path: '/user-info/general-user/view/:id',
        component: lazy(() => import('@/views/staff/user-info/general-user/view')),
        authority: ['ADMIN'],
    },
    {
        key: 'create_staff',
        path: '/user-info/staff/create',
        component: lazy(() => import('@/views/staff/user-info/staff/create')),
        authority: ['ADMIN'],
    },
    {
        key: 'request_list',
        path: '/request-list/overview',
        component: lazy(() => import('@/views/staff/request-list/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_document',
        path: '/request-list/approval/document',
        component: lazy(() => import('@/views/staff/request-list/approval/document')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_route',
        path: '/request-list/approval/route',
        component: lazy(() => import('@/views/staff/request-list/approval/route')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_vehicle',
        path: '/request-list/approval/vehicle',
        component: lazy(() => import('@/views/staff/request-list/approval/vehicle')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_sign',
        path: '/request-list/approval/sign',
        component: lazy(() => import('@/views/staff/request-list/approval/sign')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_permit',
        path: '/request-list/approval/permit',
        component: lazy(() => import('@/views/staff/request-list/approval/permit')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_evaluation',
        path: '/request-list/approval/evaluation',
        component: lazy(() => import('@/views/staff/request-list/approval/evaluation')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_other_document',
        path: '/request-list/approval/other',
        component: lazy(() => import('@/views/staff/request-list/approval/other')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_sign_extended',
        path: '/request-list/approval/sign-extended',
        component: lazy(() => import('@/views/staff/request-list/approval/sign_extended')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_permit_extended',
        path: '/request-list/approval/permit-extended',
        component: lazy(() => import('@/views/staff/request-list/approval/permit_extended')),
        authority: ['ADMIN'],
    },
    {
        key: 'request_history',
        path: '/request-history/overview',
        component: lazy(() => import('@/views/staff/request-history/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'view_normal_vehicle',
        path: '/request-history/view/document',
        component: lazy(() => import('@/views/staff/request-history/view/document')),
        authority: ['ADMIN'],
    },
    {
        key: 'view_other_vehicle',
        path: '/request-history/view/other',
        component: lazy(() => import('@/views/staff/request-history/view/other')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_other_document',
        path: '/request-history/approval/other',
        component: lazy(() => import('@/views/staff/request-history/approval/other')),
        authority: ['ADMIN'],
    },
    {
        key: 'approval_document',
        path: '/request-history/approval/document',
        component: lazy(() => import('@/views/staff/request-history/approval/document')),
        authority: ['ADMIN'],
    },
    {
        key: 'tracking',
        path: '/tracking/overview',
        component: lazy(() => import('@/views/staff/tracking/overview')),
        authority: ['ADMIN'],
    },
    {
        key: 'tracking',
        path: '/tracking/view',
        component: lazy(() => import('@/views/staff/tracking/view')),
        authority: ['ADMIN'],
    },
    // ACCESS DENIED
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(() => import('@/views/errors/access_denied')),
        authority: [],
        meta: {
            layout: 'blank',
        },
    },
]
