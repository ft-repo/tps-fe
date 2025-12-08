/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo } from 'react'
import { Descriptions, DescriptionsProps, message } from 'antd'
import { VehicleList } from '@/@types/reducer/petition';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch } from '@/store';

interface Props {
  item: VehicleList;
}

const ContentDetail: React.FC<Props> = (props) => {
  const { item } = props
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        window.open(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

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

  const vehicle_detail: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ประเภทจับคู่',
      children: <p>{item?.match_type || '-'}</p>,
    },
    {
      key: '2',
      label: 'รัศมีเลี้ยว',
      children: <p>{item?.turn_radius || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักรถเปล่า (กิโลกรัม)',
      children: <p>{Number(item?.towing_vehicle?.weight || 0) + Number(item?.semi_trailer_vehicle?.weight || 0)}</p>,
    },
    {
      key: '4',
      label: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา (กิโลกรัม)',
      children: <p>{Number(item?.towing_vehicle?.weight || 0) + Number(item?.semi_trailer_vehicle?.weight || 0) + Number(item?.towing_vehicle?.axis_weight[0] || 0) + Number(item?.towing_vehicle?.axis_weight[1] || 0) + Number(item?.towing_vehicle?.axis_weight[2] || 0) + Number(item?.semi_trailer_vehicle?.axis_weight[0] || 0) + Number(item?.semi_trailer_vehicle?.axis_weight[1] || 0) + Number(item?.semi_trailer_vehicle?.axis_weight[2] || 0)}</p>,
    },
    {
      key: '5',
      label: 'มิติรถเปล่า (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0))} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0))} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0))}`}</p>,
    },
    {
      key: '6',
      label: 'มิติรถเปล่ารวมสินค้า เครื่องจักร (เมตร)',
      children: <p>{`กว้าง ${Math.max(Number(item?.towing_vehicle?.width || 0), Number(item?.semi_trailer_vehicle?.width || 0), Number(etcDimensions?.width || 0))} X ยาว ${Math.max(Number(item?.towing_vehicle?.length || 0), Number(item?.semi_trailer_vehicle?.length || 0), Number(etcDimensions?.length || 0))} X สูง ${Math.max(Number(item?.towing_vehicle?.height || 0), Number(item?.semi_trailer_vehicle?.height || 0), Number(etcDimensions?.height || 0))}`}</p>,
    },
    {
      key: '7',
      label: 'เอกสารขออนุญาตจาก ทช.',
      children: item?.rural_highway_dept_permit_url ? (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(extractUrl(item?.rural_highway_dept_permit_url))}
        />
      ) : '-',
    },
  ];

  return (
    <Descriptions
      title={`ข้อมูลยานพาหนะ (รถ${item?.sort || 'คู่ที่ 1'})`}
      items={vehicle_detail}
      column={1}
      layout='vertical'
      size='small'
    />
  )
}

export default React.memo<Props>(ContentDetail)
