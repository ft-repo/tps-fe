/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import DocumentScreen from '@/features/staff/request-list/approval/document/screen'
import { useAppDispatch } from '@/store'
import { resetAdminPetitionDocument } from '@/store/slices/staff'

interface Props {

}

const DocumentIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetAdminPetitionDocument())
  }, [dispatch])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <DocumentScreen />
    </ConfigProvider>
  )
}

export default React.memo<Props>(DocumentIndex)
