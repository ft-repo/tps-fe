import React from 'react'
import ApprovalEvaluationPage from '@/features/staff/request-list/approval/evaluation/screen'

interface Props {

}

const ApprovalEvaluationIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ApprovalEvaluationPage/>
  )
}

export default React.memo<Props>(ApprovalEvaluationIndex)
