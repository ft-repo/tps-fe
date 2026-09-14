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

/**
 * Hands a PDF off for download, routing around Android WebView's well-known inability
 * to complete a JS-triggered `<a download>` click on a blob: URL (no network request
 * ever happens, so the app's own DownloadListener never fires) — the native shell
 * exposes `AndroidDownloader` for exactly this. Outside that shell, the plain anchor
 * download attribute works fine, including on the blob: URL for a client-generated file.
 */
export async function downloadPdf(file: Blob | string, fileName: string): Promise<void> {
  if (window.AndroidDownloader?.downloadFile) {
    if (typeof file === 'string') {
      // Remote URL: native fetches it itself, so it needs the auth header.
      const { accessToken } = authStorage.read()
      const authHeader = accessToken ? `Bearer ${accessToken}` : ''
      window.AndroidDownloader.downloadFile(file, fileName, authHeader)
    } else {
      // Already-fetched bytes: hand them over inline, nothing for native to fetch.
      const dataUri = await blobToDataUri(file)
      window.AndroidDownloader.downloadFile(dataUri, fileName, '')
    }
    return
  }

  const isBlob = typeof file !== 'string'
  const url = isBlob ? URL.createObjectURL(file) : file
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  if (isBlob) URL.revokeObjectURL(url)
}
