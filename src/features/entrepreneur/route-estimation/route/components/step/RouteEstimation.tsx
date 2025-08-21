import { Root, SummaryData, VehicleData } from '@/@types/entrepreneur/route-estimation'
import { Tabs, Button, Divider } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import { useCallback, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import FormRouteEstimation from '../route-estimate/initial/FormRouteEstimation'
import MapRouteEstimation from '../route-estimate/initial/MapRouteEstimation'
import CardVehicleDetails from '../route-estimate/initial/CardVehicleDetails'
import VehicleSummary from '../route-estimate/initial/VehicleSummary'

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
    coordinates: [],
  },
  end_point: {
    type: '',
    coordinates: [],
  },
  vehicle_route: {
    type: '',
    coordinates: [],
  },
}

const vehicleData: VehicleData[] = [
  {
    title: 'รถลากจูง',
    weight: 0,
    plate_no: '',
    image: '',
  },
  {
    title: 'รถกึ่งพ่วง',
    weight: 0,
    plate_no: '',
    image: '',
  },
  {
    title: 'เครื่องจักร',
    weight: 0,
    plate_no: '',
    image: '',
  },
]

const summaryData: SummaryData[] = [
  {
    title: 'น้ำหนักรถเปล่ารวม',
    description: String(0) + ' กก.',
  },
  {
    title: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา',
    description: String(0) + ' กก.',
  },
  {
    title: 'มิติรถเปล่า',
    description: `กว้าง 0 X ยาว 0 X สูง 0`,
  },
  {
    title: 'มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.)',
    description: `กว้าง 0 X ยาว 0 X สูง 0`,
  },
]

function RouteEstimation() {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<Root>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicle',
  })

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

  const onSubmit = useCallback((values: Root) => {
    console.log('values ======> ', values)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="w-full grid lg:grid-cols-3 gap-4 mb-5">
        <div className="w-full lg:h-[50vh] col-span-2">
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
        <div className="col-span-1 order-first lg:order-last z-0 h-[50vh]">
          <MapRouteEstimation
          // firstPoint={firstPoint}
          // secondPoint={secondPoint}
          />
        </div>
      </section>
      <h4 className="text-lg font-bold m-0 p-0">
        รายละเอียด {tabItems[Number(activeKey) - 1].label}
      </h4>
      <Divider className="mb-3" />
      <section className="mt-5 grid lg:grid-cols-2 gap-4 lg:h-[25vh]">
        <section className="lg:order-last">
          <VehicleSummary data={summaryData} />
        </section>
        <section>
          <CardVehicleDetails data={vehicleData} />
        </section>
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
