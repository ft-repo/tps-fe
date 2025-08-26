/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Root, SummaryData, VehicleData } from '@/@types/entrepreneur/route-estimation'
import { Tabs, Button, Divider } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormRouteEstimation from '../route-estimate/initial/FormRouteEstimation'
import MapRouteEstimation from '../route-estimate/initial/MapRouteEstimation'
import FormMapEstimation from '../route-estimate/initial/FormMapEstimation'
import { postRouteEstimationStep1API } from '@/services/entrepreneur/RouteEstimationService'
import { setLoading } from '@/store'
import { useAppDispatch } from '@/store/hook'
import { Notification, toast } from '@/components/ui'
import { useRouteContext } from '../../context'
import { MOCK_VEHICLE_ROUTE } from '../../mock'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabItem {
  label: string
  children: React.ReactNode
  key: string
  closable?: boolean
}

interface Props { }

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

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props;
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<Root>({
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
    console.log('values ======> ', values)
    // INIT LOADING
    dispatch(setLoading(true))
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
      vehicle_route: MOCK_VEHICLE_ROUTE,
    }
    console.log('requestBody ======> ', requestBody)
    try {
      const response = await postRouteEstimationStep1API(requestBody)
      if (response.status === 200) {
        toast.push(
          <Notification
            title={'Success'}
            type={'success'}
            onClose={() => {
              setStep(2)
              setDataParser(data)
            }}
          >
            <p className='break-all'>Successfully submit data</p>
          </Notification>
        )
      } else {
        toast.push(
          <Notification
            title={'Error'}
            type={'danger'}
          >
            <p className='break-all'>Failed to submit data</p>
          </Notification>
        )
      }
    } catch (error) {
      toast.push(
        <Notification
          title={'Error'}
          type={'danger'}
        >
          <p className='break-all'>Failed to submit data</p>
        </Notification>
      )
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, setStep, setDataParser])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={false}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={false}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
          // onClick={() => submitRef.current?.click()}
          >
            ถัดไป
          </Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="w-full grid lg:grid-cols-3 gap-4 mb-5">
          <div className="w-full lg:h-[50vh] col-span-2">
            <Tabs
              type="editable-card"
              items={tabItems}
              activeKey={activeKey}
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
    </main>
  )
}

export default React.memo<Props>(RouteEstimation)
