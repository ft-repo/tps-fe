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
 * Every caller passes an app-relative path — `/api/v1/upload/...` from buildUploadFileUrl
 * or a `/pdf/*.pdf` asset. Anything leaving this document needs a base to resolve against,
 * and the manual filenames carry spaces and Thai characters that have to be
 * percent-encoded before a native URL parser will accept them.
 */
const toAbsolute = (url: string): string => new URL(url, window.location.origin).href

interface DownloadOptions {
  /** `false` means the app's WebView rather than a normal browser tab. */
  fromWeb?: boolean | null;
}

/**
 * Hands a PDF off to be saved.
 *
 * Inside the app's WebView a `<a download>` click never completes — it fires no network
 * request, so the shell's DownloadListener never sees it and the click silently does
 * nothing. Opening the document in a new window is what actually works there, verified on
 * device; `_system` (the Cordova hand-off-to-the-device-browser convention) was tried
 * first and did not.
 */
export async function downloadPdf(
  file: Blob | string,
  fileName: string,
  options: DownloadOptions = {},
): Promise<void> {
  const { fromWeb } = options

  if (window.AndroidDownloader?.downloadFile) {
    if (typeof file === 'string') {
      // Native fetches the URL itself. The upload routes authenticate off the api key
      // already in the query string and /pdf assets are unguarded, so this header only
      // matters to a future endpoint that wants the session instead.
      const { accessToken } = authStorage.read()
      window.AndroidDownloader.downloadFile(toAbsolute(file), fileName, accessToken ? `Bearer ${accessToken}` : '')
    } else {
      const dataUri = await blobToDataUri(file)
      window.AndroidDownloader.downloadFile(dataUri, fileName, '')
    }
    return
  }

  if (fromWeb === false) {
    if (typeof file === 'string') {
      // Opened directly rather than through the reservation below: the shell decides
      // whether to hand a new window to the device's browser by looking at the URL it is
      // opened with, and it has nothing to go on if that URL arrives later.
      window.open(toAbsolute(file), '_blank')
      return
    }
    // Reserve the window synchronously, while still inside the click's user gesture —
    // reading the blob suspends this function, and an open() in the task that resumes it
    // is no longer attributable to the click, so the WebView blocks it without a word.
    const reserved = window.open('', '_blank')
    // A blob: URL is scoped to this document and can't be resolved by the new window, so
    // the bytes have to travel inline.
    const dataUri = await blobToDataUri(file)
    if (reserved) reserved.location.href = dataUri
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
  // Deliberately not revoked inline: the browser reads the blob asynchronously after the
  // click, and pulling the URL out from under it cancels the download with no error.
  if (isBlob) window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
