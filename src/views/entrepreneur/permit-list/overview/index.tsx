/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import PermitListScreen from '@/features/entrepreneur/permit-list/overview/screen'
import { ConfigProvider } from 'antd'

interface Props { }

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props;
  
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <PermitListScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(OverviewIndex)