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
 * Callers pass an app-relative path — `/api/v1/upload/...` from buildUploadFileUrl or a
 * `/pdf/*.pdf` asset. Anything leaving this document needs a base to resolve against, and
 * the manual filenames carry spaces and Thai characters that have to be percent-encoded
 * before a native URL parser will accept them.
 */
const toAbsolute = (url: string): string => new URL(url, window.location.origin).href

interface DownloadOptions {
  /** `false` means the app's WebView rather than a normal browser tab. */
  fromWeb?: boolean | null;
}

/**
 * Hands a PDF off to be saved.
 *
 * Inside the app's WebView only a real url gets out. Opening one lets the shell pass it to
 * the device's browser, which has a download manager; the anchor below never completes
 * there, because it fires no network request and so nothing ever reaches the shell's
 * DownloadListener. A blob has no route out at all — it can only travel inline as a data:
 * uri, and Chrome refuses those as a top-level navigation.
 */
export async function downloadPdf(
  file: Blob | string,
  fileName: string,
  options: DownloadOptions = {},
): Promise<void> {
  const { fromWeb } = options

  if (window.AndroidDownloader?.downloadFile) {
    if (typeof file === 'string') {
      // Native fetches the url itself. The upload routes authenticate off the api key
      // already in the query string and /pdf assets are unguarded, so this header only
      // matters to a future endpoint that wants the session instead.
      const { accessToken } = authStorage.read()
      window.AndroidDownloader.downloadFile(toAbsolute(file), fileName, accessToken ? `Bearer ${accessToken}` : '')
    } else {
      window.AndroidDownloader.downloadFile(await blobToDataUri(file), fileName, '')
    }
    return
  }

  if (fromWeb === false && typeof file === 'string') {
    // Opened with the real url rather than a blank window filled in afterwards: the shell
    // decides whether to hand a new window to the device's browser by looking at the url
    // it was opened with, and it has nothing to go on if that url arrives later.
    window.open(toAbsolute(file), '_blank')
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
  // click, and pulling the url out from under it cancels the download with no error.
  if (isBlob) window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
