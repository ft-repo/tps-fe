/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ViewScreen from '@/features/entrepreneur/permit-list/view/screen'
import { ConfigProvider } from 'antd'

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
