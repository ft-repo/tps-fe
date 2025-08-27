import { RouteEstimationRequest } from '@/@types/entrepreneur/route-estimation'
import { Tabs, Button } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import { useCallback, useState, memo } from 'react'
import FormRouteEstimation from '../../../route/components/route-estimate/initial/FormRouteEstimation'
import FormMapEstimation from '../../../route/components/route-estimate/initial/FormMapEstimation'
import { usePublicRouteContext } from '../../context'
import { MapRoute } from '@/components/ui/Maps'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabItem {
  label: string
  children: React.ReactNode
  key: string
  closable?: boolean
}

const defaultValues: RouteEstimationRequest = {
  vehicle: [
    {
      turn_radius: 0,
      towing_vehicle_id: 0,
      semi_trailer_vehicle_id: 0,
      etc_vehicle_id: 0,
      towing_axis_weight: [],
      semi_trailer_axis_weight: [],
    },
  ],
  start_point: {
    type: 'Point',
    coordinates: [0, 0],
  },
  end_point: {
    type: 'Point',
    coordinates: [0, 0],
  },
  vehicle_route: {
    type: 'LineString',
    coordinates: [],
  },
}

function RouteEstimation() {
  const { setStep, setDataParser } = usePublicRouteContext()
  const { control, handleSubmit } = useForm<RouteEstimationRequest>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicle',
  })

  const [firstPoint, setFirstPoint] = useState<[number, number] | null>(null)
  const [secondPoint, setSecondPoint] = useState<[number, number] | null>(null)

  const initialTabItems: TabItem[] = [
    {
      label: 'รถคู่ที่ 1',
      children: (
        <FormRouteEstimation
          formItem={fields[0]}
          formIndex={0}
          control={control}
        />
      ),
      key: '1',
      closable: false,
    },
  ]
  const [activeKey, setActiveKey] = useState(initialTabItems[0].key)
  const [tabItems, setTabItems] = useState<TabItem[]>(initialTabItems)

  const onAddedTab = useCallback(() => {
    append(defaultValues.vehicle[0])

    const newTabItem: TabItem = {
      label: `รถคู่ที่ ${tabItems.length + 1}`,
      children: (
        <FormRouteEstimation
          formItem={fields[tabItems.length]}
          formIndex={tabItems.length}
          control={control}
        />
      ),
      key: `${tabItems.length + 1}`,
    }

    setTabItems([...tabItems, newTabItem])
  }, [tabItems, setTabItems, append, fields, control])

  const onRemovedTab = useCallback(
    (targetKey: TargetKey) => {
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
    },
    [tabItems, setTabItems, remove],
  )

  const onTabsEdit = useCallback(
    (targetKey: TargetKey, action: 'add' | 'remove') => {
      if (action === 'add') {
        onAddedTab()
      } else {
        onRemovedTab(targetKey)
      }
    },
    [onAddedTab, onRemovedTab],
  )

  const onTabsChange = useCallback(
    (newActiveKey: string) => {
      setActiveKey(newActiveKey)
    },
    [setActiveKey],
  )

  const onSubmit = useCallback(async (values: RouteEstimationRequest) => {
    // CREATING REQUEST
    const requestBody: RouteEstimationRequest = {
      ...values,
      vehicle: values.vehicle.map((vehicle) => ({
        ...vehicle,
        towing_vehicle_id: vehicle.towing_vehicle_id === 0 ? null : vehicle.towing_vehicle_id,
        semi_trailer_vehicle_id: vehicle.semi_trailer_vehicle_id === 0 ? null : vehicle.semi_trailer_vehicle_id,
        etc_vehicle_id: vehicle.etc_vehicle_id === 0 ? null : vehicle.etc_vehicle_id,
      })),
      start_point: {
        type: 'Point',
        coordinates: [values.start_point.coordinates[1] as number, values.start_point.coordinates[0] as number],
      },
      end_point: {
        type: 'Point',
        coordinates: [values.end_point.coordinates[1] as number, values.end_point.coordinates[0] as number],
      },
      vehicle_route: {
        type: 'LineString',
        coordinates: [],
      },
    }
    console.log('requestBody ======> ', requestBody)

    // setStep(2)
    // setDataParser(data)
  }, [setStep, setDataParser])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="w-full grid lg:grid-cols-3 gap-4 mb-5">
        <div className="w-full col-span-2">
          <div className="lg:min-h-[50vh] mb-5">
            <Tabs
              type="editable-card"
              items={tabItems}
              activeKey={activeKey}
              onEdit={onTabsEdit}
              onChange={onTabsChange}
            />
          </div>
        </div>
        <div className="w-full col-span-2 lg:col-span-1 gap-4 order-first lg:order-last">
          <div className="z-0 h-[50vh]">
            <MapRoute coordinates={[[100.5018, 13.7563], [102.0977, 14.9799]]} radiuses={[20]} isRouteEstimate={true} isGeometry={true} />
          </div>
          <FormMapEstimation
            control={control}
            setFirstPoint={setFirstPoint}
            setSecondPoint={setSecondPoint}
          />
        </div>
      </section>

      <section className="w-full">
        <div className="flex justify-end items-center gap-5">
          <Button type="primary" variant="solid" size="large" htmlType="submit">
            ประเมินเส้นทาง
          </Button>
        </div>
      </section>
    </form>
  )
}

export default memo(RouteEstimation)
