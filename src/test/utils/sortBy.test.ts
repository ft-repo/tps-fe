import { describe, it, expect } from 'vitest'
import sortBy from '@/utils/sortBy'

const vehicles = [
    { name: 'Toyota', weight: 3000 },
    { name: 'Honda', weight: 1500 },
    { name: 'Isuzu', weight: 5000 },
    { name: 'BMW', weight: 2000 },
]

describe('sortBy', () => {
    it('sorts strings in ascending order', () => {
        const sorted = [...vehicles].sort(sortBy('name', false))
        expect(sorted.map((v) => v.name)).toEqual(['BMW', 'Honda', 'Isuzu', 'Toyota'])
    })

    it('sorts strings in descending order', () => {
        const sorted = [...vehicles].sort(sortBy('name', true))
        expect(sorted.map((v) => v.name)).toEqual(['Toyota', 'Isuzu', 'Honda', 'BMW'])
    })

    it('sorts numbers in ascending order', () => {
        const sorted = [...vehicles].sort(sortBy('weight', false))
        expect(sorted.map((v) => v.weight)).toEqual([1500, 2000, 3000, 5000])
    })

    it('sorts numbers in descending order', () => {
        const sorted = [...vehicles].sort(sortBy('weight', true))
        expect(sorted.map((v) => v.weight)).toEqual([5000, 3000, 2000, 1500])
    })

    it('applies primer function before comparison', () => {
        const sorted = [...vehicles].sort(sortBy('name', false, (v) => String(v).toLowerCase()))
        expect(sorted[0].name).toBe('BMW')
    })

    it('handles identical values without changing order', () => {
        const data = [
            { name: 'A', weight: 100 },
            { name: 'B', weight: 100 },
        ]
        const sorted = [...data].sort(sortBy('weight', false))
        expect(sorted[0].name).toBe('A')
    })
})
