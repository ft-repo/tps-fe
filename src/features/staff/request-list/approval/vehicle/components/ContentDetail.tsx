/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { VehicleList } from '@/@types/reducer/petition';
import { Descriptions, DescriptionsProps } from 'antd'
import React, { useCallback } from 'react'

interface Props {
  index: number;
  item: VehicleList;
}

const ContentDetail: React.FC<Props> = (props) => {
  const { item } = props

  const renderAxisWeight = useCallback((arr: number[]) => {
    return arr.join(' : ')
  }, [])

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
      children: <p>{Number(item.towing_vehicle.weight || 0) + Number(item.semi_trailer_vehicle.weight || 0)}</p>,
    },
    {
      key: '4',
      label: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา (กิโลกรัม)',
      children: <p>{Number(item.towing_vehicle.weight || 0) + Number(item.semi_trailer_vehicle.weight || 0) + Number(item.towing_vehicle.axis_weight[0]) + Number(item.towing_vehicle.axis_weight[1]) + Number(item.towing_vehicle.axis_weight[2]) + Number(item.semi_trailer_vehicle.axis_weight[0]) + Number(item.semi_trailer_vehicle.axis_weight[1]) + Number(item.semi_trailer_vehicle.axis_weight[2])}</p>,
    },
    {
      key: '5',
      label: 'มิติรถเปล่า (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item.towing_vehicle.width || 0), Number(item.semi_trailer_vehicle.width || 0))} X ยาว ${Math.max(Number(item.towing_vehicle.length || 0), Number(item.semi_trailer_vehicle.length || 0))} X สูง ${Math.max(Number(item.towing_vehicle.height || 0), Number(item.semi_trailer_vehicle.height || 0))}`}</p>,
    },
    {
      key: '6',
      label: 'มิติรถเปล่ารวมสินค้า เครื่องจักร (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item.towing_vehicle.width || 0), Number(item.semi_trailer_vehicle.width || 0), Number(item.etc_vehicle?.width || 0))} X ยาว ${Math.max(Number(item.towing_vehicle.length || 0), Number(item.semi_trailer_vehicle.length || 0), Number(item.etc_vehicle?.length || 0))} X สูง ${Math.max(Number(item.towing_vehicle.height || 0), Number(item.semi_trailer_vehicle.height || 0), Number(item.etc_vehicle?.height || 0))}`}</p>,
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
      children: <p>{renderAxisWeight(item.towing_vehicle.axis_weight)}</p>,
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
      children: <p>{renderAxisWeight(item.semi_trailer_vehicle.axis_weight)}</p>,
    },
  ];

  const etc_vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>{item.etc_vehicle?.plate_no || '-'} {item.etc_vehicle?.plate_province || '-'}</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>{item.etc_vehicle?.weight || '-'}</p>,
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
          items={etc_vehicle}
          column={1}
        />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentDetail)
