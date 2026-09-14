/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { HiOutlineDownload } from 'react-icons/hi'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin, type ToolbarSlot } from '@react-pdf-viewer/default-layout'
// Bundled locally rather than pulled from a CDN: in-app WebViews are the main audience
// here and can't be relied on to reach an external host.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'
import { downloadPdf } from '@/utils/custom/downloadBridge'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface Props {
  /** A URL to load, or a blob for documents generated in the browser. */
  file: Blob | string | null;
  title?: string;
  /** Filename used when the user clicks Download (defaults to "document.pdf"). */
  filename?: string;
  /**
   * The endpoint `file` was fetched from, when it's a Blob and that endpoint is
   * publicly reachable without the app's Authorization header. Lets the download
   * button's external-browser handoff use the real URL (no size limit) instead of
   * inlining the Blob as a data: URI — see downloadBridge.ts's trySystemDownload.
   * Leave unset for anything from an authenticated endpoint; the external browser can't
   * carry that header and would just get a 401.
   */
  sourceUrl?: string;
  onClose: () => void;
}

/**
 * Renders a PDF inside the app with pdf.js instead of handing it to the browser.
 *
 * Opening a document in a new tab (window.open) is unusable inside the in-app WebViews
 * this app is launched from — some refuse to open any new window at all, and Android's
 * WebView has no native PDF renderer to show a blob: URL with either. Drawing the PDF
 * to canvas here works regardless of both limitations.
 */
const ModalPdfPreview: React.FC<Props> = (props) => {
  const { file, title = 'เอกสาร', filename = 'document.pdf', sourceUrl, onClose } = props
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file || typeof file === 'string') {
      setBlobUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setBlobUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const fileUrl = typeof file === 'string' ? file : blobUrl

  const handleDownload = () => {
    if (!file) return
    // A plain `<a download>` click on a blob: URL never fires a real network request
    // inside the app's WebView, so its DownloadListener silently never sees it —
    // downloadBridge.ts routes around that (Web Share sheet, then the native bridge if
    // the host provides one, then a plain anchor download outside the WebView).
    void downloadPdf(file, filename, sourceUrl)
  }

  // The default toolbar's own Download button hits the same blob: URL limitation and
  // stays broken inside the WebView; hide it so the working footer button above isn't
  // shadowed by a redundant one that looks the same but silently does nothing.
  const transformToolbarSlot = (slot: ToolbarSlot): ToolbarSlot => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
  })
  // Calls hooks internally, so it has to run at the top level, not inside useMemo.
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {defaultLayoutPluginInstance.toolbarPluginInstance.renderDefaultToolbar(transformToolbarSlot)}
      </Toolbar>
    ),
  })

  return (
    <Modal
      destroyOnHidden
      open={!!file}
      title={title}
      footer={
        <Button
          icon={<HiOutlineDownload className="text-lg" />}
          onClick={handleDownload}
        >
          ดาวน์โหลด
        </Button>
      }
      width="95vw"
      style={{ top: 16, maxWidth: 1000 }}
      styles={{ body: { height: '80vh', padding: 0 } }}
      onCancel={onClose}
    >
      {fileUrl && (
        <Worker workerUrl={pdfWorkerUrl}>
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      )}
    </Modal>
  )
}

export default React.memo<Props>(ModalPdfPreview)
