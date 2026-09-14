// downloadBridge.ts
import { createLocalStorageAuthStorage } from '@/lib/auth/authStorage'
import { blobToDataUri, MAX_EXTERNAL_OPEN_BYTES } from '@/utils/openGeneratedDocument'
import { isAndroidWebView, trySystemBrowserOpen } from '@/utils/platformOpen'

declare global {
  interface Window {
    AndroidDownloader?: {
      downloadFile: (url: string, fileName: string, authHeader: string) => void
    }
  }
}

// Own instance rather than the app's singleton in sessionManagerInstance.ts: that
// module is part of the store <-> RtkQueryService <-> BaseService import cycle and
// doesn't export its AuthStorage. This only ever calls the side-effect-free `read()`,
// so a second reader over the same `tps.auth.v1` key is safe.
const authStorage = createLocalStorageAuthStorage()

function authHeaderValue(): string {
  const { accessToken } = authStorage.read()
  return accessToken ? `Bearer ${accessToken}` : ''
}

/**
 * Fetches a remote file into memory so it can be handed to the share sheet or the
 * Android bridge as bytes instead of a URL. Best-effort: any failure (CORS, network,
 * auth) just means the caller falls back to a plain navigation-based download instead.
 */
async function fetchAsBlob(url: string): Promise<Blob | null> {
  try {
    const authHeader = authHeaderValue()
    const response = await fetch(url, authHeader ? { headers: { Authorization: authHeader } } : undefined)
    if (!response.ok) return null
    return await response.blob()
  } catch {
    return null
  }
}

/**
 * Tries the OS share sheet via the Web Share API. Genuinely useful in a real mobile
 * browser (Chrome/Safari) with zero cooperation needed from anyone — but confirmed
 * absent from Android's embedded `android.webkit.WebView` entirely (`navigator.share`
 * is simply not implemented there, a long-standing Chromium gap, not something the app
 * embedding this page can configure around:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=765923). Kept as a best-effort
 * first attempt for contexts where it does work; downloadPdf skips even calling this
 * when `navigator.share` isn't present. Returns true when the share sheet was shown
 * (including the user cancelling it, which is a normal outcome, not a failure to fall
 * back from) and false when the API genuinely isn't usable here.
 */
async function tryShare(blob: Blob, fileName: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    console.info('[downloadBridge] tryShare skipped: navigator.share not available')
    return false
  }
  const shareFile = new File([blob], fileName, { type: blob.type || 'application/pdf' })
  if (navigator.canShare && !navigator.canShare({ files: [shareFile] })) {
    console.info('[downloadBridge] tryShare skipped: canShare({ files }) returned false', {
      type: shareFile.type,
      size: shareFile.size,
    })
    return false
  }
  try {
    await navigator.share({ files: [shareFile] })
    console.info('[downloadBridge] tryShare succeeded')
    return true
  } catch (error) {
    const isAbort = error instanceof DOMException && error.name === 'AbortError'
    console.info('[downloadBridge] tryShare failed', {
      name: error instanceof DOMException ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      treatedAsHandled: isAbort,
    })
    return isAbort
  }
}

/**
 * Hands the file off to the device's external browser via the `_system` window.open
 * convention (see platformOpen.ts) — the same escape hatch openGeneratedDocument.ts
 * uses for previews. Once there, the actual download runs through Chrome's own
 * download manager, entirely independent of whatever the embedding WebView restricts.
 * Best-effort and unconfirmed: whether the embedding app actually honors `_system`
 * isn't something this code can verify — a returned Window just means `window.open`
 * didn't get blocked, not that a download necessarily followed on the other end.
 *
 * A Blob has to be inlined as a data: URI to cross into the external browser process
 * (a blob: URL can't), so it's skipped past MAX_EXTERNAL_OPEN_BYTES — a real URL (either
 * `file` itself, or `sourceUrl` when the caller already fetched a Blob from a known
 * endpoint) has no such limit and is handed over as-is. Note this only actually works
 * for a URL the external browser can load unauthenticated — a plain navigation can't
 * carry the app's Authorization header, so a protected endpoint just 401s over there.
 */
async function trySystemDownload(file: Blob | string, blob: Blob | null, sourceUrl?: string): Promise<boolean> {
  if (!isAndroidWebView()) return false

  let target: string | null = sourceUrl ?? (typeof file === 'string' ? file : null)
  if (target === null && blob) {
    if (blob.size > MAX_EXTERNAL_OPEN_BYTES) {
      console.info('[downloadBridge] trySystemDownload skipped: file exceeds size limit', { size: blob.size })
      return false
    }
    target = await blobToDataUri(blob)
  }
  if (!target) return false

  const opened = trySystemBrowserOpen(target)
  console.info('[downloadBridge] trySystemDownload attempted', { opened: !!opened })
  return !!opened
}

/**
 * Hands a PDF off for download. Tries the Web Share sheet first where it's actually
 * available (real mobile browsers — NOT Android's embedded WebView, see tryShare),
 * then the `AndroidDownloader` native bridge if the host happens to provide one, then
 * an external-browser handoff, then falls back to a plain anchor download for normal
 * browsers — routing around Android WebView's well-known inability to complete a
 * JS-triggered `<a download>` click on a blob: URL (no network request ever happens, so
 * nothing on the native side ever sees it).
 *
 * `sourceUrl` is an optional hint for when `file` is a Blob the caller already fetched
 * from a known, publicly-reachable endpoint — letting the external-browser handoff use
 * that real URL instead of inlining the Blob as a size-capped data: URI. Leave it unset
 * for anything fetched from an authenticated endpoint (see trySystemDownload).
 */
export async function downloadPdf(file: Blob | string, fileName: string, sourceUrl?: string): Promise<void> {
  // Only worth fetching a remote file into memory for tryShare's sake when sharing is
  // actually possible here — confirmed absent in Android's embedded WebView (no
  // navigator.share at all: https://bugs.chromium.org/p/chromium/issues/detail?id=765923),
  // so skip the wasted network round-trip (and its CORS risk) there.
  const canTryShare = typeof navigator !== 'undefined' && !!navigator.share
  let blob: Blob | null = typeof file === 'string' ? null : file
  if (canTryShare && typeof file === 'string') {
    blob = await fetchAsBlob(file)
  }
  if (canTryShare && blob && (await tryShare(blob, fileName))) return

  if (window.AndroidDownloader?.downloadFile) {
    console.info('[downloadBridge] falling back to AndroidDownloader')
    if (blob) {
      const dataUri = await blobToDataUri(blob)
      window.AndroidDownloader.downloadFile(dataUri, fileName, '')
    } else {
      // blob is only null when `file` was a string we couldn't fetch ourselves (e.g.
      // CORS) — hand the bare URL + auth header to native and let it fetch instead.
      window.AndroidDownloader.downloadFile(file as string, fileName, authHeaderValue())
    }
    return
  }

  if (await trySystemDownload(file, blob, sourceUrl)) return

  console.info('[downloadBridge] falling back to plain anchor download')
  // Same invariant as above: blob is only null for an unfetchable string URL.
  const url = blob ? URL.createObjectURL(blob) : (file as string)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  if (blob) URL.revokeObjectURL(url)
}
