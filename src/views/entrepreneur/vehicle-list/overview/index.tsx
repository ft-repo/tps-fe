/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import OverviewScreen from '@/features/entrepreneur/vehicle-list/overview/screen'
import { getVehicleType, useAppDispatch, useAppSelector } from '@/store'
import { Loading } from '@/components/shared'

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
      <OverviewScreen />
    </Loading>
  )
}

export default React.memo<Props>(VehicleListIndex)
