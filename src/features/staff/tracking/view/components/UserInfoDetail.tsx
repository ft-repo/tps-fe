/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const UserInfoDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: 'ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด',
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
    },
    {
      key: '3',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: 'ชญานิษฐ์ พงศ์เกษมชัย',
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
