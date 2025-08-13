/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'
import { getContactType, getEntityType, useAppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/slices/entrepreneur'
import { ConfigProvider } from 'antd'
import { Loading } from '@/components/shared'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.entrepreneur.user)


  useEffect(() => {
    dispatch(getUserData())
    dispatch(getContactType())
    dispatch(getEntityType())
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Loading loading={loading}>
        <ExecutiveDataScreen />
      </Loading>
    </ConfigProvider>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
