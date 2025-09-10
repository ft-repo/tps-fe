/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { RouteDetail, TableSummary, TableBridge, TableTurnRadius } from '../../components'
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getPetitionEstimateBridge, getPetitionEstimateSummary, getPetitionEstimateTurnRadius, setAdminPetitionBridgeEstimation, setAdminPetitionSummaryEstimation, setAdminPetitionTurnRadiusEstimation } from '@/store/slices/staff';
import { useOtherContext } from '../../context';

interface Props {
  index: number;
  item: EstimateRouteSubDetail;
}

const RouteContent: React.FC<Props> = (props) => {
  const { item, index } = props
  const dispatch = useAppDispatch()
  const { petition, loading } = useAppSelector(state => state.staff.petition)
  const estimate = petition.detail.estimate
  const { setIndex, setItem } = useOtherContext()

  useEffect(() => {
    setIndex(index)
    setItem(item)
  }, [index, item, setIndex, setItem])

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
    <>
      <section>
        <RouteDetail />
      </section>
      <section className='mt-5'>
        <TableSummary
          data={petition.detail.estimate.summary.data}
          loading={loading}
          handleTableChange={handleTableSummaryChange}
        />
      </section>
      <section>
        <TableBridge
          data={petition.detail.estimate.bridge.data}
          loading={loading}
          handleTableChange={handleTableBridgeChange}
        />
      </section>
      <section>
        <TableTurnRadius
          data={petition.detail.estimate.turn_radius.data}
          loading={loading}
          handleTableChange={handleTableTurnRadiusChange}
        />
      </section>
    </>
  )
}

export default React.memo<Props>(RouteContent)
