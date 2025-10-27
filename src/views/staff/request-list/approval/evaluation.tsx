/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import EvaluationScreen from '@/features/staff/request-list/approval/evaluation/screen'
import { useAppDispatch } from '@/store'
import { resetPetitionExtendedStatus } from '@/store/slices/staff'

interface Props {

}

const EvaluationIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetPetitionExtendedStatus())
  }, [dispatch])

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
