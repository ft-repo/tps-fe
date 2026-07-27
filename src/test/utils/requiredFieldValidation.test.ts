import { describe, it, expect } from 'vitest'
import requiredFieldValidation from '@/utils/requiredFieldValidation'

describe('requiredFieldValidation', () => {
    it('returns empty string when value is provided', () => {
        expect(requiredFieldValidation('hello', 'Required')).toBe('')
    })

    it('returns the error message when value is empty string', () => {
        expect(requiredFieldValidation('', 'This field is required')).toBe('This field is required')
    })

    it('returns the error message when value is null', () => {
        expect(requiredFieldValidation(null, 'Cannot be null')).toBe('Cannot be null')
    })

    it('returns the error message when value is undefined', () => {
        expect(requiredFieldValidation(undefined, 'Required field')).toBe('Required field')
    })

    it('returns default "Required" when message is empty and value is falsy', () => {
        expect(requiredFieldValidation(null, '')).toBe('Required')
    })

    it('returns empty string for numeric 0 (falsy) — validates truthiness', () => {
        expect(requiredFieldValidation(0, 'Zero is falsy')).toBe('Zero is falsy')
    })

    it('returns empty string for truthy numeric value', () => {
        expect(requiredFieldValidation(42, 'Required')).toBe('')
    })
})
