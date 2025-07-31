/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Input } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormRemark: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>เหตุผล</h5>
        <div className='block'>
          <fieldset>
            <label>ขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ข้อที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset className='mt-3'>
            <label>เหตุผลที่ขอ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormRemark)
