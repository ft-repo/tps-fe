import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Control, Controller } from 'react-hook-form'
import {
  FieldType,
  FieldArray,
  SummaryData,
  VehicleData,
} from '@/@types/entrepreneur/route-estimation'
import CardVehicleDetails from '../CardVehicleDetails'
import VehicleSummary from '../VehicleSummary'
import { useAppDispatch, useAppSelector } from '@/store'
import { Input, Select, Spin } from 'antd'
import {
  clearVehicleList,
  getVehicleDetail,
  getVehicleData,
} from '@/store/slices/entrepreneur/vehicleListSlice'
import RecoveryVehicleForm from './RecoveryVehicleForm'
import SemiTrailerForm from './SemiTrailerForm'
import MechanicalVehicleForm from './MechanicalVehicleForm'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'

interface Props {
  formItem: FieldArray
  formIndex: number
  control: Control<FieldType>
  setFirstPoint?: (point: [number, number]) => void
  setSecondPoint?: (point: [number, number]) => void
}

const FormRouteEstimation: FC<Props> = (props) => {
  const { formItem, formIndex, control, setFirstPoint, setSecondPoint } = props
  const dispatch = useAppDispatch()
  const { vehicle_type } = useAppSelector((state) => state.master)
  const { overview, detail, loading } = useAppSelector(
    (state) => state.entrepreneur.vehicleList,
  )
  const firstPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const secondPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [vehicleType, setVehicleType] = useState<number>(0)
  const [vehicleId, setVehicleId] = useState<string | null>(null)
  const [summaryData, setSummaryData] = useState<SummaryData[]>([])
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([])

  console.log(formItem)
  console.log('main ====> detail', detail)

  useEffect(() => {
    dispatch(clearVehicleList())
    if (vehicleType !== 0) {
      dispatch(
        getVehicleData({
          vehicle_type_id: vehicleType,
          page: 1,
          limit: 1000,
        }),
      )
    }
    if (vehicleId) {
      dispatch(getVehicleDetail(vehicleId))
    }
  }, [dispatch, vehicleType, vehicleId])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (firstPointTimeoutRef.current) {
        clearTimeout(firstPointTimeoutRef.current)
      }
      if (secondPointTimeoutRef.current) {
        clearTimeout(secondPointTimeoutRef.current)
      }
    }
  }, [])

  const renderVehicleType = useMemo(() => {
    {
      switch (vehicleType) {
        case 1:
          return (
            <RecoveryVehicleForm
              formIndex={formIndex}
              control={control}
              vehicleList={overview}
              setVehicleId={setVehicleId}
            />
          )
        case 2:
          return (
            <SemiTrailerForm
              formIndex={formIndex}
              control={control}
              vehicleList={overview}
              setVehicleId={setVehicleId}
            />
          )
        case 3:
          return (
            <MechanicalVehicleForm
              formIndex={formIndex}
              control={control}
              vehicleList={overview}
              setVehicleId={setVehicleId}
            />
          )
        default:
          return null
      }
    }
  }, [vehicleType, formIndex, control, overview, setVehicleId])

  const buildSummaryData = useCallback(async () => {
    const getImageUrl = async (url: string) => {
      const fileName = url.split('/').slice(-2).join('/')
      const response = await getUploadAPI(fileName)
      if (response.status === 200 && response.data) {
        const blob = new Blob([response.data], { type: 'image/*' })
        const previewUrl = URL.createObjectURL(blob)
        return previewUrl
      }
      return ''
    }

    if (detail) {
      const vehicleData: VehicleData[] = [
        {
          title: 'รูปภาพหน้ารถ',
          description: 'รูปภาพหน้ารถ',
          image: await getImageUrl(detail?.vehicle_pictures.front_rear_url),
        },
        {
          title: 'รูปภาพด้านข้างรถ',
          description: 'รูปภาพด้านข้างรถ',
          image: await getImageUrl(detail?.vehicle_pictures.side_rear_url),
        },
        {
          title: 'รูปภาพหลังรถ',
          description: 'รูปภาพหลังรถ',
          image: await getImageUrl(detail?.vehicle_pictures.back_rear_url),
        },
      ]

      const summaryData: SummaryData[] = [
        {
          title: 'น้ำหนักรถเปล่ารวม',
          description: String(detail?.vehicle_detail?.weight || 0) + ' กก.',
        },
        {
          title: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา',
          description: String(0) + ' กก.',
        },
        {
          title: 'มิติรถเปล่า',
          description: `กว้าง ${detail?.vehicle_detail?.width} X ยาว ${detail?.vehicle_detail?.length} X สูง ${detail?.vehicle_detail?.height}`,
        },
        {
          title: 'มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.)',
          description: `กว้าง ${detail?.vehicle_detail?.width} X ยาว ${detail?.vehicle_detail?.length} X สูง ${detail?.vehicle_detail?.height}`,
        },
      ]

      setVehicleData(vehicleData)
      setSummaryData(summaryData)
    }
  }, [detail])

  useEffect(() => {
    buildSummaryData()
  }, [buildSummaryData, detail])

  return (
    <>
      <section>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Controller
              name={
                `form_template.'${formIndex}.'vehicle_type` as `form_template.0.vehicle_type`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลือกประเภทจับคู่</label>
                    <Select
                      {...field}
                      placeholder="กรุณาเลือก"
                      options={vehicle_type}
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                      }}
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={async (value) => {
                        field.onChange(value)
                        setVehicleType(Number(value))
                        setVehicleId(null)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div>
            <Controller
              name={
                `form_template.'${formIndex}.'turn_radius` as `form_template.0.turn_radius`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รัศมีวงเลี้ยว</label>
                    <Input
                      {...field}
                      placeholder="กรุณาระบุ"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className="mt-5">{renderVehicleType}</section>
      <section
        className="mt-5"
        style={{
          display: vehicleId === null ? 'none' : 'block',
        }}
      >
        <h5>เส้นทาง</h5>
        <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-4">
            <Controller
              name={
                `form_template.'${formIndex}.'start_route` as `form_template.0.start_route`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ต้นทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ต้นทาง"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={(e) => {
                        field.onChange(e)
                        const [lat, lng] =
                          e.target.value.split(',').map(Number) ?? []

                        // Clear existing timeout
                        if (firstPointTimeoutRef.current) {
                          clearTimeout(firstPointTimeoutRef.current)
                        }

                        // Set new timeout for 500ms delay
                        firstPointTimeoutRef.current = setTimeout(() => {
                          setFirstPoint?.([lat, lng])
                        }, 500)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-4">
            <Controller
              name={
                `form_template.'${formIndex}.'end_route` as `form_template.0.end_route`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ปลายทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ปลายทาง"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={(e) => {
                        field.onChange(e)
                        const [lat, lng] =
                          e.target.value.split(',').map(Number) ?? []

                        // Clear existing timeout
                        if (secondPointTimeoutRef.current) {
                          clearTimeout(secondPointTimeoutRef.current)
                        }

                        // Set new timeout for 500ms delay
                        secondPointTimeoutRef.current = setTimeout(() => {
                          setSecondPoint?.([lat, lng])
                        }, 500)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      {vehicleId &&
        (loading ? (
          <Spin />
        ) : (
          <section className="mt-5">
            <h5>รายละเอียด</h5>
            <section className="mb-3">
              <VehicleSummary data={summaryData} />
            </section>
            <section>
              <CardVehicleDetails data={vehicleData} />
            </section>
          </section>
        ))}
    </>
  )
}

export default memo<Props>(FormRouteEstimation)
