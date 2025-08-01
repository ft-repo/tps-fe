/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import { Button, Input, Select, Upload } from '@/components/ui'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi'

interface Props {
  control: Control<FieldType>;
}

const FormInfo: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div>
      <section>
        <h5>ข้อมูลสำคัญ</h5>
        <p>กรุณากรอกข้อมูลจริงเท่านั้น</p>
      </section>
      <section className='mt-5'>
        <div className='block lg:grid grid-cols-2 gap-3'>
          <Controller
            name='vehicle_type'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ประเภทรถ</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={[]}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='license_plate'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_model'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ยี่ห้อ</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='province'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จังหวัด</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_weight'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>น้ำหนักรถเปล่า (กก.)</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_color'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สีรถ</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <div className='col-span-2'>
            <Controller
              name='vehicle_color'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ระยะ kingpin (ม.)</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
        <div className='block sm:grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
          <Controller
            name='wide_unit'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>กว้าง (ม.)</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='long_unit'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>กว้าง (ม.)</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='tall_unit'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สูง (ม.)</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
        </div>
      </section>
      <section className='mt-5'>
        <fieldset>
          <label className='block'>เอกสารเล่มทะเบียน</label>
          <Upload>
            <Button
              variant="solid"
              icon={<HiOutlineCloudUpload />}
              size='sm'
              type='button'
            >
              เพิ่มไฟล์ .pdf
            </Button>
          </Upload>
        </fieldset>
      </section>
    </div>
  )
}

export default React.memo<Props>(FormInfo)
