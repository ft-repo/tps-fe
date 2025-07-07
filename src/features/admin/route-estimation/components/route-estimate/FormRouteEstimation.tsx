import React from 'react'
import { Input, Select } from '@/components/ui'
import { Control, Controller } from 'react-hook-form'
import { FieldArray } from '@/@types/admin/route-estimation'

interface Props {
formItem: FieldArray;
formIndex: number;
control: Control<FieldArray>
}

const FormRouteEstimation: React.FC<Props> = (props) => {
  const { formIndex, formItem, control } = props

  return (
    <>
      <section>
        <div className="grid lg:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <fieldset>
              <label>เลือกประเภทจับคู่</label>
              <Controller
                name={`form_template.'${formIndex}.'vehicle_type`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="เลือกประเภทจับคู่"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div>
            <fieldset>
              <label>รัศมีวงเลี้ยว</label>
              <Controller
                name={`form_template.'${formIndex}.'turn_radius`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="รัศมีวงเลี้ยว"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <div className="grid lg:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h5>รถลากจูง</h5>
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Controller
                name={`form_template.'${formIndex}.'recovery_vehicle_license_plate`}
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ]}
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div>
            <h5>รถกึ่งพ่วง</h5>
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Controller
                name={`form_template.'${formIndex}.'semi_trailer_license_plate`}
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ]}
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div>
            <h5>สินค้า/เครื่องจักร</h5>
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Controller
                name={`form_template.'${formIndex}.'mechanical_vehicle_license_plate`}
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ]}
                    />
                  )
                }}
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_1`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_2`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_3`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_1`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_2`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_3`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-2">
            <fieldset>
              <Controller
                name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_4`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>เส้นทาง</h5>
        <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-4">
            <fieldset>
              <label>ต้นทาง</label>
              <Controller
                name={`form_template.'${formIndex}.'start_route`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ต้นทาง"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
          <div className="xl:col-span-4">
            <fieldset>
              <label>ปลายทาง</label>
              <Controller
                name={`form_template.'${formIndex}.'end_route`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ปลายทาง"
                    />
                  )
                }}
              />
            </fieldset>
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo<Props>(FormRouteEstimation)
