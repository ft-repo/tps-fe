/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { FieldType } from '@/@types/entrepreneur/executive-data'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { postUploadImageAPI } from '@/services/entrepreneur/VehicleListService';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
}

const FormExecutiveDocument: React.FC<Props> = (props) => {
  const { control, setValue } = props

  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadImageAPI({ upload: file[0].originFileObj })
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
    <div>
      <h5>เอกสารและหลักฐานนิติบุคคล</h5>
      <div className='block lg:grid grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
        <Controller
          name='file_copied_of_citizen_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปสำเนาบัตรประชาชนผู้มีอำนาจ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>สำเนาบัตรประชาชนผู้มีอำนาจ <span className='text-red-500'>*</span></label>
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
                      uploadFile('file_copied_of_citizen_id.url', e.fileList)
                    } else {
                      setValue('file_copied_of_citizen_id.url', '')
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
                        กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                      </p>
                    </div>
                  }
                </Upload>
                {!!errors.file_copied_of_citizen_id?.file &&
                  <p className='text-red-500'>{errors.file_copied_of_citizen_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
        {/* <Controller
          name='file_trasfer_ownership_image_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปหนังสือรับรองนิติบุคคล'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หนังสือรับรองนิติบุคคล <span className='text-red-500'>*</span></label>
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
                      uploadFile('file_trasfer_ownership_image_id.url', e.fileList)
                    } else {
                      setValue('file_trasfer_ownership_image_id.url', '')
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
                        กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                      </p>
                    </div>
                  }
                </Upload>
                {!!errors.file_trasfer_ownership_image_id?.file &&
                  <p className='text-red-500'>{errors.file_trasfer_ownership_image_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        /> */}
        <Controller
          name='file_legal_entity_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ <span className='text-red-500'>*</span></label>
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
                      uploadFile('file_legal_entity_id.url', e.fileList)
                    } else {
                      setValue('file_legal_entity_id.url', '')
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
                        กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                      </p>
                    </div>
                  }
                </Upload>
                {!!errors.file_legal_entity_id?.file &&
                  <p className='text-red-500'>{errors.file_legal_entity_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
    </div>
  )
}

export default React.memo<Props>(FormExecutiveDocument)
