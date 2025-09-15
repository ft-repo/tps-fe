/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { Control, useFieldArray, UseFormSetValue } from 'react-hook-form'
import { FieldTypeArr } from '@/@types/entrepreneur/route-estimation'
import FormVehicle from './FormVehicle';

interface Props {
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
}

type TabItem = NonNullable<TabsProps['items']>[number]
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ContentTab: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { fields, append, remove } = useFieldArray({ control, name: 'route_form' })
  // DECLARE INIT STATE
  const initTabItems: TabItem[] = [
    {
      key: '1',
      label: 'รถคู่ที่ 1',
      children: (
        <FormVehicle
          formItem={fields[0]}
          formIndex={0}
          control={control}
          setValue={setValue}
        />
      ),
      closable: false,
    },
  ]
  // DECLARE STATE
  const [tabKey, setTabKey] = useState(initTabItems[0].key)
  const [tabItems, setTabItems] = useState<TabItem[]>(initTabItems)

  const onAdd = useCallback(() => {
    // APEND FIELD
    append(fields[0])
    // APPEND TAB
    const newTabItem: TabsProps['items'] = [
      {
        key: `${tabItems.length + 1}`,
        label: `รถคู่ที่ ${tabItems.length + 1}`,
        children: (
          <FormVehicle
            formItem={fields[tabItems.length]}
            formIndex={tabItems.length}
            control={control}
            setValue={setValue}
          />
        ),
      }
    ]
    // SET TAB
    setTabItems([...tabItems, ...newTabItem])
  }, [tabItems, setTabItems, append, fields, control, setValue])

  const onRemove = useCallback((targetKey: TargetKey) => {
    const newTabItems = tabItems.filter((item, index) => {
      if (item.key === targetKey) {
        remove(index)
        return false
      }
      return true
    })

    const reorderTabItems = newTabItems.map((item, index) => ({
      ...item,
      label: `รถคู่ที่ ${index + 1}`,
      key: `${index + 1}`,
    }))

    setTabItems(reorderTabItems)
  }, [tabItems, setTabItems, remove])

  const onEdit = useCallback((targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const MAX_TABS = 1;
      if (tabItems.length >= MAX_TABS) {
        return; // Don't add if limit reached
      }
      onAdd()
    } else {
      onRemove(targetKey)
    }
  }, [onAdd, onRemove, tabItems])

  const onChange = useCallback((newActiveKey: string) => {
    setTabKey(newActiveKey)
  }, [setTabKey])

  return (
    <Tabs
      type="editable-card"
      defaultActiveKey={tabKey}
      items={tabItems}
      onChange={(tabKey) => onChange(tabKey)}
      onEdit={(tabKey, action) => onEdit(tabKey, action)}
    />
  )
}

export default React.memo<Props>(ContentTab)
