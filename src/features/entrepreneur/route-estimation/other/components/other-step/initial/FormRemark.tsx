/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Input } from 'antd';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  errors: FieldErrors<FieldTypeForOther>;
}

const FormRemark: React.FC<Props> = (props) => {
  const { control, errors } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>เหตุผล</h5>
        <div className='block'>
          <Controller
            name='petition_number'
            control={control}
            rules={{
              required: 'กรุณาระบุขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ข้อที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.petition_number &&
                    <p className='text-red-500'>{errors.petition_number.message}</p>
                  }
                </fieldset>
              )
            }}
          />
          <Controller
            name='remark'
            control={control}
            rules={{
              required: 'กรุณาระบุเหตุผลที่ขอ'
            }}
            render={({ field }) => {
              return (
                <fieldset className='mt-3'>
                  <label>เหตุผลที่ขอ</label>
                  <Input.TextArea
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    rows={8}
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.remark &&
                    <p className='text-red-500'>{errors.remark.message}</p>
                  }
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
