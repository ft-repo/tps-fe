/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Col, Descriptions, DescriptionsProps, Row } from 'antd'
import React from 'react'

interface Props {

}

const ResultPermitDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารลงนาม',
      children: <p>เอกสารลงนามจังหวัดพระนครศรีอยุธยา-ระยอง.pdf</p>,
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>22 ก.พ. 64</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)</p>,
    },
  ]

    const items2: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารใบอนุญาต',
      children: <p>ใบอนุญาต.pdf</p>,
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>22 ก.พ. 64</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)</p>,
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Descriptions
          title="เอกสารสำคัญ (เอกสารลงนาม)"
          items={items}
          column={1}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Descriptions
          title="เอกสารสำคัญ (เอกสารใบอนุมัติ)"
          items={items2}
          column={1}
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ResultPermitDetail)
