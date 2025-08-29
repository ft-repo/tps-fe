/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import OverviewScreen from '@/features/entrepreneur/vehicle-list/overview/screen'
import { getProvince, getVehicleType, useAppDispatch } from '@/store'
import { ConfigProvider } from 'antd'

interface Props {
}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVehicleType())
    dispatch(getProvince())
  }, [dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <OverviewScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(VehicleListIndex)
