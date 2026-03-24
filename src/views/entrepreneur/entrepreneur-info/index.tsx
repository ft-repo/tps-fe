/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'
import { getContactType, getEntityType, useAppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/slices/entrepreneur'
import { ConfigProvider } from 'antd'
import { Loading } from '@/components/shared'
// import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.entrepreneur.user)
  const localLoading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  useEffect(() => {
    dispatch(getContactType())
  }, [dispatch])

  useEffect(() => {
    dispatch(getEntityType())
  }, [dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Loading loading={loading || localLoading}>
        <ExecutiveDataScreen />
      </Loading>
    </ConfigProvider>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
