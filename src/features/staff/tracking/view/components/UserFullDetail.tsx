/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const UserFullDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: 'ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด',
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
    },
    {
      key: '3',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: 'ชญานิษฐ์ พงศ์เกษมชัย',
    },
  ];

  const route: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อโครงการ',
      children: 'โครงการระบบโลจิสติกส์เพื่อการเคลื่อนย้ายเครื่องจักรกลหนัก',
    },
    {
      key: '2',
      label: 'ประเภทการขออนุญาต',
      children: 'รถหมวด 2 ( 4 - 7 เพลา ) ',
    },
    {
      key: '3',
      label: 'วันที่เริ่มต้น - สิ้นสุดสัญญา',
      children: '01 มี.ค. 64 - 01 มี.ค. 65',
    },
    {
      key: '4',
      label: 'ขนส่งจาก',
      children: '18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา',
    },
    {
      key: '5',
      label: 'ไปยัง',
      children: '12.6814, 101.2775 จังหวัดระยอง',
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
