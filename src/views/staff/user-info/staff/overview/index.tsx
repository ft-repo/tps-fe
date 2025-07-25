/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import React from 'react'
import OverviewScreen from '@/features/staff/user-info/staff/overview'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <OverviewScreen />
    </div>
  )
}

export default React.memo<Props>(OverviewIndex)
