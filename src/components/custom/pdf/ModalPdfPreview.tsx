/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { HiOutlineDownload } from 'react-icons/hi'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin, type ToolbarSlot } from '@react-pdf-viewer/default-layout'
// Bundled locally rather than pulled from a CDN: in-app WebViews are the main audience
// here and can't be relied on to reach an external host.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'
import {
  DOWNLOAD_METHODS,
  describeEnvironment,
  downloadPdf,
  runDownloadMethod,
  type DownloadMethod,
  type DownloadStep,
} from '@/utils/custom/downloadBridge'
import { useAppSelector } from '@/store'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface Props {
  /** A URL to load, or a blob for documents generated in the browser. */
  file: Blob | string | null;
  title?: string;
  /** Overrides the name the download is saved under; otherwise taken from `file`. */
  filename?: string;
  onClose: () => void;
}

/**
 * No caller passes a filename, and the documents here already carry a good one — either
 * in the last segment of the URL or on the File the user picked.
 */
const deriveFilename = (file: Blob | string | null): string => {
  if (typeof file === 'string') {
    const lastSegment = file.split('?')[0].split('/').pop()
    if (lastSegment) {
      try {
        return decodeURIComponent(lastSegment)
      } catch {
        return lastSegment
      }
    }
  }
  if (file instanceof File && file.name) return file.name
  return 'document.pdf'
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
  const { file, title = 'เอกสาร', filename, onClose } = props
  const resolvedFilename = filename || deriveFilename(file)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [trace, setTrace] = useState<DownloadStep[] | null>(null)
  const { from_web } = useAppSelector(state => state.auth.user)

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

  const handleDownload = async () => {
    if (!file) return
    // Goes through the Android bridge when embedded in the app's WebView, since a plain
    // `<a download>` click never fires a real network request there and the app's
    // DownloadListener silently never sees it — see downloadBridge.ts.
    setTrace(await downloadPdf(file, resolvedFilename, { fromWeb: from_web }))
  }

  const handleTryMethod = async (method: DownloadMethod) => {
    if (!file) return
    const environment = describeEnvironment(file, resolvedFilename, from_web)
    setTrace([...environment, ...(await runDownloadMethod(method, file, resolvedFilename))])
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
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              icon={<HiOutlineDownload className="text-lg" />}
              onClick={handleDownload}
            >
              ดาวน์โหลด
            </Button>
            {DOWNLOAD_METHODS.map((method) => (
              <Button
                key={method.id}
                size="small"
                title={method.note}
                onClick={() => handleTryMethod(method.id)}
              >
                {method.label}
              </Button>
            ))}
            {trace && (
              <Button size="small" type="text" onClick={() => setTrace(null)}>
                ล้าง
              </Button>
            )}
          </div>
          {trace && (
            <div className="max-h-48 overflow-auto rounded bg-black/85 p-2 font-mono text-xs leading-relaxed text-gray-100">
              {trace.map((step, index) => (
                <div key={index} className="break-all">
                  <span
                    className={
                      step.ok === true ? 'text-green-400' : step.ok === false ? 'text-red-400' : 'text-sky-300'
                    }
                  >
                    {step.ok === true ? '[ok]' : step.ok === false ? '[fail]' : '[·]'} {step.label}
                  </span>
                  {' '}
                  <span className="text-gray-300">{step.detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>
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
