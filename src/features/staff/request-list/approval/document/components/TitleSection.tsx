/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Col, Row } from 'antd'
import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

interface Props {

}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]} align={'middle'}>
      <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
        <h3>ตรวจสอบเอกสาร</h3>
      </Col>
      <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
        <Button
          type='primary'
          icon={<AiOutlineDownload />}
        >
          Export to PDF
        </Button>
      </Col>
    </Row>
  )
}

export default React.memo<Props>(TitleSection)
