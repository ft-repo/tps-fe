/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface Props {

}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition } = useAppSelector(state => state.staff.petition)
  const document = petition.detail.document

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: <p>{document?.business_name || '-'}</p>,
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: <p>{document?.entity_type || '-'}</p>,
    },
    {
      key: '3',
      label: 'ที่อยู่บริษัท',
      children: <p>{document?.address || '-'}</p>,
    },
    {
      key: '4',
      label: 'เลขทะเบียนนิติบุคคล',
      children: <p>{document?.registration_no || '-'}</p>,
    },
    {
      key: '5',
      label: 'เบอร์โทรสำนักงาน',
      children: <p>{document?.business_phone_no || '-'}</p>,
    },
    {
      key: '6',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: <p>{document?.contact_name || '-'}</p>,
    },
    {
      key: '7',
      label: 'เบอร์โทรศัพท์',
      children: <p>{document?.contact_phone_no || '-'}</p>,
    },
    {
      key: '8',
      label: 'ชื่อโครงการ',
      children: <p>{document?.project_name || '-'}</p>,
    },
    {
      key: '9',
      label: 'ประเภทการขออนุญาต',
      children: <p>{document?.petition_type || '-'}</p>,
    },
    {
      key: '10',
      label: 'วันที่เริ่มต้น',
      children: <p>{document?.start_date ? dayjs(document?.start_date).format('DD MMMM YYYY') : '-'}</p>,
    },
    {
      key: '11',
      label: 'วันที่สิ้นสุด',
      children: <p>{document?.end_date ? dayjs(document?.end_date).format('DD MMMM YYYY') : '-'}</p>,
    },
    {
      key: '12',
      label: 'ขนส่งจาก',
      children: <p>{document?.start_point || '-'}</p>,
    },
    {
      key: '13',
      label: 'ไปยัง',
      children: <p>{document?.end_point || '-'}</p>,
    },
  ];

  return (
    <Descriptions
      title="ข้อมูลผู้ประสงค์ขออนุญาต"
      items={items}
      column={1}
      layout='vertical'
      size='small'
    />
  )
}

export default React.memo<Props>(ContentDetail)
