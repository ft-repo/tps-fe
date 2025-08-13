/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
// import { Upload } from '@/components/ui';
import React, { useCallback } from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
// import { FaUpload as UploadIcon } from "react-icons/fa6";
import { postUploadFileAPI, postUploadImageAPI } from '@/services/entrepreneur/VehicleListService';
import { Upload as CustomUpload } from '@/components/custom/upload';
import { UploadFile } from 'antd';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
  errors: FieldErrors<FieldType>;
  defaultFileList: UploadFile[];
}

const FormUpdateDocument: React.FC<Props> = (props) => {
  const { control, setValue, errors, defaultFileList } = props

  const uploadFile = useCallback(async (fieldName: string, file: any, isImage: boolean = false) => {
    // console.log(file)
    let uploadAPI
    if (isImage) {
      uploadAPI = postUploadImageAPI
    } else {
      uploadAPI = postUploadFileAPI
    }
    try {
      // POST
      // const response = await uploadAPI({ upload: file[0] })
      const response = await uploadAPI({ upload: file.file })
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
    <div className='mt-5'>
      <section className='mb-3'>
        <h5>แก้ไขหลักฐานการแสดงความเป็นเจ้าของกรรมสิทธิ์</h5>
        <p>แนบไฟล์อย่างใดอย่างหนึ่ง</p>
      </section>
      <section className='mt-3'>
        <div className='block sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-3'>
          <Controller
            name='file_property_document_id'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารถือครองสิทธิ์'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เอกสารถือครองสิทธิ์</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[1]]}
                    fileList={[defaultFileList[1]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[1]]}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
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
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญาจ้างหรือเช่า</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[2]]}
                    fileList={[defaultFileList[2]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[2]]}

                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
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
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญาเช่าซื้อ</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[3]]}
                    fileList={[defaultFileList[3]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[3]]}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
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
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สัญญามอบสิทธิ์</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[4]]}
                    fileList={[defaultFileList[4]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[4]]}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
                  {!!errors.file_transfer_contact_document_id &&
                    <p className='text-red-500'>{errors.file_transfer_contact_document_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='file_front_image_id'
            control={control}
            rules={{
              required: 'กรุณาระบุรูปด้านหน้า'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านหน้า</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[5]]}
                    fileList={[defaultFileList[5]]}
                    onChange={(file) => uploadFile('file_front_image_id', file, true)}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[5]]}
                    onChange={(file) => uploadFile('file_front_image_id', file, true)}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
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
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านข้าง</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[6]]}
                    fileList={[defaultFileList[6]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[6]]}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
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
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปด้านหลัง</label>
                  <CustomUpload
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[7]]}
                    fileList={[defaultFileList[7]]}
                  />
                  {/* <Upload
                    draggable
                    className='block'
                    uploadLimit={1}
                    fileList={[fileList[7]]}
                  >
                    <div className="my-3 text-center">
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
                  </Upload> */}
                  {!!errors.file_back_image_id &&
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
