/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import OtherScreen from '@/features/entrepreneur/route-estimation/other/screen'
import { OtherProvider } from '@/features/entrepreneur/route-estimation/other/context'
import { ConfigProvider } from 'antd'
import { getDistrict, getEntityType, getProvince, getSubDistrict, getVehicleType, useAppDispatch } from '@/store'

interface Props {

}

const OtherIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProvince())
    dispatch(getDistrict(''))
    dispatch(getSubDistrict(''))
    dispatch(getEntityType())
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
      <OtherProvider>
        <OtherScreen />
      </OtherProvider>
    </ConfigProvider>
  )
}

export default React.memo<Props>(OtherIndex)
