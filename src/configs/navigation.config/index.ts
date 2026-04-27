/* eslint-disable import/no-unresolved */
import {
    // NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    // NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    // {
    //     key: 'route_estimation',
    //     path: '/route-estimation/route',
    //     title: 'Route Estimation',
    //     translateKey: 'nav.route_estimation',
    //     icon: 'route_estimation',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: ['USER'],
    //     subMenu: [],
    // },
    {
        key: 'permit_list',
        path: '/permit-list',
        title: 'Permit List',
        translateKey: 'nav.permit_list',
        icon: 'permit_list',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['USER'],
        subMenu: [],
    },
    {
        key: 'vehicle_list',
        path: '/vehicle-list/overview',
        title: 'Vehicle List',
        translateKey: 'nav.vehicle_list',
        icon: 'vehicle_list',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['USER'],
        subMenu: [],
    },
    {
        key: 'entrepreneur_info',
        path: '/entrepreneur-info',
        title: 'Executive Info',
        translateKey: 'nav.entrepreneur_info',
        icon: 'entrepreneur_info',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['USER'],
        subMenu: [],
    },
    {
        key: 'contact_channel',
        path: '/contact-channel',
        title: 'Contact Channel',
        translateKey: 'nav.contact_channel',
        icon: 'contact_channel',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['USER'],
        subMenu: [],
    },
    // STAFF ARE HERE
    // IF STAFF LOGIN IS READY, REMOVE USER FROM AUTHORITY
    {
        key: 'request_list',
        path: '/request-list/overview',
        title: 'Request List',
        translateKey: 'nav.request_list',
        icon: 'request_list',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['ADMIN'],
        subMenu: [],
    },
    {
        key: 'request_history',
        path: '/request-history/overview',
        title: 'Request History',
        translateKey: 'nav.request_history',
        icon: 'request_history',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['ADMIN'],
        subMenu: [],
    },
    {
        key: 'tracking',
        path: '/tracking/overview',
        title: 'Tracking',
        translateKey: 'nav.tracking',
        icon: 'tracking',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['ADMIN'],
        subMenu: [],
    },
    {
        key: 'user_info',
        path: '',
        title: 'User Info',
        translateKey: 'nav.user_info',
        icon: 'user_info',
        // type: NAV_ITEM_TYPE_ITEM,
        type: 'collapse',
        authority: ['ADMIN'],
        subMenu: [
            {
                key: 'staff_overview',
                path: '/user-info/staff/overview',
                title: 'nav.staff_overview',
                translateKey: 'nav.staff_overview',
                icon: 'staff_overview',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['ADMIN'],
                subMenu: []
            },
            {
                key: 'entrepreneur_overview',
                path: '/user-info/entrepreneur/overview',
                title: 'nav.entrepreneur_overview',
                translateKey: 'nav.entrepreneur_overview',
                icon: 'entrepreneur_overview',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['ADMIN'],
                subMenu: []
            },
            {
                key: 'general_user_overview',
                path: '/user-info/general-user/overview',
                title: 'nav.general_user_overview',
                translateKey: 'nav.general_user_overview',
                icon: 'general_user_overview',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['ADMIN'],
                subMenu: []
            },
        ],
    },
]

export default navigationConfig
