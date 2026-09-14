import { pdf } from '@react-pdf/renderer'
import { isAndroidWebView, trySystemBrowserOpen } from './platformOpen'

type PdfDocument = Parameters<typeof pdf>[0]

// Practical upper bound for handing a document off as a data: URI — large payloads
// risk hitting URL-length limits in the native shell's external-open handoff.
export const MAX_EXTERNAL_OPEN_BYTES = 2 * 1024 * 1024

export const blobToDataUri = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

interface OpenGeneratedDocumentOptions {
  fromWeb?: boolean | null
}

/**
 * Renders a @react-pdf/renderer document to a blob and opens it for preview.
 *
 * Always reserves a blank tab synchronously first and, absent anything better, points
 * it at a blob: URL — this is the behavior that's proven to reliably open a tab today,
 * so it must never regress. On Android inside the mobile app's WebView
 * (fromWeb === false), it additionally attempts — best-effort, unconfirmed for the
 * wrapping app — to hand the document off to the external browser via the `_system`
 * convention, which only works here because the document is small enough to inline as
 * a data: URI (a blob: URL can't cross into a separate browser process). When that
 * succeeds, the reserved blank tab is closed since it's no longer needed.
 */
export async function openGeneratedDocument(document: PdfDocument, options: OpenGeneratedDocumentOptions = {}): Promise<void> {
  const attemptExternal = options.fromWeb === false && isAndroidWebView()

  // Reserve a tab synchronously, still inside the click's user gesture, so the popup
  // blocker doesn't block opening it once the async PDF rendering below finishes.
  const previewTab = window.open('', '_blank')

  try {
    const blob = await pdf(document).toBlob()

    if (attemptExternal) {
      if (blob.size <= MAX_EXTERNAL_OPEN_BYTES) {
        const dataUri = await blobToDataUri(blob)
        const externalWindow = trySystemBrowserOpen(dataUri)
        console.info('[openGeneratedDocument] external-open attempted', { opened: !!externalWindow })
        if (externalWindow) {
          previewTab?.close()
          return
        }
      } else {
        console.info('[openGeneratedDocument] external-open skipped: document exceeds size limit', { size: blob.size })
      }
    }

    const url = URL.createObjectURL(blob)
    if (previewTab) {
      previewTab.location.href = url
    } else {
      window.open(url, '_blank')
    }
  } catch (error) {
    previewTab?.close()
    console.error(error)
  }
}
