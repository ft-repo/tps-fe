/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import VehicleScreen from '@/features/staff/request-list/approval/vehicle/screen'
import { useAppDispatch } from '@/store'
import { resetAdminPetitionVehicle, resetPetitionStatus } from '@/store/slices/staff'

interface Props {

}

const VehicleIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetAdminPetitionVehicle())
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
      <VehicleScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(VehicleIndex)
