/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import OverviewScreen from '@/features/entrepreneur/vehicle-list/overview/screen'

interface Props {
}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <OverviewScreen />
    </div>
  )
}

export default React.memo<Props>(VehicleListIndex)
