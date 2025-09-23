/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { DocumentFieldType } from '@/@types/entrepreneur/route-estimation';
import { postUploadVehicleOwnerDocumentAPI } from '@/services/entrepreneur/PetitionService';
import { Button, Input, message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useCallback } from 'react'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';

interface Props {
  control: Control<DocumentFieldType>;
  setValue: UseFormSetValue<DocumentFieldType>;
}

const FormDocumentVehicle: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadVehicleOwnerDocumentAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue(fieldName as any, response.data?.url)
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
    <div className='border-2 rounded-md p-4 mb-3'>
      <h5>เอกสารยานพาหนะ</h5>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.vehicle_registration_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดสำเนาคู่มือจดทะเบียนและประวัติบานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>สำเนาคู่มือจดทะเบียนและประวัติบานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.vehicle_registration_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.vehicle_registration_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.vehicle_registration_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.vehicle_registration_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.vehicle_photos_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปถ่ายสียานพาหนะ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รูปถ่ายสียานพาหนะ (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.vehicle_photos_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.vehicle_photos_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.vehicle_photos_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.vehicle_photos_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.vehicle_dimensions_empty_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.vehicle_dimensions_empty_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.vehicle_dimensions_empty_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.vehicle_dimensions_empty_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.vehicle_dimensions_empty_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.vehicle_dimensions_loaded_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.vehicle_dimensions_loaded_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.vehicle_dimensions_loaded_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.vehicle_dimensions_loaded_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.vehicle_dimensions_loaded_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.prefab_parts_details_url.file'
          control={control}
          // rules={{
          //   required: 'กรุณาอัปโหลดชิ้นส่วนสำเร็จรูปให้แสดงจำนวนชิ้น ขนาดมิติ และน้ำหนัก พร้อมจำนวนเที่ยวที่ขนส่ง'
          // }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>(ถ้ามี) ชิ้นส่วนสำเร็จรูปให้แสดงจำนวนชิ้น ขนาดมิติ และน้ำหนัก พร้อมจำนวนเที่ยวที่ขนส่ง (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.prefab_parts_details_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.prefab_parts_details_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.prefab_parts_details_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.prefab_parts_details_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_vehicle_document.vehicle_turning_radius_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                      uploadFile('petition_extended_vehicle_document.vehicle_turning_radius_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_vehicle_document.vehicle_turning_radius_url.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_vehicle_document?.vehicle_turning_radius_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_vehicle_document?.vehicle_turning_radius_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
    </div>
  )
}

export default React.memo<Props>(FormDocumentVehicle)
