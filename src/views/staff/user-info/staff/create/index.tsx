/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
//import React from 'react'
import React, { useEffect } from 'react'
import CreateScreen from '@/features/staff/user-info/staff/create/screen'
import { ConfigProvider } from 'antd'
import { getDepartment, getRole, useAppDispatch } from '@/store'

interface Props {

}

const CreateIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDepartment())
    dispatch(getRole())
  }, [dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <CreateScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(CreateIndex)
