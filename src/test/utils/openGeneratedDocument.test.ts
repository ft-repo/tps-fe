import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockToBlob = vi.fn()
const mockIsAndroidWebView = vi.fn()
const mockTrySystemBrowserOpen = vi.fn()

vi.mock('@react-pdf/renderer', () => ({
    pdf: vi.fn(() => ({ toBlob: mockToBlob })),
}))

vi.mock('@/utils/platformOpen', () => ({
    isAndroidWebView: mockIsAndroidWebView,
    trySystemBrowserOpen: mockTrySystemBrowserOpen,
}))

const { openGeneratedDocument } = await import('@/utils/openGeneratedDocument')

const smallBlob = { size: 1024 } as Blob
const oversizedBlob = { size: 5 * 1024 * 1024 } as Blob

class FakeFileReader {
    result: string | null = null
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    readAsDataURL() {
        this.result = 'data:application/pdf;base64,FAKE'
        queueMicrotask(() => this.onload?.())
    }
}

describe('openGeneratedDocument', () => {
    let previewTab: { location: { href: string }; close: ReturnType<typeof vi.fn> }
    let openSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        mockToBlob.mockReset().mockResolvedValue(smallBlob)
        mockIsAndroidWebView.mockReset().mockReturnValue(false)
        mockTrySystemBrowserOpen.mockReset().mockReturnValue(null)

        previewTab = { location: { href: '' }, close: vi.fn() }
        openSpy = vi.spyOn(window, 'open').mockReturnValue(previewTab as unknown as Window)

        vi.stubGlobal('FileReader', FakeFileReader)
        vi.stubGlobal('URL', {
            ...URL,
            createObjectURL: vi.fn(() => 'blob:mock-url'),
            revokeObjectURL: vi.fn(),
        })
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    it('reserves a blank tab synchronously before the async PDF render resolves', () => {
        void openGeneratedDocument({} as never, { fromWeb: true })
        expect(openSpy).toHaveBeenCalledWith('', '_blank')
    })

    it('never attempts a _system open and falls back to the reserved tab on regular web (fromWeb: true)', async () => {
        await openGeneratedDocument({} as never, { fromWeb: true })

        expect(mockTrySystemBrowserOpen).not.toHaveBeenCalled()
        expect(previewTab.location.href).toBe('blob:mock-url')
        expect(previewTab.close).not.toHaveBeenCalled()
    })

    it('never attempts a _system open when fromWeb is not explicitly false', async () => {
        await openGeneratedDocument({} as never, {})

        expect(mockIsAndroidWebView).not.toHaveBeenCalled()
        expect(mockTrySystemBrowserOpen).not.toHaveBeenCalled()
        expect(previewTab.location.href).toBe('blob:mock-url')
    })

    it('attempts a _system external open on Android inside the mobile app, and closes the reserved tab on success', async () => {
        mockIsAndroidWebView.mockReturnValue(true)
        const externalWindow = {} as Window
        mockTrySystemBrowserOpen.mockReturnValue(externalWindow)

        await openGeneratedDocument({} as never, { fromWeb: false })

        expect(mockTrySystemBrowserOpen).toHaveBeenCalledWith('data:application/pdf;base64,FAKE')
        expect(previewTab.close).toHaveBeenCalledTimes(1)
        expect(previewTab.location.href).toBe('')
    })

    it('falls back to the reserved tab with a blob URL when the _system attempt fails', async () => {
        mockIsAndroidWebView.mockReturnValue(true)
        mockTrySystemBrowserOpen.mockReturnValue(null)

        await openGeneratedDocument({} as never, { fromWeb: false })

        expect(mockTrySystemBrowserOpen).toHaveBeenCalled()
        expect(previewTab.close).not.toHaveBeenCalled()
        expect(previewTab.location.href).toBe('blob:mock-url')
    })

    it('skips the external attempt and falls back directly when the document exceeds the size limit', async () => {
        mockIsAndroidWebView.mockReturnValue(true)
        mockToBlob.mockResolvedValue(oversizedBlob)

        await openGeneratedDocument({} as never, { fromWeb: false })

        expect(mockTrySystemBrowserOpen).not.toHaveBeenCalled()
        expect(previewTab.location.href).toBe('blob:mock-url')
    })

    it('opens the blob directly, without throwing, when the popup blocker prevented reserving a tab', async () => {
        openSpy.mockReturnValue(null)

        await expect(openGeneratedDocument({} as never, { fromWeb: true })).resolves.not.toThrow()

        expect(openSpy).toHaveBeenCalledWith('blob:mock-url', '_blank')
    })

    it('closes the reserved tab and logs the error, without throwing, when PDF rendering fails', async () => {
        mockToBlob.mockRejectedValue(new Error('render failed'))
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        await expect(openGeneratedDocument({} as never, { fromWeb: true })).resolves.not.toThrow()

        expect(previewTab.close).toHaveBeenCalledTimes(1)
        expect(errorSpy).toHaveBeenCalled()
    })
})
