/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Row } from 'antd'
import React from 'react'
import { ContentDetail, ContentForm, ContentPreviewPDF } from '../components'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props

  return (
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
        <ContentPreviewPDF />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ContentSection)
