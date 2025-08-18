/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import SignScreen from '@/features/staff/request-list/approval/sign/screen'

interface Props {

}

const SignIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <SignScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(SignIndex)
