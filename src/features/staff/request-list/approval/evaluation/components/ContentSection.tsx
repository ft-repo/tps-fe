/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Row } from 'antd'
import React from 'react'
import { PetitionDetail, RemarkDetail, TablePermitDocument, TablePetitionDocument, TableVehicleDocument, VehicleDetail } from '@/features/staff/request-history/view/document/components'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <PetitionDetail />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <VehicleDetail />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <RemarkDetail />
      </section>
      <section className='mt-5'>
        <TablePetitionDocument />
        <TableVehicleDocument />
        <TablePermitDocument />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSection)
