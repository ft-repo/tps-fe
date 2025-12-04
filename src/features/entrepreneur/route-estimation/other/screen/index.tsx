/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useRef } from 'react'
import { OtherInfo, OtherDocument } from '../components'
import { useOtherContext } from '../context'
import { useAppSelector } from '@/store'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'

interface Props {

}

const OtherScreen: React.FC<Props> = (props) => {
  const { } = props
  const { step } = useOtherContext()
  const { vehicle_selection, loading_string } = useAppSelector(state => state.master)
  // const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const navigate = useNavigate()
  const openRef = useRef<boolean>(false)

  useEffect(() => {
    if (openRef.current) return
    // IF NO
    if (!vehicle_selection.data.length && loading_string === 'DONE') {
      // SET REF
      openRef.current = true
      // MODAL
      Modal.warning({
        title: 'ไม่พบรายการรถ',
        content: 'กรุณาเพิ่มรายการรถก่อนทำรายการขออนุญาต',
        okText: 'เพิ่มรายการรถ',
        onOk: () => navigate('/vehicle-list/create'),
        okButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        },
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      })
    }
  }, [navigate, vehicle_selection.data, loading_string])

  const renderFormStep = useMemo(() => {
    switch (step) {
      case 1:
        return <OtherInfo />
      case 2:
        return <OtherDocument />
      default:
        return null
    }
  }, [step])

  return (
    <div>
      {renderFormStep}
    </div>
  )
}

export default React.memo<Props>(OtherScreen)
