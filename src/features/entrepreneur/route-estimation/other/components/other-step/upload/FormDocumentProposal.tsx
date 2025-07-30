/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Upload } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormDocumentProposal: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h5>เอกสารผู้ประสงค์ขออนุญาต</h5>
      <div className='block mt-3'>
        <fieldset>
          <label>สำเนาบัตรประชาชน (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>สำเนาหนังสือรับรองนิติบุคคล (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>แบบคำขออนุยาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          <label>หนังสือมอบอำนาจพร้อมตราประทับของผู้มีอำนาจลงนามแทนบริษัทหรือห้างหุ้นส่วน (รองรับไฟล์ .pdf เท่านั้น)</label>
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

export default React.memo<Props>(FormDocumentProposal)
