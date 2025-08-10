/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Upload } from '@/components/ui'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { postUploadFile, postUploadImage } from '@/services/entrepreneur/VehicleListService';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
  errors: FieldErrors<FieldType>;
}

const FormDocument: React.FC<Props> = (props) => {
  const { control, setValue, errors } = props

  const uploadFile = useCallback(async (fieldName: string, file: any, isImage: boolean = false) => {
    let uploadAPI
    if (isImage) {
      uploadAPI = postUploadImage
    } else {
      uploadAPI = postUploadFile
    }
    try {
      // POST
      const response = await uploadAPI({ upload: file[0] })
      if (response.status === 200) {
        setValue([fieldName] as any, response.data?.url)
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
      <section>
        <h5>หลักฐานการแสดงความเป็นเจ้าของกรรมสิทธิ์</h5>
        <p>แนบไฟล์อย่างใดอย่างหนึ่ง</p>
        <div className='block md:grid lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <Controller
            name='file_property_document_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารถือครองสิทธิ์'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>เอกสารถือครองสิทธิ์</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_property_document_id', file)}
                  >
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
                  </Upload>
                  {!!errors.file_property_document_id &&
                    <p className='text-red-500'>{errors.file_property_document_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_hire_contact_document_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดสัญญาจ้างหรือเช่า'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>สัญญาจ้างหรือเช่า</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_hire_contact_document_id', file)}
                  >
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
                  </Upload>
                  {!!errors.file_hire_contact_document_id &&
                    <p className='text-red-500'>{errors.file_hire_contact_document_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_purchase_contact_document_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดสัญญาเช่าซื้อ'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>สัญญาเช่าซื้อ</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_purchase_contact_document_id', file)}
                  >
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
                  </Upload>
                  {!!errors.file_purchase_contact_document_id &&
                    <p className='text-red-500'>{errors.file_purchase_contact_document_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_transfer_contact_document_id'
            control={control}
            rules={{
              required: 'กรุณาระบุสัญญามอบสิทธิ์'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>สัญญามอบสิทธิ์</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_transfer_contact_document_id', file)}
                  >
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
                  </Upload>
                  {!!errors.file_transfer_contact_document_id &&
                    <p className='text-red-500'>{errors.file_transfer_contact_document_id.message}</p>
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
            name='file_front_image_id'
            control={control}
            rules={{
              required: 'กรุณาระบุรูปด้านหน้า'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>รูปด้านหน้า</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_front_image_id', file, true)}
                  >
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
                  </Upload>
                  {!!errors.file_front_image_id &&
                    <p className='text-red-500'>{errors.file_front_image_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_side_image_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปด้านข้าง'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>รูปด้านข้าง</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_side_image_id', file, true)}
                  >
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
                  </Upload>
                  {!!errors.file_side_image_id &&
                    <p className='text-red-500'>{errors.file_side_image_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_back_image_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปด้านหลัง'
            }}
            render={() => {
              return (
                <fieldset>
                  <label>รูปด้านหลัง</label>
                  <Upload
                    draggable
                    uploadLimit={1}
                    className='block'
                    onChange={(file) => uploadFile('file_back_image_id', file, true)}
                  >
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
                  </Upload>
                  {!!errors.file_back_image_id &&
                    <p className='text-red-500'>{errors.file_back_image_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormDocument)
