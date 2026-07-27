import { describe, it, expect } from 'vitest'
import growShrinkColor from '@/utils/growShrinkColor'

describe('growShrinkColor', () => {
    describe('bg type', () => {
        it('returns green bg class for positive value', () => {
            expect(growShrinkColor(10, 'bg')).toContain('bg-emerald-100')
        })

        it('returns red bg class for negative value', () => {
            expect(growShrinkColor(-5, 'bg')).toContain('bg-red-100')
        })

        it('returns empty string for zero', () => {
            expect(growShrinkColor(0, 'bg')).toBe('')
        })
    })

    describe('text type', () => {
        it('returns green text class for positive value', () => {
            expect(growShrinkColor(1, 'text')).toContain('text-emerald-600')
        })

        it('returns red text class for negative value', () => {
            expect(growShrinkColor(-1, 'text')).toContain('text-red-600')
        })

        it('returns empty string for zero', () => {
            expect(growShrinkColor(0, 'text')).toBe('')
        })
    })
})
