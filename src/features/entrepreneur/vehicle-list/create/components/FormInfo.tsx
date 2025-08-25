/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import { postUploadFileAPI } from '@/services/entrepreneur/VehicleListService'
import React, { useCallback } from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { useAppSelector } from '@/store'
import { Button, Input, message, Select, Upload } from 'antd'

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
  errors: FieldErrors<FieldType>;
}

const FormInfo: React.FC<Props> = (props) => {
  const { control, setValue, errors } = props
  const { vehicle_type } = useAppSelector(state => state.master)

  const uploadFile = useCallback(async (file: any) => {
    try {
      // POST
      const response = await postUploadFileAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue('file_registered_document_id.url', response.data?.url)
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
      <section>
        <h5>ข้อมูลสำคัญ</h5>
        <p>กรุณากรอกข้อมูลจริงเท่านั้น</p>
      </section>
      <section className='mt-5'>
        <div className='block lg:grid grid-cols-2 gap-3'>
          <Controller
            name='vehicle_type'
            control={control}
            rules={{
              required: 'กรุณาระบุประเภทรถ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ประเภทรถ</label>
                  <Select
                    {...field}
                    placeholder='กรุณาเลือก'
                    options={vehicle_type}
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
                  {!!errors.vehicle_type &&
                    <p className='text-red-500'>{errors.vehicle_type.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='license_plate'
            control={control}
            rules={{
              required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
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
                  {!!errors.license_plate &&
                    <p className='text-red-500'>{errors.license_plate.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_model'
            control={control}
            rules={{
              required: 'กรุณาระบุยี่ห้อ',
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ยี่ห้อ</label>
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
                  {!!errors.vehicle_model &&
                    <p className='text-red-500'>{errors.vehicle_model.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='province'
            control={control}
            rules={{
              required: 'กรุณาระบุจังหวัด'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จังหวัด</label>
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
                  {!!errors.province &&
                    <p className='text-red-500'>{errors.province.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_weight'
            control={control}
            rules={{
              required: 'กรุณาระบุน้ำหนักรถเปล่า (กก.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>น้ำหนักรถเปล่า (กก.)</label>
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
                  {!!errors.vehicle_weight &&
                    <p className='text-red-500'>{errors.vehicle_weight.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='vehicle_color'
            control={control}
            rules={{
              required: 'กรุณาระบุสีรถ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สีรถ</label>
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
                  {!!errors.vehicle_color &&
                    <p className='text-red-500'>{errors.vehicle_color.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <div className='col-span-2'>
            <Controller
              name='vehicle_distance'
              control={control}
              rules={{
                required: 'กรุณาระบุระยะ kingpin (ม.)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ระยะ kingpin (ม.)</label>
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
                    {!!errors.vehicle_distance &&
                      <p className='text-red-500'>{errors.vehicle_distance.message}</p>
                    }
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
            rules={{
              required: 'กรุณาระบุกว้าง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>กว้าง (ม.)</label>
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
                  {!!errors.wide_unit &&
                    <p className='text-red-500'>{errors.wide_unit.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='long_unit'
            control={control}
            rules={{
              required: 'กรุณาระบุกว้าง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>กว้าง (ม.)</label>
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
                  {!!errors.long_unit &&
                    <p className='text-red-500'>{errors.long_unit.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='tall_unit'
            control={control}
            rules={{
              required: 'กรุณาระบุสูง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สูง (ม.)</label>
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
                  {!!errors.tall_unit &&
                    <p className='text-red-500'>{errors.tall_unit.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
      </section>
      <section className='mt-5'>
        <Controller
          name='file_registered_document_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารเล่มทะเบียน'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>เอกสารเล่มทะเบียน</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='picture'
                  accept='application/pdf'
                  beforeUpload={(file) => {
                    // DEFAULT VALUES
                    const allowList = ['application/pdf']
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
                      setValue('file_registered_document_id.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <Button
                      icon={<HiOutlineCloudUpload />}
                      htmlType='button'
                      type='primary'
                    >
                      เพิ่มไฟล์ .pdf
                    </Button>
                  }
                </Upload>
                {!!errors.file_registered_document_id?.file &&
                  <p className='text-red-500'>{errors.file_registered_document_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(FormInfo)
