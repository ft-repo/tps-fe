/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import { Upload } from '@/components/ui';
import React from 'react'
import { Control } from 'react-hook-form';
import { FaUpload as UploadIcon } from "react-icons/fa6";

interface Props {
  control: Control<FieldType>;
}

const FormUpdateDocument: React.FC<Props> = (props) => {
  const { control } = props

  console.log(control)

  return (
    <div className='mt-5'>
      <section className='mb-3'>
        <h5>แก้ไขหลักฐานการแสดงความเป็นเจ้าของกรรมสิทธิ์</h5>
        <p>แนบไฟล์อย่างใดอย่างหนึ่ง</p>
      </section>
      <section className='mt-3'>
        <div className='block sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-3'>
          <fieldset>
            <label>เอกสารถือครองสิทธิ์</label>
            <Upload
              draggable
              className='block'
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
            </Upload>
          </fieldset>
          <fieldset>
            <label>สัญญาจ้างหรือเช่า</label>
            <Upload
              draggable
              className='block'
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
            </Upload>
          </fieldset>
          <fieldset>
            <label>สัญญาเช่าซื้อ</label>
            <Upload
              draggable
              className='block'
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
            </Upload>
          </fieldset>
          <fieldset>
            <label>สัญญามอบสิทธิ์</label>
            <Upload
              draggable
              className='block'
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
            </Upload>
          </fieldset>
          <fieldset>
            <label className='block'>รูปด้านหน้า</label>
            <Upload draggable>
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
            </Upload>
          </fieldset>
          <fieldset>
            <label className='block'>รูปด้านข้าง</label>
            <Upload draggable>
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
            </Upload>
          </fieldset>
          <fieldset>
            <label className='block'>รูปด้านหลัง</label>
            <Upload draggable>
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
            </Upload>
          </fieldset>
        </div>
      </section>
    </div>
  )
}

export default React.memo<Props>(FormUpdateDocument)
