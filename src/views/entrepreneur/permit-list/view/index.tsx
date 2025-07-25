/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ViewScreen from '@/features/entrepreneur/permit-list/view/screen'

interface Props {

}

const ViewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <ViewScreen />
    </div>
  )
}

export default React.memo<Props>(ViewIndex)
