/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: <p>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</p>,
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: <p>ห้างหุ้นส่วนสามัญนิติบุคคล</p>,
    },
    {
      key: '3',
      label: 'ที่อยู่บริษัท',
      children: <p>บ้านเลขที่ 99/1 หมู่ที่ 5 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p>,
    },
    {
      key: '4',
      label: 'เลขทะเบียนนิติบุคคล',
      children: <p>0105557001234</p>,
    },
    {
      key: '5',
      label: 'เบอร์โทรสำนักงาน',
      children: <p>02-123-4567</p>,
    },
    {
      key: '6',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: <p>ชญานิษฐ์ พงศ์เกษมชัย</p>,
    },
    {
      key: '7',
      label: 'เบอร์โทรศัพท์',
      children: <p>094-2223344</p>,
    },
    {
      key: '8',
      label: 'ชื่อโครงการ',
      children: <p>โครงการระบบโลจิสติกส์เพื่อการเคลื่อนย้ายเครื่องจักรกลหนัก</p>,
    },
    {
      key: '9',
      label: 'ประเภทการขออนุญาต',
      children: <p>รถหมวด 2 ( 4 - 7 เพลา )</p>,
    },
    {
      key: '10',
      label: 'วันที่เริ่มต้น',
      children: <p>01 มี.ค. 64</p>,
    },
    {
      key: '11',
      label: 'วันที่สิ้นสุด',
      children: <p>01 มี.ค. 65</p>,
    },
    {
      key: '12',
      label: 'ขนส่งจาก',
      children: <p>18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา</p>,
    },
    {
      key: '13',
      label: 'ไปยัง',
      children: <p>12.6814, 101.2775 จังหวัดระยอง</p>,
    },
  ];

  return (
    <Descriptions
      title="ข้อมูลผู้ประสงค์ขออนุญาต"
      items={items}
      column={1}
    />
  )
}

export default React.memo<Props>(ContentDetail)
