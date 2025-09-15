/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';
import { Input } from 'antd';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
}

const FormRemark: React.FC<Props> = (props) => {
  const { control } = props
  const { errors } = useFormState({ control })

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>เหตุผล</h5>
        <div className='block'>
          <Controller
            name="petition_number"
            control={control}
            rules={{
              required: 'กรุณาระบุข้อที่',
              validate: (v) => {
                const s = String(v ?? '').trim();
                // ถ้ารองรับทศนิยมใช้ regex นี้; ถ้าต้องการจำนวนเต็มเปลี่ยนเป็น /^\d+$/
                return /^\d+(\.\d+)?$/.test(s) || 'กรุณากรอกเป็นตัวเลขเท่านั้น';
              },
            }}
            render={({ field }) => (
              <fieldset>
                <label>
                  ขออนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ข้อที่ <span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  className="w-full"
                  size="large"
                  style={{ fontFamily: 'Noto Sans Thai' }}
                  inputMode="decimal"               // มือถือขึ้นคีย์แพดตัวเลข
                  pattern="\d*\.?\d*"               // ช่วย browser validation
                  onChange={(e) => {
                    // อนุญาตเฉพาะตัวเลขและจุดทศนิยม 1 จุด
                    const cleaned = e.target.value
                      .replace(/[^\d.]/g, '')
                      .replace(/(\..*)\./g, '$1');  // ตัดจุดเกิน
                    field.onChange(cleaned);
                  }}
                  onBlur={() => {
                    // trim ช่องว่างเผื่อผู้ใช้วางค่ามี space
                    field.onChange(String(field.value ?? '').trim());
                  }}
                />
                {!!errors.petition_number && (
                  <p className="text-red-500">{errors.petition_number.message}</p>
                )}
              </fieldset>
            )}
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
                  <label>เหตุผลที่ขอ <span className='text-red-500'>*</span></label>
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
