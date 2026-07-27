import { describe, it, expect } from 'vitest'
import deepParseJson from '@/utils/deepParseJson'

describe('deepParseJson', () => {
    it('parses a JSON string into an object', () => {
        const input = '{"key":"value"}'
        expect(deepParseJson(input)).toEqual({ key: 'value' })
    })

    it('recursively parses nested JSON strings', () => {
        const nested = JSON.stringify({ inner: JSON.stringify({ deep: true }) })
        const result = deepParseJson(nested) as { inner: { deep: boolean } }
        expect(result.inner.deep).toBe(true)
    })

    it('returns numeric strings as-is (not converted to numbers)', () => {
        expect(deepParseJson('42')).toBe('42')
    })

    it('returns plain string when not valid JSON', () => {
        expect(deepParseJson('hello world')).toBe('hello world')
    })

    it('handles null input', () => {
        expect(deepParseJson(null)).toBeNull()
    })

    it('handles boolean input', () => {
        expect(deepParseJson(true)).toBe(true)
        expect(deepParseJson(false)).toBe(false)
    })

    it('handles arrays', () => {
        const input = ['{"a":1}', '{"b":2}']
        const result = deepParseJson(input) as Array<{ a?: number; b?: number }>
        expect(result[0]).toEqual({ a: 1 })
        expect(result[1]).toEqual({ b: 2 })
    })

    it('handles plain object passthrough', () => {
        const obj = { key: 'value', num: 99 }
        const result = deepParseJson(obj)
        expect(result).toMatchObject({ key: 'value' })
    })
})
