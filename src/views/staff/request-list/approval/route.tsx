/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import RouteScreen from '@/features/staff/request-list/approval/route/screen'
import { RouteProvider } from '@/features/staff/request-list/approval/route/context'

interface Props {

}

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <RouteProvider>
        <RouteScreen />
      </RouteProvider>
    </ConfigProvider>
  )
}

export default React.memo<Props>(RouteIndex)
