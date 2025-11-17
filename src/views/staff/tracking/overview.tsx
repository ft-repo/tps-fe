import React from 'react'
import { ConfigProvider } from 'antd'
import OverviewScreen from '@/features/staff/tracking/overview/screen'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props

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
