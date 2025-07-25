/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormInfo, FormDocument } from '../components'
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';

interface Props {

}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: '',
      license_plate: '',
      vehicle_model: '',
      province: '',
      vehicle_weight: '',
      vehicle_color: '',
      vehicle_distance: '',
      wide_unit: '',
      long_unit: '',
      tall_unit: '',
      file_registered_document_id: '',
      file_property_document_id: '',
      file_hire_contact_document_id: '',
      file_purchase_contact_document_id: '',
      file_transfer_contact_document_id: '',
      file_front_image_id: '',
      file_side_image_id: '',
      file_back_image_id: '',
    }
  })

  const { handleSubmit, control } = form;

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <div>
      <section className='flex justify-between items-center'>
        <h3>เพิ่มรายการรถ</h3>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm' onClick={() => navigate(-1)}>ย้อนกลับ</Button>
          <Button variant='solid' size='sm' onClick={() => submitRef.current?.click()}>บันทึก</Button>
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='block xl:grid grid-cols-2 gap-3'>
            <FormInfo
              control={control}
            />
            <FormDocument
              control={control}
            />
          </div>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </div>
  )
}

export default React.memo<Props>(CreateScreen)
