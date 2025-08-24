/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ConfigProvider } from 'antd'
import EvaluationScreen from '@/features/staff/request-list/approval/evaluation/screen'

interface Props {

}

const EvaluationIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <EvaluationScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(EvaluationIndex)
