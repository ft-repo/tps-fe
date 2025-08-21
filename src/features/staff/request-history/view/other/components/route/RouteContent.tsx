/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Row } from 'antd'
import React from 'react'
import { RouteDetail, EvaluateRouteDetail, TableSummary, TableBridge, TableTurnRadius } from '../../components'
import MapRouteEstimation from '@/features/entrepreneur/route-estimation/route/components/route-estimate/initial/MapRouteEstimation'

interface Props {

}

const RouteContent: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
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
      <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <TableSummary loading={false} />
        <TableBridge loading={false} />
        <TableTurnRadius loading={false} />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(RouteContent)
