import React from 'react'
import { Col, Row } from 'antd'
import {
  PetitionDetail, RemarkDetail, TablePermitDocument,
  TablePetitionDocument, TableVehicleDocument, VehicleDetail
} from '@/features/staff/request-history/view/document/components'

interface Props {
  forceCondensed?: boolean
}

const ContentSection: React.FC<Props> = ({ forceCondensed }) => {
  return (
    <div className="border-2 rounded-md p-4 mb-3">
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}><PetitionDetail /></Col>
          <Col xs={24} lg={12}><VehicleDetail /></Col>
        </Row>
      </section>

      <section className="mt-5">
        <RemarkDetail />
      </section>

      <section className="mt-5">
        {/* ส่ง forceCondensed ให้ทุกตาราง */}
        <TablePetitionDocument forceCondensed={forceCondensed} />
        <TableVehicleDocument/>
        <TablePermitDocument/>
      </section>
    </div>
  )
}

export default React.memo(ContentSection)
