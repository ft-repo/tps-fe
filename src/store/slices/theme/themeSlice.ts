import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@/configs/theme.config'
import {
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_STACKED_SIDE,
    NAV_MODE_TRANSPARENT,
    NAV_MODE_LIGHT,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    MODE_DARK,
    MODE_LIGHT,
    LAYOUT_TYPE_DECKED,
} from '@/constants/theme.constant'
import type {
    LayoutType,
    Mode,
    NavMode,
    ColorLevel,
    Direction,
} from '@/@types/theme'

const initialNavMode = () => {
    if (
        themeConfig.layout.type === LAYOUT_TYPE_MODERN &&
        themeConfig.navMode !== NAV_MODE_THEMED
    ) {
        return NAV_MODE_TRANSPARENT
    }

    return themeConfig.navMode
}

export type ThemeState = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    previousNavMode?: NavMode
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
}

const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: initialNavMode(),
    layout: themeConfig.layout,
}

const availableNavColorLayouts = [
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
]

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDirection: (state, action: PayloadAction<Direction>) => {
            state.direction = action.payload
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            const availableColorNav = availableNavColorLayouts.includes(
                state.layout.type,
            )

            if (
                availableColorNav &&
                action.payload === MODE_DARK &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_DARK
            }
            if (
                availableColorNav &&
                action.payload === MODE_LIGHT &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_LIGHT
            }
            state.mode = action.payload
        },
        setLayout: (state, action: PayloadAction<LayoutType>) => {
            state.cardBordered = action.payload === LAYOUT_TYPE_MODERN
            if (action.payload === LAYOUT_TYPE_MODERN) {
                state.navMode = NAV_MODE_TRANSPARENT
            }

            const availableColorNav = availableNavColorLayouts.includes(
                action.payload,
            )

            if (availableColorNav && state.mode === MODE_LIGHT) {
                state.navMode = NAV_MODE_LIGHT
            }

            if (availableColorNav && state.mode === MODE_DARK) {
                state.navMode = NAV_MODE_DARK
            }

            state.layout = {
                ...state.layout,
                ...{ type: action.payload },
            }
        },
        setPreviousLayout: (
            state,
            action: PayloadAction<{ type: LayoutType; navMode: NavMode } | ''>,
        ) => {
            if (action.payload === '') {
                state.layout.previousType = undefined
                state.previousNavMode = undefined
            } else {
                state.layout.previousType = action.payload.type
                state.previousNavMode = action.payload.navMode
            }
        },
        /**
         * Restores a layout snapshot captured by setPreviousLayout, bypassing
         * setLayout's forced navMode side effects (e.g. modern -> transparent)
         * which are meant for genuine user-driven layout switches, not for
         * returning from a transient 'blank' layout detour (see AppRoute).
         */
        restoreLayout: (
            state,
            action: PayloadAction<{ type: LayoutType; navMode: NavMode }>,
        ) => {
            state.cardBordered = action.payload.type === LAYOUT_TYPE_MODERN
            state.layout = { ...state.layout, type: action.payload.type }
            state.navMode = action.payload.navMode
        },
        setSideNavCollapse: (state, action) => {
            state.layout = {
                ...state.layout,
                ...{ sideNavCollapse: action.payload },
            }
        },
        setNavMode: (state, action: PayloadAction<NavMode | 'default'>) => {
            if (action.payload !== 'default') {
                state.navMode = action.payload
            } else {
                if (state.layout.type === LAYOUT_TYPE_MODERN) {
                    state.navMode = NAV_MODE_TRANSPARENT
                }

                const availableColorNav = availableNavColorLayouts.includes(
                    state.layout.type,
                )

                if (availableColorNav && state.mode === MODE_LIGHT) {
                    state.navMode = NAV_MODE_LIGHT
                }

                if (availableColorNav && state.mode === MODE_DARK) {
                    state.navMode = NAV_MODE_DARK
                }
            }
        },
        setPanelExpand: (state, action: PayloadAction<boolean>) => {
            state.panelExpand = action.payload
        },
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.themeColor = action.payload
        },
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
    },
})

export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setNavMode,
    setPanelExpand,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
    restoreLayout,
} = themeSlice.actions

export default themeSlice.reducer
