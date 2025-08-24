import { Root, VehicleId } from '@/@types/entrepreneur/route-estimation'
import { useAppDispatch, useAppSelector } from '@/store'
import { getVehicleData } from '@/store/slices/entrepreneur/vehicleListSlice'
import { Input, Select } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'
import { Control, Controller, FieldArray } from 'react-hook-form'
import FormVehicle from './FormVehicle'
import { VehicleIdContext } from '../../step/RouteEstimation'

interface Props {
  formItem: FieldArray
  formIndex: number
  control: Control<Root>
  setVehicleId: (vehicleId: VehicleId) => void
}

const FormRouteEstimation: FC<Props> = (props: Props) => {
  const { formIndex, control, setVehicleId } = props
  const dispatch = useAppDispatch()
  const { vehicle_type } = useAppSelector((state) => state.master)
  const { overview } = useAppSelector((state) => state.entrepreneur.vehicleList)
  const [vehicleType, setVehicleType] = useState<number[]>([])

  useEffect(() => {
    dispatch(
      getVehicleData({
        page: 1,
        limit: 1000,
      }),
    )
  }, [dispatch])

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
                  setVehicleId({
                    towing_vehicle_id: undefined,
                    semi_trailer_vehicle_id: undefined,
                    etc_vehicle_id: undefined,
                  })
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
