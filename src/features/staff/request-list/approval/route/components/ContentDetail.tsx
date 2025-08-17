/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ขนส่งจาก',
      children: <p>18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา</p>,
    },
    {
      key: '2',
      label: 'ไปยัง',
      children: <p>12.6814, 101.2775 จังหวัดระยอง</p>,
    },
  ];

  return (
    <Descriptions
      title="ข้อมูลเส้นทาง (รถคู่ที่ 1)"
      items={items}
      column={1}
    />
  )
}

export default React.memo<Props>(ContentDetail)
