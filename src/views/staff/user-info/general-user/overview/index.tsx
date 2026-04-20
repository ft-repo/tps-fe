/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import OverviewScreen from '@/features/staff/user-info/general-user/overview/screen'

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
