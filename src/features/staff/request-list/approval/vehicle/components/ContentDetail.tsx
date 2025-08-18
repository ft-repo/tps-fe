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
      label: 'ประเภทจับคู่',
      children: <p>รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร</p>,
    },
    {
      key: '2',
      label: 'รัศมีเลี้ยว',
      children: <p>12</p>,
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

  const items2: DescriptionsProps['items'] = [
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
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>5000 : 5000 : 5000</p>,
    },
  ];

  const items3: DescriptionsProps['items'] = [
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
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>5000 : 5000 : 5000 : 5000</p>,
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
          items={items}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถลากจูง"
          items={items2}
          column={1}
        />
      </section>
      <section className='mt-3'>
        <Descriptions
          title="ข้อมูลรถกึ่งพ่วง 4 เพลา 8"
          items={items3}
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
