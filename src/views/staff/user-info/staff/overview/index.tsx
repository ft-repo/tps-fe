/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import OverviewScreen from '@/features/staff/user-info/staff/overview/screen'
import { ConfigProvider } from 'antd'
import { getDepartment, getRole, useAppDispatch } from '@/store'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDepartment())
    dispatch(getRole())
  }, [dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <OverviewScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(OverviewIndex)
