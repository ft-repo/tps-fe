import { memo } from 'react'
import { Controller } from 'react-hook-form'
import { Select } from 'antd'
import { FormProps } from './type'

function MechanicalVehicleForm(props: FormProps) {
  const { formIndex, control, vehicleList, setVehicleId } = props

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <h5>สินค้า/เครื่องจักร</h5>
        <Controller
          name={
            `form_template.'${formIndex}.'mechanical_vehicle_license_plate` as `form_template.0.mechanical_vehicle_license_plate`
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
    </div>
  )
}

export default memo(MechanicalVehicleForm)
