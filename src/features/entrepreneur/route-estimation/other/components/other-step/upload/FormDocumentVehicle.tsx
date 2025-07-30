/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Upload } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormDocumentVehicle: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h5>เอกสารยานพาหนะ</h5>
      <div className='block mt-3'>
        <fieldset>
          <label>สำเนาคู่มือจดทะเบียนและประวัติบานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
        <fieldset>
          <label>รูปถ่ายสียานพาหนะ (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
        <fieldset>
          <label>รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
        <fieldset>
          <label>รูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
        <fieldset>
          <label>(ถ้ามี) ชิ้นส่วนสำเร็จรูปให้แสดงจำนวนชิ้น ขนาดมิติ และน้ำหนัก พร้อมจำนวนเที่ยวที่ขนส่ง (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
        <fieldset>
          <label>รูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว (รองรับไฟล์ .pdf เท่านั้น)</label>
          <Upload
            className='flex items-center gap-1'
          >
            <Input
              placeholder='กรุณาเลือกไฟล์'
              size='sm'
            />
            <Button
              size='sm'
              variant='solid'
            >
              เลือก
            </Button>
          </Upload>
        </fieldset>
      </div>
    </div>
  )
}

export default React.memo<Props>(FormDocumentVehicle)
