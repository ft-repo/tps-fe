/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { EstimateResponse } from '@/@types/services/petition';
import { Col, message, Row, Select, Upload } from 'antd';
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list';
import { useAppSelector } from '@/store';
import { postUploadVehicleRegistrationDocumentAPI } from '@/services/entrepreneur/PetitionService';
import { RcFile } from 'antd/es/upload';

interface Props {
  item: EstimateResponse;
  index: number;
  control: Control<FieldTypePetition>;
  setValue: UseFormSetValue<FieldTypePetition>;
}

const FormPermitDocument: React.FC<Props> = (props) => {
  const { item, index, control, setValue } = props
  const { vehicle_selection } = useAppSelector(state => state.master)

  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadVehicleRegistrationDocumentAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue(fieldName as any, response.data?.url)
      } else {
        console.log('Error')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [setValue])

  console.log(item)

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          {item.vehicle.map(((vehicleItem, vehicleIndex) => {
            return (
              <Col key={vehicleIndex} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <fieldset>
                  <h5>{vehicleItem.vehicle_type}</h5>
                  <label>{vehicleItem.vehicle_type === 'เครื่องจักร / สินค้า' ? 'ชื่อสินค้า / เครื่องจักร' : 'เลขทะเบียน / เลขตัวรถ'}</label>
                  <Select
                    disabled
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={vehicle_selection.data.map(item => {
                      return item.vehicle_detail
                    })}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                    defaultValue={vehicleItem.id}
                  />
                </fieldset>
              </Col>
            )
          }))}
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.truck_dimension_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถลากจูง'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบที่แสดงมิติ รถลากจูง (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.truck_dimension_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.truck_dimension_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.truck_dimension_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].truck_dimension_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.semi_trailer_dimension_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถกึ่งพ่วง'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบที่แสดงมิติ รถกึ่งพ่วง (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.semi_trailer_dimension_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.semi_trailer_dimension_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.semi_trailer_dimension_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].semi_trailer_dimension_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.cargo_dimension_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ สินค้า / เครื่องจักร'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบที่แสดงมิติ สินค้า / เครื่องจักร (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.cargo_dimension_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.cargo_dimension_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.cargo_dimension_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].cargo_dimension_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.combined_vehicle_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบยานพาหนะรวมสิ่งของ'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบยานพาหนะรวมสิ่งของ (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.combined_vehicle_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.combined_vehicle_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.truck_dimension_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].truck_dimension_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.turning_radius_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบที่แสดงรัศมีวงเลี่ยว'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบที่แสดงรัศมีวงเลี่ยว (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.turning_radius_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.turning_radius_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.turning_radius_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].turning_radius_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.highway_dept_permit_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทล.'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เอกสารขออนุญาตจาก ทล. (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.highway_dept_permit_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.highway_dept_permit_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.highway_dept_permit_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].highway_dept_permit_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.highway_dept_permit_number_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทล.'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขที่ขออนุญาตเดิมจาก ทล. (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.highway_dept_permit_number_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.highway_dept_permit_number_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.highway_dept_permit_number_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].highway_dept_permit_number_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.rural_highway_dept_permit_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทช.'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เอกสารขออนุญาตจาก ทช. (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.rural_highway_dept_permit_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.rural_highway_dept_permit_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.rural_highway_dept_permit_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].rural_highway_dept_permit_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name={`vehicle.${index}.rural_highway_dept_permit_number_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทช.'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขที่ขออนุญาตเดิมจาก ทช. (ถ้ามี)</label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
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
                          uploadFile(`vehicle.${index}.rural_highway_dept_permit_number_url.url`, e.fileList)
                        } else {
                          setValue(`vehicle.${index}.rural_highway_dept_permit_number_url.url`, '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.vehicle?.[index]?.rural_highway_dept_permit_number_url?.file &&
                      <p className='text-red-500'>{errors.vehicle[index].rural_highway_dept_permit_number_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
    </>
  )
}

export default React.memo<Props>(FormPermitDocument)
