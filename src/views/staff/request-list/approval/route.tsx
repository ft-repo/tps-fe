/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import RouteScreen from '@/features/staff/request-list/approval/route/screen'
import { RouteProvider } from '@/features/staff/request-list/approval/route/context'
import { useAppDispatch } from '@/store'
import { resetAdminPetitionRouteEstimation, resetPetitionStatus } from '@/store/slices/staff'

interface Props {

}

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetAdminPetitionRouteEstimation())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetPetitionStatus())
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
        <RouteScreen />
      </RouteProvider>
    </ConfigProvider>
  )
}

export default React.memo<Props>(RouteIndex)
