import React from 'react'
import HistoryDocument from '@/features/staff/request-history/document/screen'

interface Props {

}

const DocumentIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <HistoryDocument/>
  )
}

export default React.memo<Props>(DocumentIndex)
