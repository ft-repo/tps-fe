import { describe, it, expect } from 'vitest'
import paginate from '@/utils/paginate'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

describe('paginate', () => {
    it('returns the first page correctly', () => {
        expect(paginate(items, 3, 1)).toEqual([1, 2, 3])
    })

    it('returns the second page correctly', () => {
        expect(paginate(items, 3, 2)).toEqual([4, 5, 6])
    })

    it('returns partial last page when items do not divide evenly', () => {
        expect(paginate(items, 3, 4)).toEqual([10])
    })

    it('returns empty array for page beyond total pages', () => {
        expect(paginate(items, 3, 10)).toEqual([])
    })

    it('returns all items when pageSize >= array length', () => {
        expect(paginate(items, 100, 1)).toEqual(items)
    })

    it('handles empty array', () => {
        expect(paginate([], 5, 1)).toEqual([])
    })

    it('handles pageSize of 1', () => {
        expect(paginate(items, 1, 5)).toEqual([5])
    })
})
