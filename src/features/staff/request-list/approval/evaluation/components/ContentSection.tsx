/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Col, Row } from 'antd'
import {
  PetitionDetail, RemarkDetail, TablePermitDocument,
  TablePetitionDocument, TableVehicleDocument, VehicleDetail
} from '@/features/staff/request-history/view/document/components'

interface Props {
  forceCondensed?: boolean
}

const ContentSection: React.FC<Props> = (props) => {
  const { forceCondensed } = props;

  return (
    <div className="border-2 rounded-md p-4 mb-3">
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

      <section className="mt-5">
        <RemarkDetail />
      </section>

      <section className="mt-5">
        {/* ส่ง forceCondensed ให้ทุกตาราง */}
        <TablePetitionDocument />
        <TableVehicleDocument />
        <TablePermitDocument />
      </section>
    </div>
  )
}

export default React.memo(ContentSection)
