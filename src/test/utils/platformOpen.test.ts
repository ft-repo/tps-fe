import { describe, it, expect, vi, afterEach } from 'vitest'
import { isAndroidWebView, trySystemBrowserOpen } from '@/utils/platformOpen'

const setUserAgent = (userAgent: string) => {
    Object.defineProperty(navigator, 'userAgent', { value: userAgent, configurable: true })
}

describe('platformOpen', () => {
    const originalUserAgent = navigator.userAgent

    afterEach(() => {
        vi.restoreAllMocks()
        setUserAgent(originalUserAgent)
    })

    describe('isAndroidWebView', () => {
        it('returns true for an Android user agent', () => {
            setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36')
            expect(isAndroidWebView()).toBe(true)
        })

        it('returns false for an iOS user agent', () => {
            setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148')
            expect(isAndroidWebView()).toBe(false)
        })

        it('returns false for a desktop user agent', () => {
            setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36')
            expect(isAndroidWebView()).toBe(false)
        })
    })

    describe('trySystemBrowserOpen', () => {
        it('does not call window.open when not on Android', () => {
            setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')
            const openSpy = vi.spyOn(window, 'open').mockReturnValue(null)

            const result = trySystemBrowserOpen('data:application/pdf;base64,xxx')

            expect(openSpy).not.toHaveBeenCalled()
            expect(result).toBeNull()
        })

        it('opens the url with the _system target on Android and returns the window handle', () => {
            setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7)')
            const fakeWindow = {} as Window
            const openSpy = vi.spyOn(window, 'open').mockReturnValue(fakeWindow)

            const result = trySystemBrowserOpen('data:application/pdf;base64,xxx')

            expect(openSpy).toHaveBeenCalledWith('data:application/pdf;base64,xxx', '_system')
            expect(result).toBe(fakeWindow)
        })

        it('returns null on Android when window.open is blocked', () => {
            setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7)')
            vi.spyOn(window, 'open').mockReturnValue(null)

            expect(trySystemBrowserOpen('data:application/pdf;base64,xxx')).toBeNull()
        })
    })
})
