/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Row } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { RouteDetail, EvaluateRouteDetail, TableSummary, TableBridge, TableTurnRadius } from '../../components'
import MapRouteEstimation from '@/features/entrepreneur/route-estimation/route/components/route-estimate/initial/MapRouteEstimation'
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getPetitionEstimateBridge, getPetitionEstimateSummary, getPetitionEstimateTurnRadius, setAdminPetitionBridgeEstimation, setAdminPetitionSummaryEstimation, setAdminPetitionTurnRadiusEstimation } from '@/store/slices/staff';

interface Props {
  index: number;
  item: EstimateRouteSubDetail;
}

const RouteContent: React.FC<Props> = (props) => {
  const { item } = props
  const dispatch = useAppDispatch()
  const { petition, loading } = useAppSelector(state => state.staff.petition)
  const estimate = petition.detail.estimate

  useEffect(() => {
    dispatch(getPetitionEstimateSummary({
      ...estimate.summary.search,
      estimate_id: item.estimate_id,
      limit: 5
    }))
    dispatch(getPetitionEstimateBridge({
      ...estimate.bridge.search,
      estimate_id: item.estimate_id,
      limit: 5
    }))
    dispatch(getPetitionEstimateTurnRadius({
      ...estimate.turn_radius.search,
      estimate_id: item.estimate_id,
      limit: 5
    }))
  }, [
    dispatch,
    estimate.summary.search,
    estimate.bridge.search,
    estimate.turn_radius.search,
    item.estimate_id
  ])


  const handleTableSummaryChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionSummaryEstimation({
        params: {
          ...estimate.summary.search,
          page,
          limit
        },
        data: { ...estimate.summary.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    } finally {
      dispatch(setLoading(false))
    }

  }, [dispatch, estimate.summary.search, estimate.summary.data])

  const handleTableBridgeChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionBridgeEstimation({
        params: {
          ...estimate.bridge.search,
          page,
          limit
        },
        data: { ...estimate.bridge.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, estimate.bridge.search, estimate.bridge.data])

  const handleTableTurnRadiusChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionTurnRadiusEstimation({
        params: {
          ...estimate.turn_radius.search,
          page,
          limit
        },
        data: { ...estimate.turn_radius.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, estimate.turn_radius.search, estimate.turn_radius.data])

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
        <section>
          <RouteDetail />
        </section>
        <section className='mt-5'>
          <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[40vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
            <MapRouteEstimation
              firstPoint={null}
              secondPoint={null}
            />
          </div>
        </section>
        <section className='mt-5'>
          <EvaluateRouteDetail />
        </section>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
        <TableSummary
          data={petition.detail.estimate.summary.data}
          loading={loading}
          handleTableChange={handleTableSummaryChange}
        />
        <TableBridge
          data={petition.detail.estimate.bridge.data}
          loading={loading}
          handleTableChange={handleTableBridgeChange}
        />
        <TableTurnRadius
          data={petition.detail.estimate.turn_radius.data}
          loading={loading}
          handleTableChange={handleTableTurnRadiusChange}
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(RouteContent)
