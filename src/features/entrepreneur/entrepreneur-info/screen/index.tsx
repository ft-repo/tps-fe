/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormExecutiveData, FormExecutiveDocument } from '../components';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/entrepreneur-info';
import dayjs from 'dayjs';
import { Button } from '@/components/ui';

interface Props {
}

const ExecutiveDataScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      business_type: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
      business_name: 'ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด',
      business_address: 'บ้านเลขที่ 99/1 หมู่ที่ 5 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
      office_tel: '02-123-4567',
      business_no: '0105557001234',
      contact_name: 'ชญานิษฐ์ พงศ์เกษมชัย',
      contact_type: 'ผู้มอบอำนาจ',
      citizen_id: '1 2345 67890 12 3',
      contact_tel: '',
      file_id: '',
      approved_date: dayjs().format('YYYY-MM-DD'),
      file_copied_of_citizen_id: '',
      file_legal_entity_id: '',
      file_trasfer_ownership_image_id: '',
    },
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <>
      <section className='flex justify-between items-center'>
        <h5>ข้อมูลผู้ประกอบการ</h5>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm'>ย้อนกลับข้อมูลก่อนหน้า</Button>
          <Button variant='solid' size='sm' onClick={() => submitRef.current?.click()}>บันทึกข้อมูลใหม่</Button>
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='block xl:grid grid-cols-2 gap-5'>
            <FormExecutiveData
              control={control}
            />
            <FormExecutiveDocument
              control={control}
            />
          </div>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </>
  )
}

export default React.memo<Props>(ExecutiveDataScreen)
