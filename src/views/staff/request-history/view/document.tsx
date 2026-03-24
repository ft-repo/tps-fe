/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'
import DocumentScreen from '@/features/staff/request-history/view/document/screen'
import { useAppDispatch } from '@/store'
import { resetAdminPetitionExtendedDetail, resetPetitionExtendedStatus } from '@/store/slices/staff'

interface Props {

}

const DocumentIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetAdminPetitionExtendedDetail())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetPetitionExtendedStatus())
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
