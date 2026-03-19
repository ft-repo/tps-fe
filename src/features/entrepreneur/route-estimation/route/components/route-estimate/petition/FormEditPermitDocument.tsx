/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement, useCallback, useMemo } from 'react'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { Col, Input, message, Row, Upload } from 'antd';
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list';
// import { useAppSelector } from '@/store';
import { postUploadVehicleRegistrationDocumentAPI } from '@/services/entrepreneur/PetitionService';
import { RcFile, UploadFile } from 'antd/es/upload';
import {
  AiOutlineEye as EyeOutlined,
  AiOutlineDelete as DeleteOutlined
} from "react-icons/ai";
import { EditVehicleList } from '@/@types/reducer/petition';
import { useLocation } from 'react-router-dom';

interface Props {
  item: EditVehicleList;
  index: number;
  control: Control<FieldTypePetition>;
  setValue: UseFormSetValue<FieldTypePetition>;
}

const FormEditPermitDocument: React.FC<Props> = (props) => {
  const { item, index, control, setValue } = props
  // const { vehicle_selection } = useAppSelector(state => state.master)
  const { state } = useLocation()
  const isEditDocument = state?.type === 'ตรวจเอกสาร' ? true : false

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

  const _itemRender = useCallback((
    originNode: ReactElement,
    file: UploadFile,
    fileList: UploadFile[],
    actions: {
      download: (file: UploadFile) => void,
      preview: (file: UploadFile) => void,
      remove: (file: UploadFile) => void
    }) => {
    if (file.type === 'application/pdf') {
      return (
        <div className='custom-upload-item'>
          {originNode}
          <div className='preview-overlay rounded-md'>
            <EyeOutlined
              className='preview-icon'
              onClick={() => {
                const url = file.originFileObj
                  ? URL.createObjectURL(file.originFileObj as RcFile)
                  : file.url!
                window.open(url);
              }}
            />
            {!isEditDocument && (
              <DeleteOutlined
                className='delete-icon'
                onClick={() => actions.remove(file)}
              />
            )}
          </div>
        </div>
      )
    }
    return originNode
  }, [isEditDocument]);  // <-- add isEditDocument here

  const renderVehicleField = useMemo(() => {
    const arr: { vehicle_type: string; plate_no: string }[] = []

    if (item.towing_vehicle) {
      arr.push({
        vehicle_type: 'หัวลาก',
        plate_no: `${item.towing_vehicle.plate_no} ${item.towing_vehicle.plate_province}`,
      })
    }
    if (item.semi_trailer_vehicle) {
      arr.push({
        vehicle_type: 'กึ่งพ่วง',
        plate_no: `${item.semi_trailer_vehicle.plate_no} ${item.semi_trailer_vehicle.plate_province}`,
      })
    }
    item.etc_vehicle?.forEach(etc => {
      arr.push({
        vehicle_type: 'เครื่องจักร / สินค้า',
        plate_no: `${etc.plate_no}`,
      })
    })

    return arr
  }, [item.towing_vehicle, item.semi_trailer_vehicle, item.etc_vehicle])

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          {renderVehicleField.map((vehicleItem, vehicleIndex) => (
            <Col key={vehicleIndex} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <fieldset>
                <h5>{vehicleItem.vehicle_type}</h5>
                <label>
                  {vehicleItem.vehicle_type === 'เครื่องจักร / สินค้า'
                    ? 'ชื่อเครื่องจักร / สินค้า'
                    : 'เลขทะเบียน / เลขตัวรถ'}
                </label>
                <Input
                  disabled
                  value={vehicleItem.plate_no}
                  className='w-full'
                  size='large'
                  style={{ fontFamily: 'Noto Sans Thai' }}
                />
              </fieldset>
            </Col>
          ))}
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
              name={`vehicle.${index}.cargo_dimension_url.file`}
              control={control}
              // rules={{
              //   required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ เครื่องจักร / สินค้า'
              // }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รูปแบบที่แสดงมิติ เครื่องจักร / สินค้า (ถ้ามี)</label>
                    <Upload
                      {...field}
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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
              disabled={isEditDocument}
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
                      disabled={isEditDocument}
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
                      itemRender={_itemRender}
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
                      {(field.value || []).length ? null :
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

export default React.memo<Props>(FormEditPermitDocument)
