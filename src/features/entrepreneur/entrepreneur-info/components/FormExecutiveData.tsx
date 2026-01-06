/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form'
import { FieldType } from '@/@types/entrepreneur/executive-data';
import { DatePicker, Select, Input, Upload, message, Button } from 'antd';
import { useAppSelector } from '@/store';
import { postUploadProfileImageAPI } from '@/services/entrepreneur/UserService';
import { RcFile } from 'antd/es/upload';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
}

const FormExecutiveData: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { entity_type, contact_type } = useAppSelector(state => state.master)
  const disabled = window.location.href.includes('/user-info/entrepreneur/view/') ? true : false

  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (file: any) => {
    try {
      // POST
      const response = await postUploadProfileImageAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue('file_id.url', response.data?.url)
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.log(error)
      }
    }
  }, [setValue])

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
                <label>ประเภทนิติบุคคล <span className='text-red-500'>*</span></label>
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
                <label>ชื่อบริษัท / ห้าง / ร้าน <span className='text-red-500'>*</span></label>
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
                  <label>ที่อยู่บริษัท <span className='text-red-500'>*</span></label>
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
                <label>เบอร์โทรสำนักงาน <span className='text-red-500'>*</span></label>
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
                    field.onChange(e.target.value.replace(/[^0-9]/g, ""))
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
            required: 'กรุณาระบุเลขทะเบียนนิติบุคคล',
            validate: (value) => value.length >= 13 || 'เลขทะเบียนนิติบุคคลไม่ถูกต้อง',
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียนนิติบุคคล <span className='text-red-500'>*</span></label>
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
                  maxLength={13}
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
                <label>ชื่อผู้ติต่อ / มอบอำนาจ <span className='text-red-500'>*</span></label>
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
                <label>ประเภทผู้ติดต่อ / มอบอำนาจ <span className='text-red-500'>*</span></label>
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
            required: 'กรุณาระบุหมายเลขบัตรประชาชน',
            validate: (value) => value.length >= 13 || 'เลขบัตรประชาชนไม่ถูกต้อง',
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเลขบัตรประชาชน <span className='text-red-500'>*</span></label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                  maxLength={13}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^0-9]/g, ""))
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
              value: 10,
              message: 'กรุณาระบุเลขที่ถูกต้อง'
            },
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ <span className='text-red-500'>*</span></label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                  maxLength={10}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                  }}
                />
                {!!errors.contact_tel &&
                  <p className='text-red-500'>{errors.contact_tel.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='file_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูป'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>อัปโหลดรูป <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='picture'
                  accept='image/jpg,image/jpeg,image/png'
                  beforeUpload={(file) => {
                    // DEFAULT VALUES
                    const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                    const maxFileSize = 10000000
                    // CHECK
                    const isListAvailable = allowList.some(item => item === file.type)
                    const isLt10 = file.size < maxFileSize
                    if (!isListAvailable) {
                      message.error('ประเภทไฟล์ไม่ถูกต้อง')
                      return Upload.LIST_IGNORE
                    }
                    if (!isLt10) {
                      message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                      return Upload.LIST_IGNORE
                    }
                    return false
                  }}
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile(e.fileList)
                    } else {
                      setValue('file_id.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <Button
                      disabled={disabled}
                      htmlType='button'
                      type='primary'
                      icon={<HiOutlineCloudUpload />}
                    >
                      เพิ่มไฟล์รูปภาพ
                    </Button>
                  }
                </Upload>
                {!!errors.file_id?.file &&
                  <p className='text-red-500'>{errors.file_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='approved_date'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>วันที่รับอนุญาต <span className='text-red-500'>*</span></label>
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
