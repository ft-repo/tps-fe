/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React from 'react'
import { Col, Row } from 'antd'
import { EvaluateRouteDetail, ContentRouteTab } from '../components'
import MapRouteEstimation from '@/features/entrepreneur/route-estimation/route/components/route-estimate/initial/MapRouteEstimation'


interface Props {

}

const EvaluationRoute: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h3>ตรวจสอบเส้นทาง</h3>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
            <section>
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
            <ContentRouteTab />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default React.memo<Props>(EvaluationRoute)
