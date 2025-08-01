/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Input, Select } from '@/components/ui'
import React from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<FieldTypeForOther>;
}

const FormVehicle: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <div className='block lg:grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-4'>
            <Controller
              name='vehicle_appearance'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ลักษณะ / มาตราฐาน</label>
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
          <div className='col-span-2'>
            <Controller
              name='vehicle_type'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ประเภท</label>
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
          </div>
          <div className='col-span-2'>
            <Controller
              name='vehicle_license_plate'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขทะเบียน</label>
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
          <div className='col-span-2'>
            <Controller
              name='vehicle_province'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
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
          </div>
          <div className='col-span-2'>
            <Controller
              name='vehicle_color'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>สี</label>
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
          <div className='col-span-2'>
            <Controller
              name='vehicle_axles'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จำนวนเพลา</label>
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
          </div>
          <div className='col-span-2'>
            <Controller
              name='vehicle_weight'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>น้ำหนักรวม (กิโลกรัม)</label>
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
      </section>
      <section className='mt-3'>
        <h5>น้ำหนักลงเพลา (กิโลกรัม)</h5>
        <div className='block sm:grid grid-cols-2 2xl:grid-cols-4 gap-3'>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormVehicle)
