import { Root } from '@/@types/entrepreneur/route-estimation'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  clearVehicleList,
  getVehicleData,
  getVehicleDetail,
} from '@/store/slices/entrepreneur/vehicleListSlice'
import { Input, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Control, Controller, FieldArray } from 'react-hook-form'
import FormVehicle from './FormVehicle'

interface Props {
  formItem: FieldArray
  formIndex: number
  control: Control<Root>
}

const FormRouteEstimation: FC<Props> = (props: Props) => {
  const { formItem, formIndex, control } = props
  const dispatch = useAppDispatch()
  const { vehicle_type } = useAppSelector((state) => state.master)
  const { overview } = useAppSelector((state) => state.entrepreneur.vehicleList)
  const [vehicleType, setVehicleType] = useState<number[]>([])
  const [vehicleId, setVehicleId] = useState<string | null>(null)

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

  return (
    <div key={formIndex}>
      <section>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <fieldset>
              <label>เลือกประเภทจับคู่</label>
              <Select
                id="vehicle_type"
                mode="multiple"
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
                onChange={(value) => {
                  setVehicleType(value)
                  setVehicleId(null)
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
      <section className="mt-5">
        <FormVehicle
          vehicleType={vehicleType}
          formIndex={formIndex}
          control={control}
          vehicleList={overview}
          setVehicleId={setVehicleId}
        />
      </section>
    </div>
  )
}

export default FormRouteEstimation
