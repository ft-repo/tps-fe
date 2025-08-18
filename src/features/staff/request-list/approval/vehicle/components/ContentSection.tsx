/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ContentDetail, ContentImage, ContentForm } from '../components'
import { Col, Row } from 'antd'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <section>
          <ContentDetail />
        </section>
        <section className='mt-5'>
          <ContentForm />
        </section>
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <ContentImage />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ContentSection)
