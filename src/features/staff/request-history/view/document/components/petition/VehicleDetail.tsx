/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import React, { useCallback } from 'react'

interface Props {

}

const VehicleDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const renderAxisWeight = useCallback((arr: number[]) => {
    return arr.join(' : ')
  }, [])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ลักษณะ / มาตราฐาน',
      children: <p>{detail.vehicle.characteristic || '-'}</p>,
    },
    {
      key: '2',
      label: 'ประเภท',
      children: <p>{detail.vehicle.type || '-'}</p>,
    },
    {
      key: '3',
      label: 'เลขทะเบียน',
      children: <p>{detail.vehicle.plate_no || '-'}</p>,
    },
    {
      key: '4',
      label: 'จังหวัด',
      children: <p>{detail.vehicle.plate_province || '-'}</p>,
    },
    {
      key: '5',
      label: 'สี',
      children: <p>{detail.vehicle.color || '-'}</p>,
    },
    {
      key: '6',
      label: 'จำนวนเพลา',
      children: <p>{detail.vehicle.axis_number || '-'}</p>,
    },
    {
      key: '7',
      label: 'น้ำหนักรวม (กิโลกรัม)',
      children: <p>{detail.vehicle.weight || '-'}</p>,
    },
    {
      key: '8',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>{renderAxisWeight(detail.vehicle.axis_weight)}</p>,
    },
  ]

  return (
    <Descriptions
      title="ข้อมูลยานพาหนะ"
      items={items}
      column={1}
    />
  )
}

export default React.memo<Props>(VehicleDetail)
