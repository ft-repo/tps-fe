import { Root, VehicleId } from '@/@types/entrepreneur/route-estimation'
import { Button, Input, Select } from 'antd'
import { memo, useCallback, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface FormVehicleProps {
  vehicleType: number[]
  formIndex: number
  control: Control<Root>
  vehicleList: any
  setVehicleId: (id: VehicleId) => void
}

function FormVehicle(props: FormVehicleProps) {
  const { vehicleType, formIndex, control, vehicleList, setVehicleId } = props
  const [enableAddAxle, setEnableAddAxle] = useState<boolean>(true)
  const [enableRemoveAxle, setEnableRemoveAxle] = useState<boolean>(false)
  const [axles, setAxles] = useState<number>(4)
  
  const vehicleId = {}

  const addedAxle = useCallback(() => {
    if (axles >= 4 && axles < 7) {
      setAxles((prev) => prev + 1)
      setEnableRemoveAxle(true)
      if (axles + 1 >= 7) {
        setEnableAddAxle(false)
      }
    }
  }, [axles])

  const removedAxle = useCallback(() => {
    if (axles > 4 && axles <= 7) {
      setAxles((prev) => prev - 1)
      setEnableAddAxle(true)
      if (axles - 1 <= 4) {
        setEnableRemoveAxle(false)
      }
    }
  }, [axles])

  return (
    <section className="grid lg:grid-cols-3 gap-4">
      {vehicleType.includes(1) && (
        <div>
          <h5>รถลากจูง</h5>
          <Controller
            name={`vehicle.${formIndex}.towing_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      field.onChange(value)
                      setVehicleId({
                        ...vehicleId,
                        towing_vehicle_id: value as unknown as number,
                      })
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}
      {vehicleType.includes(2) && (
        <div>
          <h5>รถกึ่งพ่วง</h5>
          <Controller
            name={`vehicle.${formIndex}.semi_trailer_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      setVehicleId({
                        ...vehicleId,
                        semi_trailer_vehicle_id: value as unknown as number,
                      })
                      field.onChange(value)
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}
      {vehicleType.includes(3) && (
        <div>
          <h5>สินค้า/เครื่องจักร</h5>
          <Controller
            name={`vehicle.${formIndex}.etc_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      setVehicleId({
                        ...vehicleId,
                        etc_vehicle_id: value as unknown as number,
                      })
                      field.onChange(value)
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}

      {vehicleType.includes(1) && (
        <div className="lg:col-span-3">
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.0`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 1"
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
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.1`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 2"
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
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.2`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 3"
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
        </div>
      )}
      {vehicleType.includes(2) && (
        <div className="lg:col-span-3">
          <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
          <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
            {Array.from({ length: axles }).map((_, index) => (
              <div key={index} className="xl:col-span-2">
                <Controller
                  name={
                    `vehicle.${formIndex}.semi_trailer_axis_weight.${index}`
                  }
                  control={control}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          placeholder={`เพลาที่ ${index + 1}`}
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
            ))}
            <Button
              type="primary"
              disabled={!enableAddAxle}
              onClick={addedAxle}
            >
              เพิ่มเพลา
            </Button>
            <Button
              type="primary"
              danger={true}
              disabled={!enableRemoveAxle}
              onClick={removedAxle}
            >
              ลบเพลา
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(FormVehicle)
