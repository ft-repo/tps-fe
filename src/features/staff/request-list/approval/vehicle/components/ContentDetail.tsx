/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { VehicleList } from '@/@types/reducer/petition';
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {
  index: number;
  item: VehicleList;
}

const ContentDetail: React.FC<Props> = (props) => {
  const { item } = props

  const vehicle_detail: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ประเภทจับคู่',
      children: <p>{item.match_type || '-'}</p>,
    },
    {
      key: '2',
      label: 'รัศมีเลี้ยว',
      children: <p>{item.turn_radius || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักรถเปล่า (กิโลกรัม)',
      children: <p>57,000</p>,
    },
    {
      key: '4',
      label: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา (กิโลกรัม)',
      children: <p>57,000</p>,
    },
    {
      key: '5',
      label: 'มิติรถเปล่า (เมตร)',
      children: <p>กว้าง 3.50 X ยาว 9.00 X สูง 4.30</p>,
    },
    {
      key: '6',
      label: 'มิติรถเปล่ารวมสินค้า เครื่องจักร (เมตร)',
      children: <p>กว้าง 3.50 X ยาว 9.00 X สูง 4.30</p>,
    },
  ];

  const towering_vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>{item.towing_vehicle.plate_no} {item.towing_vehicle.plate_province}</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>{item.towing_vehicle.weight || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>{`${item.towing_vehicle.axis_weight[0] || '-'} : ${item.towing_vehicle.axis_weight[1] || '-'} : ${item.towing_vehicle.axis_weight[2] || '-'}`}</p>,
    },
  ];

  const semi_trailer_vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>{item.semi_trailer_vehicle.plate_no} {item.semi_trailer_vehicle.plate_province}</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>{item.semi_trailer_vehicle.weight || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>{`${item.semi_trailer_vehicle.axis_weight[0] || '-'} : ${item.semi_trailer_vehicle.axis_weight[1] || '-'} : ${item.semi_trailer_vehicle.axis_weight[2] || '-'}`}</p>,
    },
  ];

  const items4: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>22 - 1144 สระบุรี</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>15,000</p>,
    },
  ];

  return (
    <>
      <section>
        <Descriptions
          title="ข้อมูลยานพาหนะ (รถคู่ที่ 1)"
          items={vehicle_detail}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถลากจูง"
          items={towering_vehicle}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถกึ่งพ่วง 4 เพลา 8"
          items={semi_trailer_vehicle}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลเครื่องจักร"
          items={items4}
          column={1}
        />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentDetail)
