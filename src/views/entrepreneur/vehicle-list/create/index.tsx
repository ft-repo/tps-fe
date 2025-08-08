/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import CreateScreen from '@/features/entrepreneur/vehicle-list/create/screen'
import { getVehicleType, useAppDispatch } from '@/store'

interface Props {
}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVehicleType())
  }, [dispatch])

  return (
    <div>
      <CreateScreen />
    </div>
  )
}

export default React.memo<Props>(VehicleListIndex)
