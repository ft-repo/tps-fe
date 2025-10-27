/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'
import OtherScreen from '@/features/staff/request-history/view/other/screen'
import { OtherProvider } from '@/features/staff/request-history/view/other/context'
import { useAppDispatch } from '@/store'
import { resetAdminPetitionDocument, resetAdminPetitionRouteEstimation, resetAdminPetitionVehicle, resetPetitionStatus } from '@/store/slices/staff'

interface Props {

}

const OtherIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetAdminPetitionDocument())
    dispatch(resetAdminPetitionRouteEstimation())
    dispatch(resetAdminPetitionVehicle())
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
      <OtherProvider>
        <OtherScreen />
      </OtherProvider>
    </ConfigProvider>
  )
}

export default React.memo<Props>(OtherIndex)
