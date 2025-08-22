/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'

interface Props {

}

const EvaluateDetail: React.FC<Props> = (props) => {
  const { } = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'สถานะการตรวจ',
      children: <p className='text-green-500'>ผ่านการตรวจ</p>,
    },
    {
      key: '2',
      label: 'วันที่ตรวจสอบ',
      children: <p>วันที่ตรวจสอบ 22 ก.พ. 64</p>,
    },
    {
      key: '3',
      label: 'ตรวจสอบโดย',
      children: <p>นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)</p>,
    },
  ]

  return (
    <Descriptions
      title="ผลการตรวจสอบ"
      items={items}
      column={1}
    />
  )
}

export default React.memo<Props>(EvaluateDetail)
