/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { Input, Select } from '@/components/ui'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { FieldType } from '@/@types/entrepreneur/executive-data';

interface Props {
  control: Control<FieldType>;
}

const FormExecutiveData: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div>
      <h5>ข้อมูลสำคัญ</h5>
      <div className='block xl:grid grid-cols-2 gap-5 mt-5'>
        <Controller
          disabled
          name='business_type'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทนิติบุคคล</label>
                <Select
                  {...field}
                  name={field.name}
                  placeholder="กรุณาเลือก"
                  options={[]}
                  isDisabled={field.disabled}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='business_name'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ชื่อบริษัท / ห้าง / ร้าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  disabled={field.disabled}
                />
              </fieldset>
            )
          }}
        />
        <div className='col-span-2'>
          <Controller
            disabled
            name='business_address'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ที่อยู่บริษัท</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    disabled={field.disabled}
                  />
                </fieldset>
              )
            }}
          />
        </div>
        <Controller
          name='office_tel'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เบอร์โทรสำนักงาน</label>
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
          disabled
          name='business_no'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียนนิติบุคคล</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  disabled={field.disabled}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name='contact_name'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ชื่อผู้ติต่อ / มอบอำนาจ</label>
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
          name='contact_type'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทผู้ติดต่อ / มอบอำนาจ</label>
                <Select
                  {...field}
                  name={field.name}
                  placeholder="กรุณาเลือก"
                  options={[]}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name='citizen_id'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเลขบัตรประชาชน</label>
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
          name='contact_tel'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ</label>
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
  )
}

export default React.memo<Props>(FormExecutiveData)
