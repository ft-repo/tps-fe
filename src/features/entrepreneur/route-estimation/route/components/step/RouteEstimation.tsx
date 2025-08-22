import { Root, VehicleId } from '@/@types/entrepreneur/route-estimation'
import { Tabs, Button, Divider } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import { useCallback, useState, memo, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormRouteEstimation from '../route-estimate/initial/FormRouteEstimation'
import MapRouteEstimation from '../route-estimate/initial/MapRouteEstimation'
import FormMapEstimation from '../route-estimate/initial/FormMapEstimation'
import DetailSection from '../route-estimate/initial/DetailSection'
import { getVehicleDetailForRouteEstimation } from '@/store/slices/entrepreneur/vehicleListSlice'
import { useAppDispatch } from '@/store'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabItem {
  label: string
  children: React.ReactNode
  key: string
  closable?: boolean
}

const defaultValues: Root = {
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
    type: '',
    coordinates: ['', ''],
  },
  end_point: {
    type: '',
    coordinates: ['', ''],
  },
  vehicle_route: {
    type: '',
    coordinates: [],
  },
}

function RouteEstimation() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<Root>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicle',
  })

  const [firstPoint, setFirstPoint] = useState<number[] | null>(null)
  const [secondPoint, setSecondPoint] = useState<number[] | null>(null)
  const [vehicleId, setVehicleId] = useState<VehicleId>({
    towing_vehicle_id: undefined,
    semi_trailer_vehicle_id: undefined,
    etc_vehicle_id: undefined,
  })
  const initialTabItems: TabItem[] = [
    {
      label: 'รถคู่ที่ 1',
      children: (
        <FormRouteEstimation
          formItem={fields[0]}
          formIndex={0}
          control={control}
          setVehicleId={setVehicleId}
        />
      ),
      key: '1',
      closable: false,
    },
  ]
  const [activeKey, setActiveKey] = useState(initialTabItems[0].key)
  const [tabItems, setTabItems] = useState<TabItem[]>(initialTabItems)

  useEffect(() => {
    console.log('vehicleId ======> ', vehicleId)
    dispatch(getVehicleDetailForRouteEstimation(vehicleId))
  }, [vehicleId, dispatch])

  const onAddedTab = useCallback(() => {
    append(defaultValues.vehicle[0])

    const newTabItem: TabItem = {
      label: `รถคู่ที่ ${tabItems.length + 1}`,
      children: (
        <FormRouteEstimation
          formItem={fields[tabItems.length]}
          formIndex={tabItems.length}
          control={control}
          setVehicleId={setVehicleId}
        />
      ),
      key: `${tabItems.length + 1}`,
    }

    setTabItems([...tabItems, newTabItem])
  }, [tabItems, setTabItems, append, fields, control, vehicleId, setVehicleId])

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

  const onSubmit = useCallback((values: Root) => {
    console.log('values ======> ', values)
    alert(JSON.stringify(values))
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="w-full grid lg:grid-cols-3 gap-4 mb-5">
        <div className="w-full col-span-2">
          <div className="lg:min-h-[50vh] mb-5">
            <Tabs
              type="editable-card"
              items={tabItems}
              activeKey={activeKey}
              tabBarExtraContent={
                <Button
                  type="primary"
                  variant="solid"
                  color="gold"
                  className="text-black"
                  size="middle"
                  onClick={() => navigate('/route-estimation/other')}
                >
                  ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)
                </Button>
              }
              onEdit={onTabsEdit}
              onChange={onTabsChange}
            />
          </div>
          <FormMapEstimation
            control={control}
            setFirstPoint={setFirstPoint}
            setSecondPoint={setSecondPoint}
          />
        </div>
        <div className="col-span-1 order-first lg:order-last z-0 h-[50vh]">
          <MapRouteEstimation
          // firstPoint={firstPoint}
          // secondPoint={secondPoint}
          />
        </div>
      </section>
      {(vehicleId.towing_vehicle_id ||
        vehicleId.semi_trailer_vehicle_id ||
        vehicleId.etc_vehicle_id) && (
        <>
          <h4 className="text-lg font-bold m-0 p-0">
            รายละเอียด {tabItems[Number(activeKey) - 1].label}
          </h4>
          <Divider className="mb-3" />
          <DetailSection />
        </>
      )}

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
