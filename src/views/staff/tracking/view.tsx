/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import ViewScreen from '@/features/staff/tracking/view/screen'

interface Props {

}

const ViewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <ViewScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(ViewIndex)
