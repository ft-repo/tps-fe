/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import React, { useCallback } from 'react'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';
import { postUploadFileAPI, postUploadImageAPI } from '@/services/entrepreneur/VehicleListService';
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { message, Upload } from 'antd';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
}

const FormUpdateDocument: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any, isImage: boolean = false) => {
    let uploadAPI
    if (isImage) {
      uploadAPI = postUploadImageAPI
    } else {
      uploadAPI = postUploadFileAPI
    }
    try {
      // POST
      const response = await uploadAPI({ upload: file[0].originFileObj })
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

  return (
    <div className='mt-5'>
      <section>
        <h5>หลักฐานการแสดงความเป็นเจ้าของกรรมสิทธิ์</h5>
        <p>แนบไฟล์อย่างใดอย่างหนึ่ง</p>
        <div className='block md:grid lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <Controller
            name='file_property_document_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารถือครองสิทธิ์'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เอกสารถือครองสิทธิ์ <span className='text-red-500'>*</span></label>
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
                        uploadFile('file_property_document_id.url', e.fileList)
                      } else {
                        setValue('file_property_document_id.url', '')
                      }
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
                  {!!errors.file_property_document_id?.file &&
                    <p className='text-red-500'>{errors.file_property_document_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_hire_contact_document_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดสัญญาจ้างหรือเช่า'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญาจ้างหรือเช่า <span className='text-red-500'>*</span></label>
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
                        uploadFile('file_hire_contact_document_id.url', e.fileList)
                      } else {
                        setValue('file_hire_contact_document_id.url', '')
                      }
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
                  {!!errors.file_hire_contact_document_id?.file &&
                    <p className='text-red-500'>{errors.file_hire_contact_document_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_purchase_contact_document_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดสัญญาเช่าซื้อ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญาเช่าซื้อ <span className='text-red-500'>*</span></label>
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
                        uploadFile('file_purchase_contact_document_id.url', e.fileList)
                      } else {
                        setValue('file_purchase_contact_document_id.url', '')
                      }
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
                  {!!errors.file_purchase_contact_document_id?.file &&
                    <p className='text-red-500'>{errors.file_purchase_contact_document_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_transfer_contact_document_id.file'
            control={control}
            rules={{
              required: 'กรุณาระบุสัญญามอบสิทธิ์'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญามอบสิทธิ์ <span className='text-red-500'>*</span></label>
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
                        uploadFile('file_transfer_contact_document_id.url', e.fileList)
                      } else {
                        setValue('file_transfer_contact_document_id.url', '')
                      }
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
                  {!!errors.file_transfer_contact_document_id?.file &&
                    <p className='text-red-500'>{errors.file_transfer_contact_document_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
      </section >
      <section className='mt-5'>
        <h5>รถบรรทุก</h5>
        <div className='block md:grid lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <Controller
            name='file_front_image_id.file'
            control={control}
            rules={{
              required: 'กรุณาระบุรูปด้านหน้า'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านหน้า <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
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
                        uploadFile('file_front_image_id.url', e.fileList, true)
                      } else {
                        setValue('file_front_image_id.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.file_front_image_id?.file &&
                    <p className='text-red-500'>{errors.file_front_image_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_side_image_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปด้านข้าง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านข้าง <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
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
                        uploadFile('file_side_image_id.url', e.fileList, true)
                      } else {
                        setValue('file_side_image_id.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.file_side_image_id?.file &&
                    <p className='text-red-500'>{errors.file_side_image_id?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_back_image_id.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปด้านหลัง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านหลัง <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
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
                        uploadFile('file_back_image_id.url', e.fileList, true)
                      } else {
                        setValue('file_back_image_id.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.file_back_image_id?.file &&
                    <p className='text-red-500'>{errors.file_back_image_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default React.memo<Props>(FormUpdateDocument)
