/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Upload } from '@/components/ui'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { Control } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';

interface Props {
  control: Control<FieldType>;

}

const FormDocument: React.FC<Props> = (props) => {
  const { control } = props

  console.log(control)

  return (
    <div>
      <section>
        <h5>หลักฐานการแสดงความเป็นเจ้าของกรรมสิทธิ์</h5>
        <p>แนบไฟล์อย่างใดอย่างหนึ่ง</p>
        <div className='block md:grid lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <fieldset>
            <label className='block'>เอกสารถือครองสิทธิ์</label>
            <Upload draggable>
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
          </fieldset>
          <fieldset>
            <label className='block'>สัญญาจ้างหรือเช่า</label>
            <Upload draggable>
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
          </fieldset>
          <fieldset>
            <label className='block'>สัญญาเช่าซื้อ</label>
            <Upload draggable>
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
          </fieldset>
          <fieldset>
            <label className='block'>สัญญามอบสิทธิ์</label>
            <Upload draggable>
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
          </fieldset>
        </div>
      </section >
      <section className='mt-5'>
        <h5>รถบรรทุก</h5>
        <div className='block md:grid lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <fieldset>
            <label className='block'>รูปด้านหน้า</label>
            <Upload draggable>
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
          </fieldset>
          <fieldset>
            <label className='block'>รูปด้านข้าง</label>
            <Upload draggable>
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
          </fieldset>
          <fieldset>
            <label className='block'>รูปด้านหลัง</label>
            <Upload draggable>
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
          </fieldset>
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormDocument)
