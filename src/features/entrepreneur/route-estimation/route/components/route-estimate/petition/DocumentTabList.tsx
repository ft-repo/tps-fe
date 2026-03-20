/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { FormPermitDocument } from '../../../components'
import { useRouteContext } from '../../../context'
import { Control, UseFormSetValue } from 'react-hook-form'
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list'
import { useAppSelector } from '@/store'
import FormEditPermitDocument from './FormEditPermitDocument'
import { useLocation } from 'react-router-dom'

interface Props {
  control: Control<FieldTypePetition>;
  setValue: UseFormSetValue<FieldTypePetition>;
}

const ContentTab: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { dataParser } = useRouteContext()
  const [tabKey, setTabKey] = useState<string>('1')
  const { petition_detail } = useAppSelector(state => state.entrepreneur.permitList)
  const location = useLocation();
  // GET STATE
  const { state } = location;

  const items: TabsProps['items'] = state?.petition_id ?
    petition_detail.vehicle.vehicle_list.map((item, index) => {
      return {
        key: String(index + 1),
        label: `รถคู่ที่ ${index + 1}`,
        children: (
          <FormEditPermitDocument
            item={item}
            index={index}
            control={control}
            setValue={setValue}
          />
        )
      }
    })
    : dataParser.res_data.estimate?.map((item, index) => {
      return {
        key: String(index + 1),
        label: `รถคู่ที่ ${index + 1}`,
        children: (
          <FormPermitDocument
            item={item}
            index={index}
            control={control}
            setValue={setValue}
          />
        )
      }
    })

  return (
    <Tabs
      destroyOnHidden
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(ContentTab)
