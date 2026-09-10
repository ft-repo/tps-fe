export const isAndroidWebView = (): boolean => /Android/i.test(navigator.userAgent)

/**
 * Cordova InAppBrowser convention: passing '_system' as the window.open target asks a
 * hybrid-app WebView wrapper (e.g. the ทางรัฐ/Tangrat app) to hand the URL off to the
 * device's default external browser instead of opening it inside the WebView. Whether
 * the wrapper actually honors this is unconfirmed — callers must supply their own
 * fallback for when it returns null.
 */
export const trySystemBrowserOpen = (url: string): Window | null => {
  if (!isAndroidWebView()) return null
  return window.open(url, '_system')
}
