import { RouteEstimationRequest } from '@/@types/entrepreneur/route-estimation'
import { useAppDispatch, useAppSelector } from '@/store'
import { getVehicleData } from '@/store/slices/entrepreneur/vehicleListSlice'
import { Input, Select, Spin } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Control, Controller, FieldArray } from 'react-hook-form'
import FormVehicle from './FormVehicle'
import DetailSection from './DetailSection'

interface Props {
  formItem: FieldArray
  formIndex: number
  control: Control<RouteEstimationRequest>
}

const vehicle_type = [
  {
    id: 1,
    name: 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร',
  },
  {
    id: 2,
    name: 'รถลากจูง + รถกึ่งพ่วง',
  },
  {
    id: 3,
    name: 'รถลากจูง',
  },
]

const vehicle_type_public = [
  {
    id: 2,
    name: 'รถลากจูง + รถกึ่งพ่วง',
  },
  {
    id: 3,
    name: 'รถลากจูง',
  },
]

const FormRouteEstimation: FC<Props> = (props: Props) => {
  const { formIndex, control } = props
  const dispatch = useAppDispatch()
  const { overview, loading } = useAppSelector(
    (state) => state.entrepreneur.vehicleList,
  )
  const { signedIn } = useAppSelector((state) => state.auth.session)
  const [vehicleType, setVehicleType] = useState<number | null>(null)

  useEffect(() => {
    if (signedIn) {
      dispatch(
        getVehicleData({
          page: 1,
          limit: 1000,
        }),
      )
    }
  }, [dispatch, signedIn])

  return (
    <div key={formIndex}>
      <section>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <fieldset>
              <label>เลือกประเภทจับคู่</label>
              <Select
                id="vehicle_type"
                placeholder="กรุณาเลือก"
                options={signedIn ? vehicle_type : vehicle_type_public}
                fieldNames={{
                  label: 'name',
                  value: 'id',
                }}
                className="w-full"
                size="large"
                style={{
                  fontFamily: 'Noto Sans Thai',
                }}
                onChange={(value) => {
                  setVehicleType(value)
                }}
              />
            </fieldset>
          </div>
          <div>
            <Controller
              name={`vehicle.${formIndex}.turn_radius`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รัศมีวงเลี้ยว</label>
                    <Input
                      {...field}
                      value={field.value as number}
                      placeholder="กรุณาระบุ"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={(e) => {
                        const newVal = Number(e.target.value)
                        field.onChange(newVal)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className="mt-5">
        {/* <FormVehicle
          vehicleType={vehicleType}
          formIndex={formIndex}
          control={control}
          vehicleList={overview}
        /> */}
      </section>
      {loading ? <Spin /> : <DetailSection />}
    </div>
  )
}

export default FormRouteEstimation
