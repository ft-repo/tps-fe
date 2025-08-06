import React from 'react'
import OtherHistoryDocument from '@/features/staff/request-history/other-document/screen'

interface Props {

}

const OtherDocumentIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <OtherHistoryDocument/>
  )
}

export default React.memo<Props>(OtherDocumentIndex)
