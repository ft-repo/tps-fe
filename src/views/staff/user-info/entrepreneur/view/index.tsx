/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useEffect } from 'react'
import ViewScreen from '@/features/staff/user-info/entrepreneur/view/screen'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getUserById } from '@/store/slices/staff/staffSlice'
import { ConfigProvider, message } from 'antd'
import { Loading } from '@/components/shared'

const ViewIndex: FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.staff.loading)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id))
    } else {
      message.error('ไม่พบข้อมูล')
    }
  }, [id, dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Loading loading={loading}>
        <ViewScreen />
      </Loading>
    </ConfigProvider>
  )
}

export default memo(ViewIndex)
