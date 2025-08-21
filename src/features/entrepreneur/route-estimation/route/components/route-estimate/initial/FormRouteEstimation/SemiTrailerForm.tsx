import { memo, useCallback, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button, Input, Select } from 'antd'
import { FormProps } from './type'

function SemiTrailerForm(props: FormProps) {
  const { formIndex, control, vehicleList, setVehicleId } = props
  const [enableAddAxle, setEnableAddAxle] = useState<boolean>(true)
  const [enableRemoveAxle, setEnableRemoveAxle] = useState<boolean>(false)
  const [axles, setAxles] = useState<number>(4)

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
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
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
        <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
        <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
          {Array.from({ length: axles }).map((_, index) => (
            <div key={index} className="xl:col-span-2">
              <Controller
                name={
                  `form_template.'${formIndex}.'semi_trailer_chassis_weight_${index + 1}` as `form_template.0.semi_trailer_chassis_weight_1`
                }
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        name={`form_template.'${formIndex}.${field.name}`}
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
          <Button type="primary" onClick={addedAxle} disabled={!enableAddAxle}>เพิ่มเพลา</Button>
          <Button type="primary" danger onClick={removedAxle} disabled={!enableRemoveAxle}>ลบเพลา</Button>
        </div>
      </div>
    </div>
  )
}

export default memo(SemiTrailerForm)
