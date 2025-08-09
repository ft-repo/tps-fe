/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import CreateScreen from '@/features/entrepreneur/vehicle-list/create/screen'
import { getVehicleType, useAppDispatch } from '@/store'
import { Loading } from '@/components/shared'
import { useAppSelector } from '@/store'

interface Props {
}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getVehicleType())
  }, [dispatch])

  return (
    <Loading loading={loading}>
      <CreateScreen />
    </Loading>
  )
}

export default React.memo<Props>(VehicleListIndex)
