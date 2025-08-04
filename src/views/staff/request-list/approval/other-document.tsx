import React from 'react'
import OtherDocumentPage from '@/features/staff/request-list/approval/other-document/screen'

interface Props {

}

const OtherDocumentIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <OtherDocumentPage/>
  )
}

export default React.memo<Props>(OtherDocumentIndex)
