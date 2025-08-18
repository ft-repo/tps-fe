/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const VehicleDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ลักษณะ / มาตราฐาน',
      children: <p>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</p>,
    },
    {
      key: '2',
      label: 'ประเภท',
      children: <p>รถลากจูง + รถกึ่งพ่วง</p>,
    },
    {
      key: '3',
      label: 'เลขทะเบียน',
      children: <p>22 - 1144</p>,
    },
    {
      key: '4',
      label: 'จังหวัด',
      children: <p>สระบุรี</p>,
    },
    {
      key: '5',
      label: 'สี',
      children: <p>น้ำเงิน</p>,
    },
    {
      key: '6',
      label: 'จำนวนเพลา',
      children: <p>4</p>,
    },
    {
      key: '7',
      label: 'น้ำหนักรวม (กิโลกรัม)',
      children: <p>36,200</p>,
    },
    {
      key: '8',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>9000 : 9000 : 9000 : 9200</p>,
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
