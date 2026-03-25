/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useEffect } from 'react'
import ViewScreen from '@/features/staff/user-info/entrepreneur/view/screen'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getClientDetail } from '@/store/slices/staff/staffSlice'
import { ConfigProvider, message } from 'antd'
import { Loading } from '@/components/shared'
// import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { getContactType, getEntityType } from '@/store'

const ViewIndex: FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const localLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.staff)
  // const [fileList, setFileList] = useState<any[]>([])

  // const extractUrl = useCallback((url: string) => {
  //   const path = url.split('/upload')[1];
  //   return path
  // }, []);

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  // const getUploadAPIList = useCallback(async () => {
  //   // CHECK IF DATA EXISTED
  //   dispatch(setLoading(true))

  //   const uploadArr = [
  //     extractUrl(client.detail.profile_url || ''),
  //     extractUrl(client.detail.documents.cid_card_file_url || ''),
  //     extractUrl(client.detail.documents.certificate_file_url || ''),
  //     extractUrl(client.detail.documents.business_file_url || ''),
  //   ]

  //   try {
  //     const response = await Promise.all(uploadArr.filter(item => item).map(item => getUploadAPI(item as string)))
  //     const result = response.every(item => item.status === 200)
  //     if (result) {
  //       setFileList(response.map((item, index) => {
  //         const blobFile = new Blob([item.data], { type: item.data.type })
  //         const url = URL.createObjectURL(blobFile)
  //         // RETURN VALUE
  //         if (url) {
  //           return {
  //             // crossOrigin: 'use-credentials',
  //             name: item.data.name || extractFileName(uploadArr[index]),
  //             // percent: 100,
  //             uid: String(index),
  //             status: 'done',
  //             url: url,
  //             // thumbUrl: url,
  //             type: item.data.type,
  //             originFileObj: blobFile as any,
  //           }
  //         } else {
  //           return {
  //             name: item.data.name || extractFileName(uploadArr[index]),
  //             uid: String(index),
  //             status: 'done',
  //             url: uploadArr[index],
  //             type: item.data.type,
  //             originFileObj: null,
  //           }
  //         }
  //       }))
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message)
  //     } else {
  //       console.error(error)
  //     }
  //   } finally {
  //     dispatch(setLoading(false))
  //   }
  // }, [extractUrl, dispatch, extractFileName, client])

  useEffect(() => {
    if (id) {
      dispatch(getClientDetail(id))
    } else {
      message.error('ไม่พบข้อมูล')
    }
  }, [id, dispatch])

  useEffect(() => {
    dispatch(getContactType())
  }, [dispatch])

  useEffect(() => {
    dispatch(getEntityType())
  }, [dispatch])

  // useEffect(() => {
  //   getUploadAPIList()
  // }, [getUploadAPIList])

  // if (!fileList.length) return <p>Loading...</p>

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Loading loading={loading || localLoading}>
        <ViewScreen />
      </Loading>
    </ConfigProvider>
  )
}

export default memo(ViewIndex)
