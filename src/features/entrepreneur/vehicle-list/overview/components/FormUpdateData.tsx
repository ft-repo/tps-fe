/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import { useAppSelector } from '@/store';
import React, { useCallback } from 'react'
import { Control, Controller, UseFormSetValue, useFormState, useWatch } from 'react-hook-form'
import { Select, Input, Upload, message, Button, Row, Col } from 'antd';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { postUploadFileAPI } from '@/services/entrepreneur/VehicleListService';
import { RcFile } from 'antd/es/upload';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
}

const FormUpdateData: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { province, product_type } = useAppSelector(state => state.master)
  const vehicleType = useAppSelector(state => state.master.vehicle_type)
  const { errors } = useFormState({ control })

  const { vehicle_type } = useWatch({ control })

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
    <div className='mt-5'>
      <section className='mb-3'>
        <h5>แก้ไขข้อมูลสำคัญ</h5>
        <p>กรุณากรอกข้อมูลจริงเท่านั้น</p>
      </section>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='vehicle_type'
            control={control}
            rules={{
              required: 'กรุณาระบุประเภทรถ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ประเภทรถ <span className='text-red-500'>*</span></label>
                  <Select
                    {...field}
                    placeholder='กรุณาเลือก'
                    options={vehicleType}
                    fieldNames={{
                      label: 'name',
                      value: 'id'
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                    onChange={(e) => {
                      field.onChange(e)
                      setValue('license_plate', [])
                    }}
                  />
                  {!!errors.vehicle_type &&
                    <p className='text-red-500'>{errors.vehicle_type.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='license_plate'
            control={control}
            rules={{
              required: vehicle_type !== 3 ? 'กรุณาระบุเลขทะเบียน / เลขตัวรถ' : 'กรุณาระบุเครื่องจักร / สินค้า'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>{vehicle_type !== 3 ? 'เลขทะเบียน / เลขตัวรถ' : 'เครื่องจักร / สินค้า'} <span className='text-red-500'>*</span></label>
                  {vehicle_type !== 3 ?
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
                        if (vehicle_type !== 3) {
                          field.onChange(
                            e.target.value
                              .replace(/[^0-9]/g, "") // Remove non-digits
                              .replace(/(\d{2})(\d{4})/, "$1-$2") // Format as XX-XXXX
                              .slice(0, 7) // Limit to 7 characters (including dash)
                          )
                        } else {
                          field.onChange(e)
                        }
                      }}
                    />
                    :
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      mode='tags'
                      placeholder='กรุณาเลือก'
                      options={product_type}
                      fieldNames={{
                        label: 'name',
                        value: 'name'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                  }
                  {!!errors.license_plate &&
                    <p className='text-red-500'>{errors.license_plate.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            disabled={vehicle_type === 3}
            name='vehicle_model'
            control={control}
            rules={{
              required: 'กรุณาระบุยี่ห้อ',
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ยี่ห้อ {vehicle_type !== 3 ? <span className='text-red-500'>*</span> : null}</label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            disabled={vehicle_type === 3}
            name='province'
            control={control}
            rules={{
              required: 'กรุณาเลือกจังหวัด'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จังหวัด {vehicle_type !== 3 ? <span className='text-red-500'>*</span> : null}</label>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={province}
                    fieldNames={{
                      label: 'name_th',
                      value: 'id'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='vehicle_weight'
            control={control}
            rules={{
              required: 'กรุณาระบุน้ำหนักรถเปล่า (กก.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>น้ำหนักรถเปล่า (กก.) <span className='text-red-500'>*</span></label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            disabled={vehicle_type === 3}
            name='vehicle_color'
            control={control}
            rules={{
              required: 'กรุณาระบุสีรถ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สีรถ {vehicle_type !== 3 ? <span className='text-red-500'>*</span> : null}</label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            disabled={vehicle_type === 3}
            name='vehicle_distance'
            control={control}
            rules={{
              required: 'กรุณาระบุระยะ kingpin (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ระยะ kingpin (ม.) {vehicle_type !== 3 ? <span className='text-red-500'>*</span> : null}</label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            disabled={vehicle_type === 3}
            name='vehicle_axles'
            control={control}
            rules={{
              required: 'กรุณาเลือกจำนวนเพลา'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จำนวนเพลา {vehicle_type !== 3 ? <span className='text-red-500'>*</span> : null}</label>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={[
                      {
                        label: '2 เพลา',
                        value: 2
                      },
                      {
                        label: '3 เพลา',
                        value: 3
                      },
                      {
                        label: '4 เพลา',
                        value: 4
                      },
                      {
                        label: '5 เพลา',
                        value: 5
                      },
                      {
                        label: '6 เพลา',
                        value: 6
                      },
                      {
                        label: '7 เพลา',
                        value: 7
                      },
                    ]}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.vehicle_axles &&
                    <p className='text-red-500'>{errors.vehicle_axles.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='wide_unit'
            control={control}
            rules={{
              required: 'กรุณาระบุกว้าง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>กว้าง (ม.) <span className='text-red-500'>*</span></label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='long_unit'
            control={control}
            rules={{
              required: 'กรุณาระบุกว้าง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ยาว (ม.) <span className='text-red-500'>*</span></label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='tall_unit'
            control={control}
            rules={{
              required: 'กรุณาระบุสูง (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สูง (ม.) <span className='text-red-500'>*</span></label>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Controller
            name='file_registered_document_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารเล่มทะเบียน'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label className='block'>เอกสารเล่มทะเบียน <span className='text-red-500'>*</span></label>
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
                    onPreview={(e) => {
                      const url = URL.createObjectURL(e.originFileObj as RcFile);
                      window.open(url);
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
        </Col>
      </Row>
    </div>
  )
}

export default React.memo<Props>(FormUpdateData)
