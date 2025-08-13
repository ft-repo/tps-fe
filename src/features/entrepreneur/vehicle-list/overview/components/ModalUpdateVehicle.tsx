/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dialog, Notification, toast } from '@/components/ui'
import { useForm } from 'react-hook-form';
import { FormUpdateData, FormUpdateDocument } from '.';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { APIPostBody, VehicleListByIDResponse } from '@/@types/services/vehicle';
import { INIT_VEHICLE_MODAL } from '../screen';
import { getUpload, putVehicleList } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { UploadFile } from 'antd';

interface Props {
  open: boolean;
  data: VehicleListByIDResponse | null;
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse | null, id: string | number }) => void;
  id: string | number;
  refetch: () => void;
}

interface DialogContentProps {
  ref: RefObject<HTMLButtonElement | null>;
  initValue: VehicleListByIDResponse | any;
  fileList: UploadFile[];
  id: string | number;
  refetch: () => void;
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse | null, id: string | number }) => void;
}

const DialogContent = (props: DialogContentProps) => {
  const { ref, initValue, fileList, id, refetch, setOpen } = props;
  const dispatch = useAppDispatch()

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

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: APIPostBody = {
      vehicle_detail: {
        vehicle_type_id: value.vehicle_type || '',
        plate_no: value.license_plate || '',
        plate_province: value.province || '',
        brand: value.vehicle_model || '',
        weight: Number(value.vehicle_weight) || 0,
        color: value.vehicle_color || '',
        kingpin_distance: Number(value.vehicle_distance) || 0,
        width: Number(value.wide_unit) || 0,
        length: Number(value.long_unit) || 0,
        height: Number(value.tall_unit) || 0,
        registration_document_url: value.file_registered_document_id
      },
      vehicle_owner_document: {
        owner_document_url: value.file_property_document_id,
        employment_contact_url: value.file_hire_contact_document_id,
        buyer_contact_url: value.file_purchase_contact_document_id,
        assignment_contact_url: value.file_transfer_contact_document_id
      },
      vehicle_picture: {
        front_rear_url: value.file_front_image_id,
        side_rear_url: value.file_side_image_id,
        back_rear_url: value.file_back_image_id
      }
    }

    // INIT LOADING
    dispatch(setLoading(true))
    // CREATING REQUEST
    try {
      const response = await putVehicleList(id, body)
      if (response.status === 200) {
        toast.push(
          <Notification
            type="success"
            title="สำเร็จ"
          >
            บันทึกข้อมูลสำเร็จ
          </Notification>, {
          placement: 'top-center',
        })
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }

      toast.push(
        <Notification
          type="danger"
          title="ผิดพลาด"
        >
          ไม่สามารถบันทึกข้อมูลได้
        </Notification>, {
        placement: 'top-center',
      })
    } finally {
      dispatch(setLoading(false))
      setOpen(INIT_VEHICLE_MODAL)
      refetch()
    }
  }, [id, dispatch, refetch, setOpen])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='block lg:grid grid-cols-2 gap-5'>
        <FormUpdateData
          control={control}
          setValue={setValue}
          errors={errors}
          defaultFileList={fileList}
        />
        <FormUpdateDocument
          control={control}
          setValue={setValue}
          errors={errors}
          defaultFileList={fileList}
        />
      </div>
      <button ref={ref} hidden type='submit' />
    </form>
  )
}

const ModalUpdateVehicle: React.FC<Props> = (props) => {
  const { open, data, id, setOpen, refetch } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const loading = useAppSelector(state => state.layout.loading)
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\/(business_certificate|business_picture)\/.*/);
    return match ? match[0] : null;
  }, []);

  const extractFileName = useCallback((url: string | null) => {
    const match = url?.match(/\/([^\/]+)$/);
    return match ? match[1] : '';
  }, [])

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
        setFileList(response.map((item, index) => {
          const blobFile = new Blob([item.data], { type: item.data.type })
          const url = URL.createObjectURL(blobFile)
          // RETURN VALUE
          return {
            // crossOrigin: 'use-credentials',
            name: item.data.name || extractFileName(uploadArr[index]),
            // percent: 100,
            uid: String(index),
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: item.data.type,
            originFileObj: blobFile as any,
          }
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
  }, [data, extractUrl, dispatch, extractFileName])

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
            id={id}
            refetch={refetch}
            setOpen={setOpen}
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
