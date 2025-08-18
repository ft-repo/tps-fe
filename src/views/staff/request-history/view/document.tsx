/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { ConfigProvider } from 'antd'
import React from 'react'
import DocumentScreen from '@/features/staff/request-history/view/document/screen'

interface Props {

}

const DocumentIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <DocumentScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(DocumentIndex)
