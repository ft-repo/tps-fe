// downloadBridge.ts
import { createLocalStorageAuthStorage } from '@/lib/auth/authStorage'
import { blobToDataUri } from '@/utils/openGeneratedDocument'
import { isAndroidWebView } from '@/utils/platformOpen'

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

// Every caller hands over an app-relative path — either `/api/v1/upload/...` built by
// buildUploadFileUrl or a `/pdf/*.pdf` asset. Anything leaving this document (the native
// downloader, the device's browser) has no base to resolve that against.
const toAbsolute = (url: string): string => new URL(url, window.location.origin).href

export interface DownloadStep {
  label: string;
  detail: string;
  /** true = went as intended, false = failed here, undefined = plain observation. */
  ok?: boolean;
}

/** Each of these is one way out of the page; they're tried in this order by `downloadPdf`. */
export type DownloadMethod = 'bridge' | 'systemBrowser' | 'newTab' | 'navigate' | 'anchor'

export const DOWNLOAD_METHODS: { id: DownloadMethod; label: string; note: string }[] = [
  { id: 'bridge', label: 'AndroidDownloader', note: 'native JS interface — needs the shell to expose it' },
  { id: 'systemBrowser', label: "window.open(_system)", note: 'Cordova convention: hand off to the device browser' },
  { id: 'newTab', label: "window.open(_blank)", note: 'plain new tab — many WebViews refuse' },
  { id: 'navigate', label: 'location.href', note: 'navigate this WebView at the file' },
  { id: 'anchor', label: '<a download>', note: 'ignored inside a WebView with no DownloadListener' },
]

const makeLogger = (steps: DownloadStep[]) => (label: string, detail: string, ok?: boolean) => {
  steps.push({ label, detail, ok })
  console.info('[downloadPdf]', label, detail)
}

/** Context every method reports before it does anything, so a trace stands on its own. */
export function describeEnvironment(file: Blob | string, fileName: string, fromWeb?: boolean | null): DownloadStep[] {
  const steps: DownloadStep[] = []
  const log = makeLogger(steps)
  log('input', typeof file === 'string' ? `url — ${file}` : `blob — ${file.size} bytes, ${file.type || 'no type'}`)
  log('filename', fileName)
  log('from_web', String(fromWeb))
  log('isAndroidWebView', String(isAndroidWebView()))
  log('AndroidDownloader', window.AndroidDownloader ? `present, downloadFile is ${typeof window.AndroidDownloader.downloadFile}` : 'NOT present')
  log('userAgent', navigator.userAgent)
  return steps
}

/**
 * Runs exactly one escape route and reports what happened, so each can be tried on its
 * own against a device instead of guessing which link in a fallback chain went quiet.
 *
 * `ok: true` only ever means the call returned without throwing — whether a file actually
 * lands is up to the shell, and no method reports that back to the page.
 */
export async function runDownloadMethod(
  method: DownloadMethod,
  file: Blob | string,
  fileName: string,
): Promise<DownloadStep[]> {
  const steps: DownloadStep[] = []
  const log = makeLogger(steps)
  const isUrl = typeof file === 'string'

  try {
    switch (method) {
      case 'bridge': {
        const bridge = window.AndroidDownloader
        if (!bridge?.downloadFile) {
          log('bridge', 'window.AndroidDownloader.downloadFile is not defined — the shell exposes no such interface', false)
          return steps
        }
        if (typeof file === 'string') {
          const url = toAbsolute(file)
          // The upload routes authenticate off the api key already in the query string and
          // /pdf assets are unguarded, so this header only matters to a future endpoint
          // that wants the session instead.
          const { accessToken } = authStorage.read()
          log('bridge', `downloadFile(${url}, ${fileName}, ${accessToken ? 'Bearer …' + accessToken.slice(-8) : 'no auth header'})`)
          bridge.downloadFile(url, fileName, accessToken ? `Bearer ${accessToken}` : '')
        } else {
          const dataUri = await blobToDataUri(file)
          log('bridge', `downloadFile(data uri of ${dataUri.length} chars, ${fileName}, no auth header)`)
          bridge.downloadFile(dataUri, fileName, '')
        }
        log('bridge', 'returned without throwing', true)
        return steps
      }

      case 'systemBrowser':
      case 'newTab': {
        const target = method === 'systemBrowser' ? '_system' : '_blank'
        // A blob: URL is scoped to this document and cannot cross into another browser
        // process, so anything leaving the page has to carry the bytes inline.
        const href = isUrl ? toAbsolute(file) : await blobToDataUri(file)
        log(target, `window.open(${href.slice(0, 90)}…, '${target}')`)
        const opened = window.open(href, target)
        log(target, opened ? 'returned a window handle' : 'returned null — blocked or unsupported', !!opened)
        return steps
      }

      case 'navigate': {
        const href = isUrl ? toAbsolute(file) : URL.createObjectURL(file)
        log('navigate', `location.href = ${href.slice(0, 90)}`)
        window.location.href = href
        log('navigate', 'assignment made — a WebView that cannot render a PDF hands this to its DownloadListener, if one is registered', true)
        return steps
      }

      case 'anchor': {
        const href = isUrl ? file : URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = href
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
        // Deliberately not revoked inline: the browser reads the blob asynchronously after
        // the click, and pulling the URL out from under it cancels the download silently.
        if (!isUrl) window.setTimeout(() => URL.revokeObjectURL(href), 60_000)
        log('anchor', `clicked <a download="${fileName}" href="${href.slice(0, 80)}">`, true)
        return steps
      }
    }
  } catch (error) {
    log(method, error instanceof Error ? error.message : String(error), false)
  }
  return steps
}

interface DownloadOptions {
  /** `false` means the app's WebView rather than a normal browser tab. */
  fromWeb?: boolean | null;
}

/**
 * Tries each route in turn until one reports success, and returns the whole trace.
 *
 * Inside the app's WebView a plain `<a download>` click never completes — no network
 * request happens, so the shell's own DownloadListener never fires — which is why the
 * native interface is tried first and the device's browser second.
 */
export async function downloadPdf(
  file: Blob | string,
  fileName: string,
  options: DownloadOptions = {},
): Promise<DownloadStep[]> {
  const { fromWeb } = options
  const steps = describeEnvironment(file, fileName, fromWeb)

  // In a real browser tab the anchor works and every other route is a worse experience.
  const order: DownloadMethod[] = fromWeb === false
    ? ['bridge', 'systemBrowser', 'anchor']
    : ['anchor']

  for (const method of order) {
    const attempt = await runDownloadMethod(method, file, fileName)
    steps.push(...attempt)
    if (attempt.some((step) => step.ok)) break
  }

  return steps
}
