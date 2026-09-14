// downloadBridge.ts
import { createLocalStorageAuthStorage } from '@/lib/auth/authStorage'
import { blobToDataUri } from '@/utils/openGeneratedDocument'

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
 * Tries the OS share sheet via the Web Share API — a standard Chromium capability the
 * WebView already ships with, unlike AndroidDownloader below it needs no cooperation
 * from the app embedding this page. Returns true when the share sheet was shown
 * (including the user cancelling it, which is a normal outcome, not a failure to fall
 * back from) and false when the API genuinely isn't usable here.
 */
async function tryShare(blob: Blob, fileName: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) return false
  const shareFile = new File([blob], fileName, { type: blob.type || 'application/pdf' })
  if (navigator.canShare && !navigator.canShare({ files: [shareFile] })) return false
  try {
    await navigator.share({ files: [shareFile] })
    return true
  } catch (error) {
    return error instanceof DOMException && error.name === 'AbortError'
  }
}

/**
 * Hands a PDF off for download. Tries the Web Share sheet first (works inside any
 * modern WebView with zero cooperation from whatever app embeds this page), then the
 * `AndroidDownloader` native bridge if the host happens to provide one, then falls back
 * to a plain anchor download for normal browsers — routing around Android WebView's
 * well-known inability to complete a JS-triggered `<a download>` click on a blob: URL
 * (no network request ever happens, so nothing on the native side ever sees it).
 */
export async function downloadPdf(file: Blob | string, fileName: string): Promise<void> {
  const blob = typeof file === 'string' ? await fetchAsBlob(file) : file
  if (blob && (await tryShare(blob, fileName))) return

  if (window.AndroidDownloader?.downloadFile) {
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
