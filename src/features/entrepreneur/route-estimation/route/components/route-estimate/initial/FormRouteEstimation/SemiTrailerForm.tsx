import { memo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Input, Select } from 'antd'

export interface SemiTrailerFormProps { 
  formIndex: number
  control: Control<any>
  vehicleList: any
}

function SemiTrailerForm(props: SemiTrailerFormProps) {
  const { formIndex, control, vehicleList } = props

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <h5>รถกึ่งพ่วง</h5>
        <Controller
          name={
            `form_template.'${formIndex}.'semi_trailer_license_plate` as `form_template.0.semi_trailer_license_plate`
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
      <div className="col-span-3">
        <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-2">
            <Controller
              name={
                `form_template.'${formIndex}.'semi_trailer_chassis_weight_1` as `form_template.0.semi_trailer_chassis_weight_1`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
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
                `form_template.'${formIndex}.'semi_trailer_chassis_weight_2` as `form_template.0.semi_trailer_chassis_weight_2`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
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
                `form_template.'${formIndex}.'semi_trailer_chassis_weight_3` as `form_template.0.semi_trailer_chassis_weight_3`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
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
          <div className="xl:col-span-2">
            <Controller
              name={
                `form_template.'${formIndex}.'semi_trailer_chassis_weight_4` as `form_template.0.semi_trailer_chassis_weight_4`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="เพลาที่ 4"
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

export default memo(SemiTrailerForm)
