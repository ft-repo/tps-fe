/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import VehicleScreen from '@/features/staff/request-list/approval/vehicle/screen'

interface Props {

}

const VehicleIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <VehicleScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(VehicleIndex)
