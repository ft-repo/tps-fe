/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Estimate } from '@/store/slices/staff/trackingSlice'
import { Descriptions, DescriptionsProps } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useViewContext } from '../context';

interface Props {
  item: Estimate;
  index: number;
}

const VehicleDetail: React.FC<Props> = (props) => {
  const { item, index } = props
  const { setItem, setIndex } = useViewContext()
  console.log("theitem", item)
  useEffect(() => {
    setItem(item)
    setIndex(index)
  }, [item, index, setItem, setIndex])

  const renderVehiclePlate = useCallback((plate: string, province: string) => {
    const arr = [
      plate,
      province
    ]
    return arr.join(' ')
  }, [])

  const findType = useMemo(() => {
    if (item?.towing_vehicle && item?.semi_trailer_vehicle && item?.etc_vehicle) {
      return 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร'
    }
    if (item?.towing_vehicle && item?.semi_trailer_vehicle) {
      return 'รถลากจูง + รถกึ่งพ่วง'
    }
    if (item?.etc_vehicle) {
      return 'สินค้า / เครื่องจักร'
    }
  }, [item])


  const vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ประเภทจับคู่',
      children: findType || '-',
    },
    {
      key: '2',
      label: 'รัศมีเลี้ยว',
      children: item?.turn_radius || 0,
    },
    {
      key: '3',
      label: 'น้ำหนักรถเปล่า (กิโลกรัม)',
      children: <p>{Number(item?.towing_vehicle?.weight || 0) + Number(item?.semi_trailer_vehicle?.weight || 0)}</p>,
    },
    {
      key: '4',
      label: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา (กิโลกรัม)',
      children: <p>{Number(item?.towing_vehicle?.weight || 0) + Number(item?.semi_trailer_vehicle?.weight || 0) + Number(item?.towing_axis_weight[0] || 0) + Number(item?.towing_axis_weight[1] || 0) + Number(item?.towing_axis_weight[2] || 0) + Number(item?.semi_trailer_axis_weight[0] || 0) + Number(item?.semi_trailer_axis_weight[1] || 0) + Number(item?.semi_trailer_axis_weight[2] || 0)}</p>,
    },
    {
      key: '5',
      label: 'มิติรถเปล่า (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0))} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0))} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0))}`}</p>,
    },
    {
      key: '6',
      label: 'มิติรถเปล่ารวมสินค้าเครื่องจักร (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0), Number(item?.etc_vehicle?.width || 0))} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0), Number(item?.etc_vehicle?.length || 0))} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0), Number(item?.etc_vehicle?.height || 0))}`}</p>,
    },
  ];

  const towing: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: renderVehiclePlate(item?.towing_vehicle?.plate_no, item?.towing_vehicle?.plate_province) || '-',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: item?.towing_vehicle?.weight || 0,
    },
  ];

  const semi: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: renderVehiclePlate(item?.semi_trailer_vehicle?.plate_no, item?.semi_trailer_vehicle?.plate_province) || '-',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: item?.semi_trailer_vehicle?.weight || 0,
    },
  ];

  const product: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: renderVehiclePlate(item?.etc_vehicle?.plate_no, item?.etc_vehicle?.plate_province) || '-',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: item?.etc_vehicle?.weight || 0,
    },
  ];

  return (
    <div className='mb-5'>
      <section>
        <Descriptions
          title="ข้อมูลยานพาหนะ"
          items={vehicle}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถลากจูง"
          items={towing}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถกึ่งพ่วง 4 เพลา 8"
          items={semi}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลเครื่องจักร"
          items={product}
          column={1}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(VehicleDetail)
