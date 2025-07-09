import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';


interface Props {

}

const PDFViewer: React.FC<Props> = (props) => {
  const { } = props
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf'}
        plugins={[
          // defaultLayoutPluginInstance,
        ]}
      />
    </Worker>
  )
}

export default React.memo<Props>(PDFViewer)
