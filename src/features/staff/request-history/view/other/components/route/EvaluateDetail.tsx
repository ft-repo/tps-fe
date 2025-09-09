/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { useAppSelector } from '@/store'
import dayjs from 'dayjs'

interface Props {

}

const PetitionDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_status } = useAppSelector(state => state.staff.petition)

  const renderName = useCallback((title: string, firstName: string, lastName: string) => {
    const nameArr = [title, firstName, lastName]
    if (!nameArr.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'สถานะการตรวจ',
      children: <p className={petition_status[1]?.is_approved ? 'text-green-500' : 'text-red-500'}>{petition_status[1]?.is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ'}</p>,
    },
    {
      key: '2',
      label: 'วันที่ตรวจสอบ',
      children: <p>{dayjs(petition_status[1]?.created_at).format('DD/MM/YYYY') || '-'}</p>,
    },
    {
      key: '3',
      label: 'ตรวจสอบโดย',
      children: <p>{renderName(petition_status[1]?.admin_creaded?.title, petition_status[1]?.admin_creaded?.first_name, petition_status[1]?.admin_creaded?.last_name)}</p>,
    },
    {
      key: '4',
      label: 'หมายเหตุ',
      children: <p>{petition_status[1]?.remark || '-'}</p>,
    },
  ]

  return (
    <Descriptions
      title="ผลการตรวจสอบ"
      items={items}
      column={1}
      layout='vertical'
      size='small'
    />
  )
}

export default React.memo<Props>(PetitionDetail)
