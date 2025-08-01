import React from 'react'
import ApprovalSignPage from '@/features/staff/request-list/approval/sign/screen'

interface Props {

}

const ApprovalSignIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ApprovalSignPage/>
  )
}

export default React.memo<Props>(ApprovalSignIndex)
