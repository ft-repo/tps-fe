/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const VehicleDetail: React.FC<Props> = (props) => {
  const { } = props

  const vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ประเภทจับคู่',
      children: 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร',
    },
    {
      key: '2',
      label: 'รัศมีเลี้ยว',
      children: '12',
    },
    {
      key: '3',
      label: 'น้ำหนักรถเปล่า (กิโลกรัม)',
      children: '27,900',
    },
    {
      key: '4',
      label: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา (กิโลกรัม)',
      children: '57,000',
    },
    {
      key: '5',
      label: 'มิติรถเปล่า (เมตร)',
      children: 'กว้าง 3.50 X ยาว 9.00 X สูง 4.30',
    },
    {
      key: '6',
      label: 'มิติรถเปล่ารวมสินค้าเครื่องจักร (เมตร)',
      children: 'กว้าง 3.50 X ยาว 9.00 X สูง 4.96',
    },
  ];

  const towing: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: '22 - 1144 สระบุรี',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: '15,000 ',
    },
  ];

  const semi: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: '83 - 9120 สระบุรี',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: '28,000',
    },
  ];

  const product: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: '68 - 1181 สระบุรี',
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: '35,800',
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
