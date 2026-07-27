import { describe, it, expect } from 'vitest'
import isLastChild from '@/utils/isLastChild'

describe('isLastChild', () => {
    it('returns true for last index of array', () => {
        expect(isLastChild([1, 2, 3], 2)).toBe(true)
    })

    it('returns false for non-last index', () => {
        expect(isLastChild([1, 2, 3], 0)).toBe(false)
        expect(isLastChild([1, 2, 3], 1)).toBe(false)
    })

    it('returns true for single-element array at index 0', () => {
        expect(isLastChild([42], 0)).toBe(true)
    })

    it('returns false for empty array (no valid last child)', () => {
        expect(isLastChild([], 0)).toBe(false)
    })
})
