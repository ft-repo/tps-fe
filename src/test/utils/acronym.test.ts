import { describe, it, expect } from 'vitest'
import acronym from '@/utils/acronym'

describe('acronym', () => {
    it('extracts first letters of each word', () => {
        expect(acronym('John Doe')).toBe('JD')
    })

    it('handles a single word', () => {
        expect(acronym('Admin')).toBe('A')
    })

    it('handles three words', () => {
        expect(acronym('Transportation Permit System')).toBe('TPS')
    })

    it('handles empty string', () => {
        expect(acronym('')).toBe('')
    })

    it('uses default parameter when called with no arguments', () => {
        expect(acronym()).toBe('')
    })

    it('handles Thai-script words (no word boundaries → returns original)', () => {
        const input = 'กรมการขนส่ง'
        expect(acronym(input)).toBe(input)
    })

    it('handles extra whitespace between words', () => {
        expect(acronym('John  Doe')).toBe('JD')
    })
})
