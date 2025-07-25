/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { Card, Input, Select } from '@/components/ui'
import { Control, Controller } from 'react-hook-form'
import { FieldArray } from '@/@types/entrepreneur/route-estimation'

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
      <section className='mt-5'>
        <h5>รายละเอียด</h5>
        <section className='mb-3'>
          <p><strong>น้ำหนักรถเปล่ารวม:</strong> 27,900 กก.</p>
          <p><strong>น้ำหนักรถเปล่ารวมน้ำหนักเพลา:</strong> 57,000 กก.</p>
          <p><strong>มิติรถเปล่า (ม.):</strong> กว้าง 3.50 X ยาว 9.00 X สูง 4.30</p>
          <p><strong>มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.):</strong> กว้าง 3.50 X ยาว 9.00 X สูง 4.96</p>
        </section>
        <div className="grid grid-cols-3 gap-4">
          <Card
            header={(
              <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" className='w-full h-44 object-cover object-center' alt="card header" />
              </div>
            )}
            headerClass='p-0'
          >
            <h5>รถลากจูง</h5>
            <p>25,000 กก.</p>
            <p>83 - 9120 สระบุรี</p>
          </Card>
          <Card
            header={(
              <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" className='w-full h-44 object-cover object-center' alt="card header" />
              </div>
            )}
            headerClass='p-0'
          >
            <h5>รถกึ่งพ่วง 4 เพลา 8</h5>
            <p>20,000 กก.</p>
            <p>22 - 1144 สระบุรี</p>
          </Card>
          <Card
            header={(
              <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                <img src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" className='w-full h-44 object-cover object-center' alt="card header" />
              </div>
            )}
            headerClass='p-0'
          >
            <h5>เครื่องจักร</h5>
            <p>35,800 กก.</p>
            <p>68 - 1181 สระบุรี</p>
          </Card>
        </div>
      </section>
    </>
  )
}

export default React.memo<Props>(FormRouteEstimation)
