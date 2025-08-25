/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { useAppSelector } from '@/store'

interface Props {

}

const RouteDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition } = useAppSelector(state => state.staff.petition)
  const route = petition.detail.estimate.route

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ขนส่งจาก',
      children: <p>{route?.start_point || '-'}</p>,
    },
    {
      key: '2',
      label: 'ไปยัง',
      children: <p>{route?.end_point || '-'}</p>,
    },
  ];

  return (
    <Descriptions
      title="ข้อมูลเส้นทาง (รถคู่ที่ 1)"
      items={items}
      column={1}
      layout='vertical'
      size='small'
    />
  )
}

export default React.memo<Props>(RouteDetail)
