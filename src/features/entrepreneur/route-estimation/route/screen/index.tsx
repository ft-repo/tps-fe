/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useRef } from 'react'
import { EstimateResult, RouteEstimation, RequestPermit } from '../components'
import { useRouteContext } from '../context'
import { useAppSelector } from '@/store'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Props {
}

const RouteEstimationScreen: React.FC<Props> = (props) => {
  const { } = props
  const { step } = useRouteContext()
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
        return <RouteEstimation />
      case 2:
        return <EstimateResult />
      case 3:
        return <RequestPermit />
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

export default React.memo<Props>(RouteEstimationScreen)
