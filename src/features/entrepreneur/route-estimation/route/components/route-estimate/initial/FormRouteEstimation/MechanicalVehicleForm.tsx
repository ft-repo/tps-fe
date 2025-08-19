import { memo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Select } from 'antd'

export interface MechanicalVehicleFormProps {
  formIndex: number
  control: Control<any>
  vehicleList: any
}

function MechanicalVehicleForm(props: MechanicalVehicleFormProps) {
  const { formIndex, control, vehicleList } = props

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
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
                  options={vehicleList.overview.data.data}
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
