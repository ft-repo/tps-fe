/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'
import { getContactType, getEntityType, useAppDispatch } from '@/store'
import { getUserData } from '@/store/slices/entrepreneur'
import { ConfigProvider } from 'antd'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

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
      <ExecutiveDataScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
