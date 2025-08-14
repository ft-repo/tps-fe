/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'
import { getContactType, getEntityType, setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/slices/entrepreneur'
import { ConfigProvider } from 'antd'
import { Loading } from '@/components/shared'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { profile_url, business_document, loading } = useAppSelector(state => state.entrepreneur.user)
  const [fileList, setFileList] = useState<any[]>([])
  const localLoading = useAppSelector(state => state.layout.loading)

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const extractFileName = useCallback((url: string | null) => {
    const match = url?.match(/\/([^\/]+)$/);
    return match ? match[1] : '';
  }, [])

  const getUploadAPIList = useCallback(async () => {
    // CHECK IF DATA EXISTED
    dispatch(setLoading(true))

    const uploadArr = [
      extractUrl(profile_url || ''),
      extractUrl(business_document.cid_card_file_url || ''),
      extractUrl(business_document.certificate_file_url || ''),
      extractUrl(business_document.business_file_url || ''),
    ]
    
    try {
      const response = await Promise.all(uploadArr.filter(item => item).map(item => getUploadAPI(item as string)))
      const result = response.every(item => item.status === 200)
      if (result) {
        setFileList(response.map((item, index) => {
          const blobFile = new Blob([item.data], { type: item.data.type })
          const url = URL.createObjectURL(blobFile)
          // RETURN VALUE
          return {
            // crossOrigin: 'use-credentials',
            name: item.data.name || extractFileName(uploadArr[index]),
            // percent: 100,
            uid: String(index),
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: item.data.type,
            originFileObj: blobFile as any,
          }
        }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [extractUrl, dispatch, extractFileName, business_document, profile_url])

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getContactType())
    dispatch(getEntityType())
  }, [dispatch])

  useEffect(() => {
    getUploadAPIList()
  }, [getUploadAPIList])

  if (!fileList.length) return <p>Loading...</p>

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Loading loading={loading || localLoading}>
        <ExecutiveDataScreen
          fileList={fileList}
        />
      </Loading>
    </ConfigProvider>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
