/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { Button, Upload } from '@/components/ui'
import React from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { FieldType } from '@/@types/entrepreneur/executive-data';
import { DatePicker, Select, Input } from 'antd';
import { useAppSelector } from '@/store';

interface Props {
  control: Control<FieldType>;
  errors: FieldErrors<FieldType>;
}

const FormExecutiveData: React.FC<Props> = (props) => {
  const { control, errors } = props
  const { entity_type, contact_type } = useAppSelector(state => state.master)

  return (
    <div>
      <h5>ข้อมูลสำคัญ</h5>
      <div className='block lg:grid grid-cols-2 gap-5 mt-5'>
        <Controller
          disabled
          name='business_type'
          control={control}
          rules={{
            required: 'กรุณาเลือกประเภทนิติบุคคล'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทนิติบุคคล</label>
                <Select
                  {...field}
                  disabled
                  placeholder='กรุณาเลือก'
                  options={entity_type}
                  fieldNames={{
                    label: 'name',
                    value: 'id'
                  }}
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.business_type &&
                  <p className='text-red-500'>{errors.business_type.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='business_name'
          control={control}
          rules={{
            required: 'กรุณาระบุชื่อบริษัท / ห้าง / ร้าน'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ชื่อบริษัท / ห้าง / ร้าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  disabled={field.disabled}
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.business_name &&
                  <p className='text-red-500'>{errors.business_name.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <div className='col-span-2'>
          <Controller
            disabled
            name='business_address'
            control={control}
            rules={{
              required: 'กรุณาระบุที่อยู่บริษัท'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ที่อยู่บริษัท</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    disabled={field.disabled}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.business_address &&
                    <p className='text-red-500'>{errors.business_address.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
        <Controller
          name='office_tel'
          control={control}
          rules={{
            required: 'กรุณาระบุเบอร์โทรสำนักงาน',
            minLength: {
              value: 8,
              message: 'กรุณาระบุเลขที่ถูกต้อง'
            },
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เบอร์โทรสำนักงาน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                  }}
                />
                {!!errors.office_tel &&
                  <p className='text-red-500'>{errors.office_tel.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='business_no'
          control={control}
          rules={{
            required: 'กรุณาระบุเลขทะเบียนนิติบุคคล'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียนนิติบุคคล</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  disabled={field.disabled}
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.business_no &&
                  <p className='text-red-500'>{errors.business_no.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='contact_name'
          control={control}
          rules={{
            required: 'กรุณาระบุชื่อผู้ติต่อ / มอบอำนาจ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ชื่อผู้ติต่อ / มอบอำนาจ</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.contact_name &&
                  <p className='text-red-500'>{errors.contact_name.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='contact_type'
          control={control}
          rules={{
            required: 'กรุณาเลือกประเภทผู้ติดต่อ / มอบอำนาจ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทผู้ติดต่อ / มอบอำนาจ</label>
                <Select
                  {...field}
                  placeholder='กรุณาเลือก'
                  options={contact_type}
                  fieldNames={{
                    label: 'name',
                    value: 'id'
                  }}
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.contact_type &&
                  <p className='text-red-500'>{errors.contact_type.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='citizen_id'
          control={control}
          rules={{
            required: 'กรุณาระบุหมายเลขบัตรประชาชน'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเลขบัตรประชาชน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.citizen_id &&
                  <p className='text-red-500'>{errors.citizen_id.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='contact_tel'
          control={control}
          rules={{
            required: 'กรุณาระบุเบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ',
            minLength: {
              value: 8,
              message: 'กรุณาระบุเลขที่ถูกต้อง'
            },
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
                {!!errors.contact_tel &&
                  <p className='text-red-500'>{errors.contact_tel.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <fieldset>
          <label>อัปโหลดรูป</label>
          <Upload
            className='block mt-1'
          >
            <Button
              variant="solid"
              icon={<HiOutlineCloudUpload />}
              size='sm'
              type='button'
            >
              อัปโหลดไฟล์
            </Button>
          </Upload>
        </fieldset>
        <Controller
          disabled
          name='approved_date'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>วันที่รับอนุฐาต</label>
                <DatePicker
                  {...field}
                  name={field.name}
                  placeholder='กรุณาเลือกวันที่'
                  disabled={field.disabled}
                  format={'DD/MM/YYYY'}
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
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

export default React.memo<Props>(FormExecutiveData)
