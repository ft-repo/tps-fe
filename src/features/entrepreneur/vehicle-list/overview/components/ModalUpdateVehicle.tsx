/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dialog } from '@/components/ui'
import { useForm } from 'react-hook-form';
import { FormUpdateData, FormUpdateDocument } from '.';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { APIPutBody, VehicleListByIDResponse } from '@/@types/services/vehicle';
import { INIT_VEHICLE_MODAL } from '../screen';
import { getUpload } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';

interface Props {
  open: boolean;
  data: VehicleListByIDResponse | null;
  setOpen: ({ open, data }: { open: boolean, data: VehicleListByIDResponse | null }) => void;
}

interface DialogContentProps {
  ref: RefObject<HTMLButtonElement | null>;
  initValue: VehicleListByIDResponse | any;
  fileList: File[];
}

const DialogContent = (props: DialogContentProps) => {
  const { ref, initValue, fileList } = props;

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: initValue.vehicle_detail.vehicle_type_id || null,
      license_plate: initValue.vehicle_detail.plate_no || '',
      vehicle_model: initValue.vehicle_detail.brand || '',
      province: initValue.vehicle_detail.plate_province || '',
      vehicle_weight: initValue.vehicle_detail.weight || 0,
      vehicle_distance: initValue.vehicle_detail.kingpin_distance || 0,
      vehicle_color: initValue.vehicle_detail.color || '',
      wide_unit: initValue.vehicle_detail.width || 0,
      long_unit: initValue.vehicle_detail.length || 0,
      tall_unit: initValue.vehicle_detail.height || 0,
      file_registered_document_id: initValue.vehicle_detail.registration_document_url || '',
      file_property_document_id: initValue.vehicle_owner_documents.owner_document_url || '',
      file_hire_contact_document_id: initValue.vehicle_owner_documents.employment_contact_url || '',
      file_purchase_contact_document_id: initValue.vehicle_owner_documents.buyer_contact_url || '',
      file_transfer_contact_document_id: initValue.vehicle_owner_documents.assignment_contact_url || '',
      file_front_image_id: initValue.vehicle_pictures.front_rear_url || '',
      file_side_image_id: initValue.vehicle_pictures.side_rear_url || '',
      file_back_image_id: initValue.vehicle_pictures.back_rear_url || '',
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = form;

  const onSubmit = useCallback((value: FieldType) => {
    const body: APIPutBody = {
      vehicle_detail: {
        brand: value.vehicle_model || '',
        color: value.vehicle_color || '',
        kingpin_distance: value.vehicle_distance || 0,
        width: value.wide_unit || 0
      },
      vehicle_picture: {
        front_rear_url: value.file_front_image_id || ''
      }
    }

    console.log(body)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='block lg:grid grid-cols-2 gap-5'>
        <FormUpdateData
          control={control}
          setValue={setValue}
          errors={errors}
          fileList={fileList}
        />
        <FormUpdateDocument
          control={control}
          setValue={setValue}
          errors={errors}
          fileList={fileList}
        />
      </div>
      <button ref={ref} hidden type='submit' />
    </form>
  )
}

const ModalUpdateVehicle: React.FC<Props> = (props) => {
  const { open, data, setOpen } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const [fileList, setFileList] = useState<File[]>([])
  const loading = useAppSelector(state => state.layout.loading)
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\/(business_certificate|business_picture)\/.*/);
    return match ? match[0] : null;
  }, []);

  const getUploadList = useCallback(async () => {
    // CHECK IF DATA EXISTED
    if (!data) return
    dispatch(setLoading(true))

    const uploadArr = [
      extractUrl(data?.vehicle_detail.registration_document_url || ''),
      extractUrl(data?.vehicle_owner_documents.owner_document_url || ''),
      extractUrl(data?.vehicle_owner_documents.employment_contact_url || ''),
      extractUrl(data?.vehicle_owner_documents.buyer_contact_url || ''),
      extractUrl(data?.vehicle_owner_documents.assignment_contact_url || ''),
      extractUrl(data?.vehicle_pictures.front_rear_url || ''),
      extractUrl(data?.vehicle_pictures.side_rear_url || ''),
      extractUrl(data?.vehicle_pictures.back_rear_url || ''),
    ]

    try {
      const response = await Promise.all(uploadArr.map(item => getUpload(item as string)))
      const result = response.every(item => item.status === 200)
      if (result) {
        setFileList(response.map((item) => {
          return new File([item.data], `${item.data.name}.png`, { type: "image/png"})
        }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [data, extractUrl, dispatch])

  useEffect(() => {
    if (open) {
      getUploadList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!data) return

  return (
    <Dialog
      isOpen={open}
      width={1400}
      // height={800}
      onClose={() => setOpen(INIT_VEHICLE_MODAL)}
    >
      <section className='h-[40rem] overflow-y-scroll'>
        <h3>แก้ไขข้อมูล</h3>
        {!loading ?
          <DialogContent
            ref={submitRef}
            initValue={data}
            fileList={fileList}
          />
          : 'Loading...'}
      </section>
      <section className='text-right'>
        <Button
          size='sm'
          variant='default'
          className='mr-3'
          onClick={() => setOpen(INIT_VEHICLE_MODAL)}
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
