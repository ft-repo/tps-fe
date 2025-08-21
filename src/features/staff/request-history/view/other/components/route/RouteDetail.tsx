/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'

interface Props {

}

const RouteDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ขนส่งจาก',
      children: <p>{'-'}</p>,
    },
    {
      key: '2',
      label: 'ไปยัง',
      children: <p>{'-'}</p>,
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

export default React.memo<Props>(RouteDetail)
