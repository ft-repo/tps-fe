/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useRef } from 'react'
import { EstimateResult, RouteEstimation, RequestPermit } from '../components'
import { useRouteContext } from '../context'
import { useAppDispatch, useAppSelector } from '@/store'
import { Modal } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPetitionDetailDocumentData, getPetitionDetailVehicleData, getPetitionRoadMapData } from '@/store/slices/entrepreneur'

interface Props {
}

const RouteEstimationScreen: React.FC<Props> = (props) => {
  const { } = props
  const { step, setStep } = useRouteContext()
  const { vehicle_selection, loading_string } = useAppSelector(state => state.master)
  // const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const openRef = useRef<boolean>(false)
  // REACT HOOK
  const navigate = useNavigate()
  const location = useLocation();
  // GET STATE
  const { state } = location;
  // DISPATCH
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (state?.petition_id) {
      if (state?.type === "ตรวจเอกสาร") {
        setStep(3)
      } else {
        setStep(1)
      }
    }
  }, [setStep, state?.petition_id, state?.type])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(getPetitionDetailDocumentData({
        petition_id: state?.petition_id
      }))
    }
  }, [dispatch, state?.petition_id])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(getPetitionDetailVehicleData({
        petition_id: state?.petition_id
      }))
    }
  }, [dispatch, state?.petition_id])

  useEffect(() => {
    if (state?.petition_id) {
      dispatch(getPetitionRoadMapData({
        petition_id: state?.petition_id
      }))
    }
  }, [state?.petition_id, dispatch])

  // useEffect(() => {
  //   if (state?.petition_id) {
  //     dispatch(resetPetitionDetailRoadMap())
  //   }
  // }, [state?.petition_id, dispatch])

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
