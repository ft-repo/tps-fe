import React from 'react'
import ApprovalDocumentPage from '@/features/staff/request-list/approval/document/screen'

interface Props {}

const ApprovalDocumentIndex: React.FC<Props> = () => {
  return (
    <ApprovalDocumentPage/>
  )
}

export default React.memo<Props>(ApprovalDocumentIndex)
