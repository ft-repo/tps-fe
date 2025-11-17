/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'

interface Props {

}

const UserFullDetail: React.FC<Props> = (props) => {
  const { } = props
  const { detail } = useAppSelector(state => state.tracking)

  const renderStartEndDate = useCallback((startDate: string, endDate: string) => {
    const arr = [
      dayjs(startDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      dayjs(endDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
    ]
    return arr.join(' - ')
  }, [])

  const renderLatLng = useCallback((postition: string, province: string) => {
    const arr = [
      postition,
      province
    ]
    return arr.join(' ')
  }, [])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: detail.business_detail.business_name.business_name || '-',
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: detail.business_detail.business_name.entity_type || '-',
    },
    {
      key: '3',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: detail.business_detail.business_name.contact_name || '-',
    },
  ];

  const route: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อโครงการ',
      children: detail.business_detail.road_details.project_name || '-',
    },
    {
      key: '2',
      label: 'ประเภทการขออนุญาต',
      children: detail.business_detail.road_details.request_type || '-',
    },
    {
      key: '3',
      label: 'วันที่เริ่มต้น - สิ้นสุดสัญญา',
      children: renderStartEndDate(detail.business_detail.road_details.start_date, detail.business_detail.road_details.end_date) || '-',
    },
    {
      key: '4',
      label: 'ขนส่งจาก',
      children: renderLatLng(detail.business_detail.road_details.start_point, detail.business_detail.road_details.start_province) || '-',
    },
    {
      key: '5',
      label: 'ไปยัง',
      children: renderLatLng(detail.business_detail.road_details.end_point, detail.business_detail.road_details.end_province) || '-',
    },
  ];

  return (
    <div className='mb-5 border-2 px-5 py-3 rounded-md'>
      <section>
        <Descriptions
          title="ข้อมูลผู้ประกอบการ"
          items={items}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลเส้นทาง"
          items={route}
          column={1}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(UserFullDetail)
