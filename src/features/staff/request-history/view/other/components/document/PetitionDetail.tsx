/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'

interface Props {

}

const PetitionDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: <p>{'-'}</p>,
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: <p>{'-'}</p>,
    },
    {
      key: '3',
      label: 'ที่อยู่บริษัท',
      children: <p>{'-'}</p>,
    },
    {
      key: '4',
      label: 'เลขทะเบียนนิติบุคคล',
      children: <p>{'-'}</p>,
    },
    {
      key: '5',
      label: 'เบอร์โทรสำนักงาน',
      children: <p>{'-'}</p>,
    },
    {
      key: '6',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: <p>{'-'}</p>,
    },
    {
      key: '7',
      label: 'เบอร์โทรศัพท์',
      children: <p>{'-'}</p>,
    },
    {
      key: '8',
      label: 'ชื่อโครงการ',
      children: <p>{'-'}</p>,
    },
    {
      key: '9',
      label: 'ประเภทการขออนุญาต',
      children: <p>{'-'}</p>,
    },
    {
      key: '10',
      label: 'วันที่เริ่มต้น',
      children: <p>{'-'}</p>,
    },
    {
      key: '11',
      label: 'วันที่สิ้นสุด',
      children: <p>{'-'}</p>,
    },
    {
      key: '12',
      label: 'ขนส่งจาก',
      children: <p>{'-'}</p>,
    },
    {
      key: '13',
      label: 'ไปยัง',
      children: <p>{'-'}</p>,
    },
    {
      key: '14',
      label: 'หนังสือมอบอำนาจ',
      children: <p>{'-'}</p>,
    },
    {
      key: '15',
      label: 'หนังสือวิศวะเครื่องกล',
      children: <p>{'-'}</p>,
    },
  ];

  return (
    <Descriptions
      title="ข้อมูลผู้ประสงค์ขออนุญาต"
      items={items}
      column={3}
    />
  )
}

export default React.memo<Props>(PetitionDetail)
