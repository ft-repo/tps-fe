/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import CreateScreen from '@/features/entrepreneur/vehicle-list/create/screen'

interface Props {
}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <CreateScreen />
    </div>
  )
}

export default React.memo<Props>(VehicleListIndex)
