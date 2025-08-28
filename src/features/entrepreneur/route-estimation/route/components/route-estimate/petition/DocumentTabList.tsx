/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { FormPermitDocument } from '../../../components'
import { useRouteContext } from '../../../context'
import { Control, UseFormSetValue } from 'react-hook-form'
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list'

interface Props {
  control: Control<FieldTypePetition>;
  setValue: UseFormSetValue<FieldTypePetition>;
}

const ContentTab: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { dataParser } = useRouteContext()
  const [tabKey, setTabKey] = useState<string>('1')

  const items: TabsProps['items'] = dataParser.res_data.estimate?.map((item, index) => {
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
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(ContentTab)
