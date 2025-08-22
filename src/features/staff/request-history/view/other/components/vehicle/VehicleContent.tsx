/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Row } from 'antd'
import React from 'react'
import { VehicleDetail, EvaluateVehicleDetail, VehicleListDetail } from '../../components'
import { VehicleList } from '@/@types/reducer/petition';

interface Props {
  index: number;
  item: VehicleList;
}

const VehicleContent: React.FC<Props> = (props) => {
  const { item } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <section>
          <VehicleDetail
            item={item}
          />
        </section>
        <section className='mt-5'>
          <EvaluateVehicleDetail />
        </section>
      </Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <VehicleListDetail
          item={item}
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(VehicleContent)
