/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Upload } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormDocumentApproval: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h5>เอกสารรายการคำนวณและหนังสือรับรอง</h5>
      <div className='block mt-3'>
        <fieldset>
          <label>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>(ถ้ามี) รูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>(ถ้ามี) รูปแผนที่เส้นทางเดินบนทางหลวง (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>แผนและระยะเวลาการดำเนินงาน (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>(ถ้ามี) ที่อยู่และอีเมลในการจัดส่งเอกสาร (รองรับไฟล์ .pdf เท่านั้น)</label>
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

export default React.memo<Props>(FormDocumentApproval)
