/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import { FormSearchRoute, TableRoute } from '../components'
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getPetitionEstimateBridge, getPetitionEstimateSummary, getPetitionEstimateTurnRadius, setAdminPetitionBridgeEstimation, setAdminPetitionSummaryEstimation, setAdminPetitionTurnRadiusEstimation } from '@/store/slices/staff';

interface Props {
  index: number;
  item: EstimateRouteSubDetail;
}

const ContentRouteList: React.FC<Props> = (props) => {
  const { item } = props
  const dispatch = useAppDispatch()
  const [showTable, setShowTable] = useState<'summary' | 'bridge' | 'turn_radius'>('summary')
  const { petition, loading } = useAppSelector(state => state.staff.petition)
  const estimate = petition.detail.estimate

  useEffect(() => {
    if (item.estimate_id) {
      switch (showTable) {
        case 'summary':
          dispatch(getPetitionEstimateSummary({
            ...estimate.summary.search,
            estimate_id: item.estimate_id
          }))
          break
        case 'bridge':
          dispatch(getPetitionEstimateBridge({
            ...estimate.bridge.search,
            estimate_id: item.estimate_id
          }))
          break
        case 'turn_radius':
          dispatch(getPetitionEstimateTurnRadius({
            ...estimate.turn_radius.search,
            estimate_id: item.estimate_id
          }))
          break
        default:
          dispatch(getPetitionEstimateSummary({
            ...estimate.summary.search,
            estimate_id: item.estimate_id
          }))
          break
      }
    }
  }, [
    dispatch,
    estimate.summary.search,
    estimate.bridge.search,
    estimate.turn_radius.search,
    showTable,
    item.estimate_id
  ])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      switch (showTable) {
        case 'summary':
          dispatch(setAdminPetitionSummaryEstimation({
            params: {
              ...estimate.summary.search,
              page,
              limit
            },
            data: { ...estimate.summary.data }
          }))
          break
        case 'bridge':
          dispatch(setAdminPetitionBridgeEstimation({
            params: {
              ...estimate.bridge.search,
              page,
              limit
            },
            data: { ...estimate.bridge.data }
          }))
          break
        case 'turn_radius':
          dispatch(setAdminPetitionTurnRadiusEstimation({
            params: {
              ...estimate.turn_radius.search,
              page,
              limit
            },
            data: { ...estimate.turn_radius.data }
          }))
          break
        default:
          dispatch(setAdminPetitionSummaryEstimation({
            params: {
              ...estimate.summary.search,
              page,
              limit
            },
            data: { ...estimate.summary.data }
          }))
          break
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [
    dispatch,
    estimate.summary.search,
    estimate.summary.data,
    estimate.bridge.search,
    estimate.bridge.data,
    estimate.turn_radius.search,
    estimate.turn_radius.data,
    showTable
  ])

  return (
    <>
      <section>
        <FormSearchRoute
          setShowTable={setShowTable}
        />
      </section>
      <section className='mt-5'>
        <TableRoute
          keyId={showTable}
          data={petition.detail.estimate[showTable].data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentRouteList)
