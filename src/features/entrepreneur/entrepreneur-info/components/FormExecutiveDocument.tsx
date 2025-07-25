/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FieldType } from '@/@types/entrepreneur/entrepreneur-info'
import { Upload } from '@/components/ui'
import { Control } from 'react-hook-form'
import { FaUpload as UploadIcon } from "react-icons/fa6";

interface Props {
  control: Control<FieldType>
}

const FormExecutiveDocument: React.FC<Props> = (props) => {
  const { control } = props

  console.log(control)

  return (
    <div>
      <h3>เอกสารและหลักฐานนิติบุคคล</h3>
      <div className='block xl:grid grid-cols-3 gap-5 mt-5'>
        <fieldset>
          <label>สำเนาบัตรประชาชนผู้มีอำนาจ</label>
          <Upload
            draggable
            className='block'
          >
            <div className="my-10 text-center">
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
          <label>หนังสือรับรองนิติบุคคล</label>
          <Upload
            draggable
            className='block'
          >
            <div className="my-10 text-center">
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
          <label>รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ</label>
          <Upload
            draggable
            className='block'
          >
            <div className="my-10 text-center">
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
    </div>
  )
}

export default React.memo<Props>(FormExecutiveDocument)
