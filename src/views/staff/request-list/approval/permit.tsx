import React from 'react'
import ApprovalPermitPage from '@/features/staff/request-list/approval/permit/screen'

interface Props {

}

const ApprovalPermitIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ApprovalPermitPage/>
  )
}

export default React.memo<Props>(ApprovalPermitIndex)
