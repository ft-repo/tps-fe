import { memo } from 'react'
import { Controller } from 'react-hook-form'
import { Input, Select } from 'antd'
import { FormProps } from './type'

function RecoveryVehicleForm(props: FormProps) {
  const { formIndex, control, vehicleList, setVehicleId } = props

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <h5>รถลากจูง</h5>
        <Controller
          name={
            `form_template.'${formIndex}.'recovery_vehicle_license_plate` as `form_template.0.recovery_vehicle_license_plate`
          }
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
                    setVehicleId(value)
                    field.onChange(value)
                  }}
                />
              </fieldset>
            )
          }}
        />
      </div>
      <div className="lg:col-span-3">
        <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
        <div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
          <div className="xl:col-span-2">
            <Controller
              name={
                `form_template.'${formIndex}.'recover_vehicle_chassis_weight_1` as `form_template.0.recover_vehicle_chassis_weight_1`
              }
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
              name={
                `form_template.'${formIndex}.'recover_vehicle_chassis_weight_2` as `form_template.0.recover_vehicle_chassis_weight_2`
              }
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
              name={
                `form_template.'${formIndex}.'recover_vehicle_chassis_weight_3` as `form_template.0.recover_vehicle_chassis_weight_3`
              }
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
    </div>
  )
}

export default memo(RecoveryVehicleForm)
