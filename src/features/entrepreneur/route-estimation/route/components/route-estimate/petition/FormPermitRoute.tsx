/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { DatePicker, Input, Select, Upload } from '@/components/ui'
import { FaUpload as UploadIcon } from "react-icons/fa6";

interface Props {

}

const FormPermitRoute: React.FC<Props> = (props) => {
  const { } = props

  return (
    <main>
      <section>
        <div className='block md:grid grid-cols-2 gap-3'>
          <div className='col-span-2'>
            <fieldset>
              <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน)</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>วันที่ (เริ่มต้น)</label>
            <DatePicker
              placeholder='กรุณาเลือกวันที่'
            />
          </fieldset>
          <fieldset>
            <label>วันที่ (สิ้นสุด)</label>
            <DatePicker
              placeholder='กรุณาเลือกวันที่'
            />
          </fieldset>
          <div className='col-span-2'>
            <fieldset>
              <label>ชื่อโครงการ</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>ขนส่งจาก</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>จังหวัด</label>
            <Select
              placeholder='กรุณาเลือก'
              options={[]}
            />
          </fieldset>
          <fieldset>
            <label>ไปยัง</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>จังหวัด</label>
            <Select
              placeholder='กรุณาเลือก'
              options={[]}
            />
          </fieldset>
        </div>
      </section>
      <section className='mt-5'>
        <h5>เอกสารสำคัญ</h5>
        <div className='block md:grid grid-cols-2 2xl:grid-cols-3 gap-3'>
          <fieldset>
            <label>หนังสือมอบอำนาจ</label>
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
            <label>หนังสือวิศวะเครื่องกล</label>
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
    </main>
  )
}

export default React.memo<Props>(FormPermitRoute)
