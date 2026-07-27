import { describe, it, expect } from 'vitest'
import wildCardSearch from '@/utils/wildCardSearch'

const data = [
    { id: 1, name: 'Toyota Camry', type: 'sedan' },
    { id: 2, name: 'Honda CRV', type: 'suv' },
    { id: 3, name: 'Toyota Fortuner', type: 'suv' },
    { id: 4, name: 'Isuzu D-Max', type: 'pickup' },
]

describe('wildCardSearch', () => {
    it('finds matches by any field (case-insensitive)', () => {
        const result = wildCardSearch(data, 'toyota')
        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('Toyota Camry')
    })

    it('returns all items when query matches all', () => {
        expect(wildCardSearch(data, '')).toHaveLength(4)
    })

    it('returns empty array when nothing matches', () => {
        expect(wildCardSearch(data, 'Nissan')).toHaveLength(0)
    })

    it('searches only specified key when specifyKey is given', () => {
        const result = wildCardSearch(data, 'suv', 'type')
        expect(result).toHaveLength(2)
    })

    it('is case-insensitive', () => {
        expect(wildCardSearch(data, 'CAMRY')).toHaveLength(1)
        expect(wildCardSearch(data, 'camry')).toHaveLength(1)
    })

    it('does partial substring match', () => {
        const result = wildCardSearch(data, 'Fort')
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Toyota Fortuner')
    })
})
