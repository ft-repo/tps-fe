/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import OverviewScreen from '@/features/staff/request-history/overview/screen'

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
