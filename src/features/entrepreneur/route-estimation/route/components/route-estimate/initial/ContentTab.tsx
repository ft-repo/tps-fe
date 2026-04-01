/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { Control, useFieldArray, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { FieldTypeArr, FieldTypeForRoute } from '@/@types/entrepreneur/route-estimation'
import FormVehicle from './FormVehicle';
import { useRouteContext } from '../../../context';
import { useAppSelector } from '@/store';
import { useLocation } from 'react-router-dom';

export interface ContentTabHandle {
  switchToTabByIndex: (index: number) => void
}

interface Props {
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
  trigger: UseFormTrigger<FieldTypeArr>;
  errorTabIndices: Set<number>;
}

type TabItem = NonNullable<TabsProps['items']>[number]
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ContentTabInner = forwardRef<ContentTabHandle, Props>((props, ref) => {
  const { control, setValue, trigger, errorTabIndices } = props
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'route_form' })
  const { dataParser } = useRouteContext()
  const { petition_detail } = useAppSelector(state => state.entrepreneur.permitList)
  const { state } = useLocation()

  const isEditMode = !!state?.petition_id
  const hasInitializedFromApiRef = useRef(false)

  // DECLARE INIT STATE
  const initTabItems: TabItem[] = dataParser.req_data.vehicle.length ?
    dataParser.req_data.vehicle.map((item, index) => ({
      key: `init-${index}`,
      label: `รถคู่ที่ ${index + 1}`,
      children: (
        <FormVehicle
          formItem={fields[index]}
          formIndex={index}
          control={control}
          setValue={setValue}
          trigger={trigger}
        />
      ),
      closable: isEditMode ? false : index !== 0,
      forceRender: true,
    }))
    : [
      {
        key: 'init-0',
        label: 'รถคู่ที่ 1',
        children: (
          <FormVehicle
            formItem={fields[0]}
            formIndex={0}
            control={control}
            setValue={setValue}
            trigger={trigger}
          />
        ),
        closable: false,
        forceRender: true,
      },
    ]

  // DECLARE STATE
  const [tabKey, setTabKey] = useState(initTabItems[0].key)
  const [tabItems, setTabItems] = useState<TabItem[]>(initTabItems)

  useImperativeHandle(ref, () => ({
    switchToTabByIndex: (index: number) => {
      const tab = tabItems[index]
      if (tab) setTabKey(String(tab.key))
    }
  }), [tabItems])

  const displayItems = useMemo(() =>
    tabItems.map((item, index) => ({
      ...item,
      label: errorTabIndices.has(index) ? (
        <span className="flex items-center gap-1">
          <span>{`รถคู่ที่ ${index + 1}`}</span>
          <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
        </span>
      ) : `รถคู่ที่ ${index + 1}`,
    }))
  , [tabItems, errorTabIndices])

  // Reset initialization guard when estimate is cleared (e.g. road_map store reset before fetching a new petition)
  useEffect(() => {
    if (!isEditMode) return
    if (petition_detail.road_map.estimate.length === 0) {
      hasInitializedFromApiRef.current = false
    }
  }, [petition_detail.road_map.estimate, isEditMode])

  // Rebuild tabs from petition_detail.road_map.estimate when in edit mode
  useEffect(() => {
    if (!isEditMode) return
    if (hasInitializedFromApiRef.current) return
    if (!petition_detail.road_map.estimate.length) return

    hasInitializedFromApiRef.current = true

    const mappedRouteForm: FieldTypeForRoute[] = petition_detail.road_map.estimate.map((e) => {
      const match_type =
        e.towing_vehicle_id === null || e.towing_vehicle_id === undefined
          ? 3
          : !e.etc_vehicle || e.etc_vehicle.length === 0
            ? 2
            : 1
      return {
        match_type,
        turn_radius: e.turn_radius,
        towering_vehicle: e.towing_vehicle_id ?? null,
        semi_trailer_vehicle: e.semi_trailer_vehicle_id,
        etc_vehicle: e.etc_vehicle ? e.etc_vehicle.map((v) => v.vehicle_id) : [],
        towering_weight1: e.towing_axis_weight[0] ?? 0,
        towering_weight2: e.towing_axis_weight[1] ?? 0,
        towering_weight3: e.towing_axis_weight[2] ?? 0,
        towering_weight4: e.towing_axis_weight[3] ?? 0,
        towering_weight5: e.towing_axis_weight[4] ?? 0,
        towering_weight6: e.towing_axis_weight[5] ?? 0,
        towering_weight7: e.towing_axis_weight[6] ?? 0,
        semi_weight1: e.semi_trailer_axis_weight[0] ?? 0,
        semi_weight2: e.semi_trailer_axis_weight[1] ?? 0,
        semi_weight3: e.semi_trailer_axis_weight[2] ?? 0,
        semi_weight4: e.semi_trailer_axis_weight[3] ?? 0,
        semi_weight5: e.semi_trailer_axis_weight[4] ?? 0,
        semi_weight6: e.semi_trailer_axis_weight[5] ?? 0,
        semi_weight7: e.semi_trailer_axis_weight[6] ?? 0,
      }
    })

    replace(mappedRouteForm)

    const newTabItems: TabItem[] = mappedRouteForm.map((item, index) => ({
      key: `api-${index}`,         // ← unique prefix: never matches any 'init-N' key
      label: `รถคู่ที่ ${index + 1}`,
      children: (
        <FormVehicle
          formItem={item}
          formIndex={index}
          control={control}
          setValue={setValue}
          trigger={trigger}
        />
      ),
      closable: false,
      forceRender: true,
    }))

    setTabItems(newTabItems)
    setTabKey('api-0')
  }, [petition_detail.road_map.estimate, isEditMode, replace, control, setValue, trigger])

  const onAdd = useCallback(() => {
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
    const newTabItem: TabsProps['items'] = [
      {
        key: `new-${tabItems.length}`,
        label: `รถคู่ที่ ${tabItems.length + 1}`,
        children: (
          <FormVehicle
            formItem={fields[tabItems.length]}
            formIndex={tabItems.length}
            control={control}
            setValue={setValue}
            trigger={trigger}
          />
        ),
        closable: true,
        forceRender: true,
      }
    ]
    setTabItems([...tabItems, ...newTabItem])
  }, [tabItems, append, fields, control, setValue, trigger])

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
    }))

    setTabItems(reorderTabItems)
  }, [tabItems, remove])

  const onEdit = useCallback((targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (isEditMode) return
    if (action === 'add') {
      const MAX_TABS = 4;
      if (tabItems.length >= MAX_TABS) return;
      onAdd()
    } else {
      onRemove(targetKey)
    }
  }, [isEditMode, onAdd, onRemove, tabItems])

  const onChange = useCallback((newActiveKey: string) => {
    setTabKey(newActiveKey)
  }, [])

  return (
    <Tabs
      destroyOnHidden
      type="editable-card"
      activeKey={tabKey}
      items={displayItems}
      hideAdd={isEditMode}
      onChange={onChange}
      onEdit={(tabKey, action) => onEdit(tabKey, action)}
    />
  )
})
ContentTabInner.displayName = 'ContentTab'
export default React.memo(ContentTabInner)