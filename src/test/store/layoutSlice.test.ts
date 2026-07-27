import { describe, it, expect } from 'vitest'
import layoutReducer, {
    setLoading,
    setFullscreenLoading,
    setOpenModal,
    LayoutState,
} from '@/store/slices/layout/layoutSlice'

const initialState: LayoutState = {
    loading: false,
    fullscreen_loading: false,
    open_modal: false,
}

describe('layoutSlice', () => {
    it('has correct initial state', () => {
        expect(layoutReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
    })

    it('setLoading sets loading to true', () => {
        const state = layoutReducer(initialState, setLoading(true))
        expect(state.loading).toBe(true)
    })

    it('setLoading sets loading to false', () => {
        const state = layoutReducer({ ...initialState, loading: true }, setLoading(false))
        expect(state.loading).toBe(false)
    })

    it('setFullscreenLoading sets fullscreen_loading', () => {
        const state = layoutReducer(initialState, setFullscreenLoading(true))
        expect(state.fullscreen_loading).toBe(true)
    })

    it('setOpenModal opens modal', () => {
        const state = layoutReducer(initialState, setOpenModal(true))
        expect(state.open_modal).toBe(true)
    })

    it('setOpenModal closes modal', () => {
        const state = layoutReducer({ ...initialState, open_modal: true }, setOpenModal(false))
        expect(state.open_modal).toBe(false)
    })

    it('loading and modal are independent', () => {
        let state = layoutReducer(initialState, setLoading(true))
        state = layoutReducer(state, setOpenModal(true))
        expect(state.loading).toBe(true)
        expect(state.open_modal).toBe(true)
        expect(state.fullscreen_loading).toBe(false)
    })
})
