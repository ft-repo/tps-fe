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

/**
 * Every caller passes an app-relative path — `/api/v1/upload/...` from buildUploadFileUrl
 * or a `/pdf/*.pdf` asset. Anything leaving this document needs a base to resolve against,
 * and the manual filenames carry spaces and Thai characters that have to be
 * percent-encoded before a native URL parser will accept them.
 */
const toAbsolute = (url: string): string => new URL(url, window.location.origin).href

export interface DownloadStep {
  label: string;
  detail: string;
  /** true = went as intended, false = failed here, undefined = plain observation. */
  ok?: boolean;
  /** Milliseconds since the trace started. */
  ms: number;
}

interface DownloadOptions {
  /** `false` means the app's WebView rather than a normal browser tab. */
  fromWeb?: boolean | null;
}

const createTrace = () => {
  const steps: DownloadStep[] = []
  const started = performance.now()
  const log = (label: string, detail: string, ok?: boolean) => {
    const ms = Math.round(performance.now() - started)
    steps.push({ label, detail, ok, ms })
    console.info(`[downloadPdf +${ms}ms] ${label}:`, detail)
  }
  return { steps, log }
}

/** Renders a trace as plain text, for the copy button in the preview modal. */
export const formatTrace = (steps: DownloadStep[]): string =>
  steps
    .map((s) => `${String(s.ms).padStart(5)}ms ${s.ok === true ? '[ok]  ' : s.ok === false ? '[FAIL]' : '[..]  '} ${s.label}: ${s.detail}`)
    .join('\n')

/**
 * Everything about the page and the document that could explain a failure later, captured
 * before anything is attempted so a trace can be read on its own.
 */
export function describeEnvironment(file: Blob | string | null, fileName: string, fromWeb?: boolean | null): DownloadStep[] {
  const { steps, log } = createTrace()

  log('time', new Date().toISOString())
  log('page url', window.location.href)
  log('origin', window.location.origin)
  log('from_web', `${String(fromWeb)} (${typeof fromWeb})`)
  log('isAndroidWebView', String(isAndroidWebView()))
  log('userAgent', navigator.userAgent)
  log('language', navigator.language)
  log('viewport', `${window.innerWidth}x${window.innerHeight}, dpr ${window.devicePixelRatio}`)

  const bridge = window.AndroidDownloader
  log(
    'AndroidDownloader',
    bridge ? `present — downloadFile is ${typeof bridge.downloadFile}` : 'NOT present on window',
    !!bridge?.downloadFile,
  )
  log('window.open', typeof window.open === 'function' ? 'is a function' : 'MISSING')

  const { accessToken, refreshToken, role } = authStorage.read()
  log('stored session', `role ${role ?? 'none'}, access ${accessToken ? `…${accessToken.slice(-8)}` : 'none'}, refresh ${refreshToken ? 'present' : 'none'}`)

  log('filename', fileName)

  if (file === null) {
    log('input', 'null — nothing to download', false)
    return steps
  }

  if (typeof file === 'string') {
    log('input kind', 'string url')
    log('raw url', file)
    log('raw length', `${file.length} chars`)
    try {
      const absolute = toAbsolute(file)
      log('absolute url', absolute)
      log('encoding changed it', absolute.includes('%') ? 'yes — spaces or non-ascii were percent-encoded' : 'no')
      const parsed = new URL(absolute)
      log('url parts', `origin ${parsed.origin}, path ${decodeURIComponent(parsed.pathname)}`)
      log('same origin', String(parsed.origin === window.location.origin))
      const apiKey = parsed.searchParams.get('api_key')
      log('api_key param', apiKey ? `present — …${apiKey.slice(-6)}` : 'absent')
      log('ends with .pdf', String(parsed.pathname.toLowerCase().endsWith('.pdf')))
    } catch (error) {
      log('url parse', error instanceof Error ? error.message : String(error), false)
    }
    return steps
  }

  log('input kind', file instanceof File ? 'File (picked or generated)' : 'Blob')
  log('blob size', `${file.size} bytes (~${(file.size / 1024 / 1024).toFixed(2)} MB)`)
  log('blob type', file.type || 'none reported')
  if (file instanceof File) log('file name', file.name || 'none')
  log('as data uri', `would be roughly ${Math.round((file.size * 4) / 3 / 1024)} KB of base64`)

  return steps
}

/**
 * Hands a PDF off to be saved, and reports every decision along the way.
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
): Promise<DownloadStep[]> {
  const { fromWeb } = options
  const { steps, log } = createTrace()

  log('start', `fromWeb=${String(fromWeb)}, input=${typeof file === 'string' ? 'url' : `blob ${file.size}B`}`)

  if (window.AndroidDownloader?.downloadFile) {
    log('route', 'native AndroidDownloader — it is present, so it wins')
    try {
      if (typeof file === 'string') {
        const url = toAbsolute(file)
        // The upload routes authenticate off the api key already in the query string and
        // /pdf assets are unguarded, so this header only matters to a future endpoint
        // that wants the session instead.
        const { accessToken } = authStorage.read()
        log('native args', `url=${url}`)
        log('native args', `fileName=${fileName}, authHeader=${accessToken ? 'Bearer …' + accessToken.slice(-8) : 'empty'}`)
        window.AndroidDownloader.downloadFile(url, fileName, accessToken ? `Bearer ${accessToken}` : '')
      } else {
        log('native args', 'converting blob to a data uri first')
        const dataUri = await blobToDataUri(file)
        log('data uri', `${dataUri.length} chars, starts ${dataUri.slice(0, 40)}`)
        window.AndroidDownloader.downloadFile(dataUri, fileName, '')
      }
      log('native call', 'returned without throwing — whether a file lands is up to the app', true)
    } catch (error) {
      log('native call', error instanceof Error ? `${error.name}: ${error.message}` : String(error), false)
    }
    return steps
  }

  log('route', 'AndroidDownloader absent — falling through')

  if (fromWeb === false) {
    if (typeof file === 'string') {
      const url = toAbsolute(file)
      // Opened directly rather than through the reservation below: the shell decides
      // whether to hand a new window to the device's browser by looking at the URL it is
      // opened with, and it has nothing to go on if that URL arrives later.
      log('route', "in-app WebView with a url — window.open(url, '_blank'), opened directly so the shell can see the url")
      log('opening', url)
      const opened = window.open(url, '_blank')
      log('window.open', opened ? 'returned a window handle' : 'returned null — blocked, or the shell handled it itself', !!opened)
      return steps
    }

    // Reserve the window synchronously, while still inside the click's user gesture —
    // reading the blob suspends this function, and an open() in the task that resumes it
    // is no longer attributable to the click, so the WebView blocks it without a word.
    log('route', 'in-app WebView with a blob — reserving a window before the async read')
    const reserved = window.open('', '_blank')
    log('reserve window', reserved ? 'got a handle inside the user gesture' : 'returned null — nothing to point at later', !!reserved)
    // A blob: URL is scoped to this document and can't be resolved by the new window, so
    // the bytes have to travel inline.
    const dataUri = await blobToDataUri(file)
    log('data uri', `${dataUri.length} chars, starts ${dataUri.slice(0, 40)}`)
    if (reserved) {
      reserved.location.href = dataUri
      log('navigate reserved window', 'assigned the data uri', true)
    } else {
      log('navigate reserved window', 'skipped — no window was reserved', false)
    }
    return steps
  }

  const isBlob = typeof file !== 'string'
  const url = isBlob ? URL.createObjectURL(file) : file
  log('route', "normal browser tab — <a download> click")
  log('anchor href', url.slice(0, 120))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Deliberately not revoked inline: the browser reads the blob asynchronously after the
  // click, and pulling the URL out from under it cancels the download with no error.
  if (isBlob) window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  log('anchor click', `dispatched with download="${fileName}"`, true)

  return steps
}
