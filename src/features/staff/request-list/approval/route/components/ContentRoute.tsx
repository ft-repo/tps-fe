/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ContentDetail, ContentRouteList, ContentForm } from '../components'
import { Col, Row } from 'antd'
import MapRouteEstimation from '@/features/entrepreneur/route-estimation/route/components/route-estimate/initial/MapRouteEstimation'
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';

interface Props {
  index: number;
  item: EstimateRouteSubDetail;
}

const ContentRoute: React.FC<Props> = (props) => {
  const { index, item } = props

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <section>
              <ContentDetail />
            </section>
            <section className='mt-5'>
              <ContentForm />
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[58vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
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
            index={index}
            item={item}
          />
        </section>
      </section>
    </>
  )
}

export default React.memo<Props>(ContentRoute)
