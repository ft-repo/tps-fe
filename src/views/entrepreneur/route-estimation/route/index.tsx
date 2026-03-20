/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/route/screen'
import { RouteProvider } from '@/features/entrepreneur/route-estimation/route/context'
import { getProvince, getVehicleSelection, getVehicleType, useAppDispatch, useAppSelector } from '@/store'
import { ConfigProvider } from 'antd'
import { getVehicleData, resetPetitionDetailDocument, resetPetitionDetailRoadMap, resetPetitionDetailVehicle } from '@/store/slices/entrepreneur'
import { useLocation } from 'react-router-dom'

interface Props { }

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const { state } = useLocation()

  useEffect(() => {
    dispatch(getVehicleType())
  }, [dispatch])

  useEffect(() => {
    dispatch(getVehicleSelection(
      {
        page: 1,
        limit: 100,
        search: '',
        vehicle_type_id: ''
      }
    ))
  }, [dispatch])

  useEffect(() => {
    dispatch(getProvince())
  }, [dispatch])

  useEffect(() => {
    dispatch(getVehicleData(vehicle.overview.search))
  }, [dispatch, vehicle.overview.search])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(resetPetitionDetailDocument())
    }
  }, [dispatch, state?.petition_id])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(resetPetitionDetailRoadMap())
    }
  }, [dispatch, state?.petition_id])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(resetPetitionDetailVehicle())
    }
  }, [dispatch, state?.petition_id])

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
