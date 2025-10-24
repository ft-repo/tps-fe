/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/route/screen'
import { RouteProvider } from '@/features/entrepreneur/route-estimation/route/context'
import { getProvince, getVehicleSelection, getVehicleType, useAppDispatch, useAppSelector } from '@/store'
import { ConfigProvider } from 'antd'
import { getVehicleData } from '@/store/slices/entrepreneur'

interface Props { }

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)

  useEffect(() => {
    dispatch(getVehicleType())
    dispatch(getVehicleSelection(
      {
        page: 1,
        limit: 100,
        search: '',
        vehicle_type_id: ''
      }
    ))
    dispatch(getProvince())
    dispatch(getVehicleData(vehicle.overview.search))
  }, [dispatch, vehicle.overview.search])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <RouteProvider>
        <RouteEstimationScreen />
      </RouteProvider>
    </ConfigProvider>
  )
}

export default React.memo<Props>(RouteIndex)
