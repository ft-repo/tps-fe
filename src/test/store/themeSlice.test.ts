import { describe, it, expect, vi } from 'vitest'

vi.mock('@/configs/theme.config', () => ({
    themeConfig: {
        themeColor: 'indigo',
        direction: 'ltr',
        mode: 'light',
        primaryColorLevel: 600,
        panelExpand: false,
        cardBordered: false,
        navMode: 'light',
        layout: { type: 'modern', sideNavCollapse: false },
    },
}))

vi.mock('@/constants/theme.constant', () => ({
    LAYOUT_TYPE_MODERN: 'modern',
    LAYOUT_TYPE_CLASSIC: 'classic',
    LAYOUT_TYPE_STACKED_SIDE: 'stackedSide',
    LAYOUT_TYPE_DECKED: 'decked',
    NAV_MODE_TRANSPARENT: 'transparent',
    NAV_MODE_LIGHT: 'light',
    NAV_MODE_DARK: 'dark',
    NAV_MODE_THEMED: 'themed',
    MODE_DARK: 'dark',
    MODE_LIGHT: 'light',
}))

import themeReducer, {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setNavMode,
    setPanelExpand,
    setThemeColor,
    setThemeColorLevel,
} from '@/store/slices/theme/themeSlice'

describe('themeSlice', () => {
    const getInitial = () => themeReducer(undefined, { type: '@@INIT' })

    it('initialises with config defaults', () => {
        const state = getInitial()
        expect(state.themeColor).toBe('indigo')
        expect(state.direction).toBe('ltr')
        expect(state.mode).toBe('light')
    })

    it('setDirection updates direction', () => {
        const state = themeReducer(getInitial(), setDirection('rtl'))
        expect(state.direction).toBe('rtl')
    })

    it('setThemeColor updates themeColor', () => {
        const state = themeReducer(getInitial(), setThemeColor('blue'))
        expect(state.themeColor).toBe('blue')
    })

    it('setThemeColorLevel updates primaryColorLevel', () => {
        const state = themeReducer(getInitial(), setThemeColorLevel(500))
        expect(state.primaryColorLevel).toBe(500)
    })

    it('setPanelExpand sets panelExpand', () => {
        const state = themeReducer(getInitial(), setPanelExpand(true))
        expect(state.panelExpand).toBe(true)
    })

    it('setSideNavCollapse collapses the nav', () => {
        const state = themeReducer(getInitial(), setSideNavCollapse(true))
        expect(state.layout.sideNavCollapse).toBe(true)
    })

    it('setMode to dark switches navMode on classic layout', () => {
        const classicState = themeReducer(getInitial(), setLayout('classic'))
        const darkState = themeReducer(classicState, setMode('dark'))
        expect(darkState.mode).toBe('dark')
        expect(darkState.navMode).toBe('dark')
    })

    it('setLayout to modern sets cardBordered=true and navMode=transparent', () => {
        const state = themeReducer(getInitial(), setLayout('modern'))
        expect(state.cardBordered).toBe(true)
        expect(state.navMode).toBe('transparent')
    })

    it('setNavMode to a specific value sets navMode', () => {
        const state = themeReducer(getInitial(), setNavMode('dark'))
        expect(state.navMode).toBe('dark')
    })
})
