/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { RefObject, useCallback, useRef } from 'react'
import { Button, Dialog } from '@/components/ui'
import { useForm } from 'react-hook-form';
import { FormUpdateData, FormUpdateDocument } from '.';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { DialogProps } from '@/@types/shared';

interface Props {
  open: boolean;
  setOpen: (open: DialogProps) => void;
}

interface DialogContentProps {
  ref: RefObject<HTMLButtonElement | null>;
}

const DialogContent = (props: DialogContentProps) => {
  const { ref } = props;

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: '',
      license_plate: '',
      vehicle_model: '',
      province: '',
      vehicle_weight: '',
      vehicle_distance: '',
      vehicle_color: '',
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

  const { handleSubmit, control ,setValue} = form;

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='block lg:grid grid-cols-2 gap-5'>
        <FormUpdateData
          control={control}
        />
        <FormUpdateDocument
          control={control}
          setValue={setValue}
        />
      </div>
      <button ref={ref} hidden type='submit' />
    </form>
  )
}

const ModalUpdateVehicle: React.FC<Props> = (props) => {
  const { open, setOpen } = props
  const submitRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog
      isOpen={open}
      width={1400}
      // height={800}
      onClose={() => setOpen({ open: false })}
    >
      <section className='h-[40rem] overflow-y-scroll'>
        <h3>แก้ไขข้อมูล</h3>
        <DialogContent
          ref={submitRef}
        />
      </section>
      <section className='text-right'>
        <Button
          size='sm'
          variant='default'
          className='mr-3'
          onClick={() => setOpen({ open: false })}
        >
          ยกเลิก
        </Button>
        <Button
          type='submit'
          size='sm'
          variant='solid'
          color='blue-500'
          onClick={() => submitRef.current?.click()}
        >
          บันทึก
        </Button>
      </section>
    </Dialog >
  )
}

export default React.memo<Props>(ModalUpdateVehicle)
