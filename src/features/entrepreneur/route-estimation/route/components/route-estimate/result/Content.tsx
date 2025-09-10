/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store';
import { getEstimateBridgeData, getEstimateDetailData, getEstimateSummaryData, getEstimateTurnRadiusData } from '@/store/slices/entrepreneur';
import ContentDetail from './ContentDetail';
import { EstimateResponse } from '@/@types/services/petition';
import { useRouteContext } from '../../../context';

interface Props {
  item: EstimateResponse;
  index: number;
}

const Content: React.FC<Props> = (props) => {
  const { item, index } = props
  const dispatch = useAppDispatch()
  const { estimate } = useAppSelector(state => state.entrepreneur.permitList)
  const { setIndex, setItem } = useRouteContext()

  useEffect(() => {
    setIndex(index)
    setItem(item)
  }, [index, item, setIndex, setItem])

  useEffect(() => {
    dispatch(getEstimateDetailData({ estimate_id: item.estimate_id }))
    dispatch(getEstimateSummaryData({ ...estimate.summary.search, estimate_id: item.estimate_id }))
    dispatch(getEstimateBridgeData({ ...estimate.bridge.search, estimate_id: item.estimate_id }))
    dispatch(getEstimateTurnRadiusData({ ...estimate.turn_radius.search, estimate_id: item.estimate_id }))
  }, [
    dispatch,
    estimate.summary.search,
    estimate.bridge.search,
    estimate.turn_radius.search,
    item.estimate_id
  ])

  return (
    <ContentDetail
      item={item}
      index={index}
    />
  )
}

export default React.memo<Props>(Content)
