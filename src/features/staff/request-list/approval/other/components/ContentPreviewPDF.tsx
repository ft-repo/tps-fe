/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useAppSelector } from '@/store';


interface Props {
  url: string;
}

const ContentPDFViewer: React.FC<Props> = (props) => {
  const { url } = props
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const token = useAppSelector(state => state.auth.session.token)

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className='h-screen w-full'>
        <Viewer
          fileUrl={url || '/mock/c4611_sample_explain.pdf'}
          plugins={[
            defaultLayoutPluginInstance,
          ]}
          httpHeaders={{
            'Authorization': `Bearer ${token}`,
            'x-api-key': import.meta.env.VITE_API_KEY
          }}
          withCredentials={true}
        />
      </div>
    </Worker>
  )
}

export default React.memo<Props>(ContentPDFViewer)
