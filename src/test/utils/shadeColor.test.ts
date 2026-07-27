import { describe, it, expect } from 'vitest'
import shadeColor from '@/utils/shadeColor'

describe('shadeColor', () => {
    it('lightens a color by positive percent', () => {
        const result = shadeColor('#336699', 50)
        expect(result).not.toBe('#336699')
        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('darkens a color by negative percent', () => {
        const result = shadeColor('#ffffff', -50)
        expect(result).not.toBe('#ffffff')
        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('returns #ffffff when lightened at max', () => {
        const result = shadeColor('#ffffff', 100)
        expect(result).toBe('#ffffff')
    })

    it('clamps channel values at 255', () => {
        const result = shadeColor('#ff0000', 200)
        expect(result).toBe('#ff0000')
    })

    it('returns a valid hex string format', () => {
        const result = shadeColor('#336699', 20)
        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('0% change returns the same color', () => {
        expect(shadeColor('#336699', 0)).toBe('#336699')
    })
})
