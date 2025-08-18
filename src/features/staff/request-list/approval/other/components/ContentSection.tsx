/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Col, Row } from 'antd'
import { ContentForm, ContentPreviewPDF } from '../components'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props
  const [url, setUrl] = useState<string>('')

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <ContentForm
          setUrl={setUrl}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <ContentPreviewPDF
          url={url}
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ContentSection)
