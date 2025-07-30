/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react' 
import { Input, Upload } from '@/components/ui'
import { FaUpload as UploadIcon } from "react-icons/fa6";

interface Props {

}

const FormPermitDocument: React.FC<Props> = (props) => {
  const { } = props

  return (
    <main>
      <div className='block xl:grid grid-cols-2 gap-3'>
        <fieldset>
          <h5>รถลากจูง</h5>
          <label>เลขทะเบียน / เลขตัวรถ</label>
          <Input
            placeholder='กรุณาระบุ'
          />
        </fieldset>
        <fieldset>
          <h5>รถกึ่งพ่วง</h5>
          <label>เลขทะเบียน / เลขตัวรถ</label>
          <Input
            placeholder='กรุณาระบุ'
          />
        </fieldset>
      </div>
      <div className='block xl:grid grid-cols-3 gap-3 mt-3'>
        <fieldset>
          <label>รูปแบบที่แสดงมิติ รถลากจูง (ถ้ามี)</label>
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
          <label>รูปแบบที่แสดงมิติ รถกึ่งพ่วง (ถ้ามี)</label>
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
          <label>รูปแบบที่แสดงมิติ สินค้า / เครื่องจักร (ถ้ามี)</label>
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
          <label>รูปแบบยานพาหนะรวมสิ่งของ (ถ้ามี)</label>
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
          <label>รูปแบบที่แสดงรัศมีวงเลี่ยว (ถ้ามี)</label>
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
          <label>เอกสารขออนุญาตจาก ทล. (ถ้ามี)</label>
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
          <label>เลขที่ขออนุญาตเดิมจาก ทล. (ถ้ามี)</label>
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
          <label>เอกสารขออนุญาตจาก ทช. (ถ้ามี)</label>
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
          <label>เลขที่ขออนุญาตเดิมจาก ทช. (ถ้ามี)</label>
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
    </main>
  )
}

export default React.memo<Props>(FormPermitDocument)
