/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import PermitScreen from '@/features/staff/request-list/approval/permit-extended/screen'

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
      <PermitScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(RouteIndex)
