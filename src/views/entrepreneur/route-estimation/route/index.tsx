/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/route/screen'
import { RouteProvider } from '@/features/entrepreneur/route-estimation/route/context'
import { getVehicleType, useAppDispatch } from '@/store'
import { ConfigProvider } from 'antd'

interface Props { }

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVehicleType())
  }, [dispatch])

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
