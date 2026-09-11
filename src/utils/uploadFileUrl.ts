import appConfig from '@/configs/app.config'

/**
 * Turns a stored `document_url` into a URL the browser can open on its own.
 *
 * The upload routes are guarded by an api key rather than the session JWT, which is why
 * these files used to be fetched as a blob just to attach the `x-api-key` header. The
 * backend also accepts the key as a query parameter, so the URL can instead be handed
 * straight to a PDF viewer, a link, or the WebView — none of which can set headers.
 *
 * Built against the app's own `apiPrefix` rather than the absolute host recorded in
 * `document_url`, so the request stays same-origin and keeps going through the proxy.
 */
export function buildUploadFileUrl(documentUrl: string): string {
  const path = documentUrl.split('/upload')[1]
  const apiKey = import.meta.env.VITE_API_KEY

  const url = `${appConfig.apiPrefix}upload${path}`
  return apiKey ? `${url}?api_key=${encodeURIComponent(apiKey)}` : url
}
