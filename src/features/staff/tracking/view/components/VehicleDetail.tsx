/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Estimate, ETCVehicle } from '@/store/slices/staff/trackingSlice'
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

  // Add this helper function
  const getMaxEtcDimensions = useCallback(() => {
    if (!item?.etc_vehicle || item.etc_vehicle.length === 0) {
      return { width: 0, length: 0, height: 0 };
    }

    return item.etc_vehicle.reduce((max, etc) => {
      return {
        width: Math.max(max.width, Number(etc?.width || 0)),
        length: Math.max(max.length, Number(etc?.length || 0)),
        height: Math.max(max.height, Number(etc?.height || 0))
      };
    }, { width: 0, length: 0, height: 0 });
  }, [item?.etc_vehicle]);

  // Calculate dimensions once
  const etcDimensions = useMemo(() => getMaxEtcDimensions(), [getMaxEtcDimensions]);

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
      // children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0), Number(item?.etc_vehicle?.width || 0))} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0), Number(item?.etc_vehicle?.length || 0))} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0), Number(item?.etc_vehicle?.height || 0))}`}</p>,
      children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0), etcDimensions.width)} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0), etcDimensions.length)} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0), etcDimensions.height)}`}</p>,
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

  const renderETC = useCallback((value: ETCVehicle[]) => {
    const arr = []
    if (value.length) {
      for (const etc_id of value) {
        console.log("===", etc_id)
        arr.push(etc_id)
      }
    }
    if (arr.length) {
      return arr.map((item, index) => {
        console.log("===", item)
        // DESCRIPTION
        const product: DescriptionsProps['items'] = [
          {
            key: '1',
            label: 'ชื่อเครื่องจักร / สินค้า',
            children: item?.plate_no || '-',
          },
          {
            key: '2',
            label: 'น้ำหนัก (กิโลกรัม)',
            children: item?.weight || 0,
          },
        ];
        // COMPONENTS
        return (
          <section key={index} className='mt-3'>
            <Descriptions
              title="ข้อมูลเครื่องจักร"
              items={product}
              column={1}
            />
          </section>
        )
      })
    }
  }, [])

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
      {renderETC(item.etc_vehicle)}
    </div>
  )
}

export default React.memo<Props>(VehicleDetail)
