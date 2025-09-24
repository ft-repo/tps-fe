/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { message, Spin, Tabs, TabsProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import PDFViewer from './PDFViewer';

interface Props {

}

const ContentPreviewPDF: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  const [poaImg, setPoaImg] = useState<string>('')
  const [machImg, setMachImg] = useState<string>('')
  const dispatch = useAppDispatch()
  const { petition } = useAppSelector(state => state.staff.petition)
  const { loading } = useAppSelector(state => state.layout)
  const document = petition.detail.document

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (stateType: 'poa' | 'mach', imgUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        if (stateType === 'poa') {
          setPoaImg(url)
        }
        if (stateType === 'mach') {
          setMachImg(url)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    if (document.poa_url) {
      if (extractUrl(document.poa_url)) {
        fetchImage('poa', extractUrl(document.poa_url))
      }
    }
  }, [fetchImage, extractUrl, document.poa_url])

  useEffect(() => {
    if (document.mach_book_url) {
      if (extractUrl(document.mach_book_url)) {
        fetchImage('mach', extractUrl(document.mach_book_url))
      }
    }
  }, [fetchImage, extractUrl, document.mach_book_url])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'หนังสือมอบอำนาจ',
      children: (
        <PDFViewer
          url={poaImg || document.poa_url}
        />
      ),
    },
    {
      key: '2',
      label: 'หนังสือวิศวะเครื่องกล',
      children: (
        <PDFViewer
          url={machImg || document.mach_book_url}
        />
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Tabs
        defaultActiveKey={tabKey}
        items={items}
        onChange={(tabKey) => setTabKey(tabKey)}
      />
    </Spin>
  )
}

export default React.memo<Props>(ContentPreviewPDF)
