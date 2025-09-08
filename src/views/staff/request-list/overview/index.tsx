/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import OverviewScreen from '@/features/staff/request-list/overview/screen'
import { useAppDispatch } from '@/store'
import { getPetitionCount } from '@/store/slices/staff'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPetitionCount())
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

export default React.memo<Props>(OverviewIndex)
