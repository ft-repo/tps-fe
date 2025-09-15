/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { Control, useFieldArray, UseFormSetValue } from 'react-hook-form'
import { FieldTypeArr } from '@/@types/entrepreneur/route-estimation'
import FormVehicle from './FormVehicle';
import { useRouteContext } from '../../../context';

interface Props {
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
}

type TabItem = NonNullable<TabsProps['items']>[number]
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ContentTab: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { fields, append, remove } = useFieldArray({ control, name: 'route_form' })
  const { dataParser } = useRouteContext()
  // DECLARE INIT STATE
  const initTabItems: TabItem[] = dataParser.req_data.vehicle.length ?
    dataParser.req_data.vehicle.map((item, index) => {
      return {
        key: String(index),
        label: `รถคู่ที่ ${index + 1}`,
        children: (
          <FormVehicle
            formItem={fields[index]}
            formIndex={index}
            control={control}
            setValue={setValue}
          />
        ),
        closable: index === 0 ? false : true,
      }
    })
    : [
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
    append({
      "match_type": null,
      "turn_radius": "",
      "towering_vehicle": null,
      "semi_trailer_vehicle": null,
      "etc_vehicle": null,
      "towering_weight1": 0,
      "towering_weight2": 0,
      "towering_weight3": 0,
      "towering_weight4": 0,
      "towering_weight5": 0,
      "towering_weight6": 0,
      "towering_weight7": 0,
      "semi_weight1": 0,
      "semi_weight2": 0,
      "semi_weight3": 0,
      "semi_weight4": 0,
      "semi_weight5": 0,
      "semi_weight6": 0,
      "semi_weight7": 0,
    })
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
      // const MAX_TABS = 1;
      // if (tabItems.length >= MAX_TABS) {
      //   return; // Don't add if limit reached
      // }
      onAdd()
    } else {
      onRemove(targetKey)
    }
  }, [onAdd, onRemove])

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
