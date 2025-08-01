/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Input } from '@/components/ui'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<FieldTypeForOther>;
}

const FormRemark: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>เหตุผล</h5>
        <div className='block'>
          <Controller
            name='petition_number'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ข้อที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='remark'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เหตุผลที่ขอ</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormRemark)
