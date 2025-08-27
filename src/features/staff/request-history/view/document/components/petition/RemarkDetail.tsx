/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import React from 'react'

interface Props {

}

const RemarkDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ข้อที่',
      children: <p>{detail?.ref_form_no || '-'}</p>,
    },
    {
      key: '2',
      label: 'เหตุผลที่ขอ',
      children: <p>{detail?.remark || '-'}</p>,
    },
  ]

  return (
    <Descriptions
      title="เหตุผล"
      items={items}
      column={1}
      layout='vertical'
      size='small'
    />
  )
}

export default React.memo<Props>(RemarkDetail)
