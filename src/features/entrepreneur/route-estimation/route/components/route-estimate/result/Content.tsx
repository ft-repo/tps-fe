/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import MapRouteEstimation from '../initial/MapRouteEstimation';
import { useAppDispatch, useAppSelector } from '@/store';
import { getEstimateBridgeData, getEstimateDetailData, getEstimateSummaryData, getEstimateTurnRadiusData } from '@/store/slices/entrepreneur';
import ContentDetail from './ContentDetail';
import ContentRouteList from './ContentRouteList';
import { EstimateResponse } from '@/@types/services/petition';

interface Props {
  item: EstimateResponse;
  index: number;
}

const Content: React.FC<Props> = (props) => {
  const { item, index } = props
  const dispatch = useAppDispatch()
  const { estimate } = useAppSelector(state => state.entrepreneur.permitList)

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
    <>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <ContentDetail
              item={item}
              index={index}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[77vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <MapRouteEstimation
                firstPoint={null}
                secondPoint={null}
              />
            </div>
          </Col>
        </Row>
      </section>
      <hr className='my-5' />
      <section>
        <h3>รายการประเมินเส้นทาง</h3>
        <section className='mt-3'>
          <ContentRouteList
            item={item}
            index={index}
          />
        </section>
      </section>
    </>
  )
}

export default React.memo<Props>(Content)
