/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'
import { useAppSelector } from '@/store'

interface Props {

}

const UserInfoDetail: React.FC<Props> = (props) => {
  const { } = props
  const { detail } = useAppSelector(state => state.tracking)

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: detail.business.business_name || '-',
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: detail.business.entity_type || '-',
    },
    {
      key: '3',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: detail.business.contact_name || '-',
    },
  ];

  return (
    <div className='mb-5'>
      <Descriptions
        title="ข้อมูลผู้ประกอบการ"
        items={items}
        column={1}
      />
    </div>
  )
}

export default React.memo<Props>(UserInfoDetail)
