/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormInfo, FormDocument } from '../components'
import { Button, Notification, toast } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { APIPostBody } from '@/@types/services/vehicle';
import { postVehicleList } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';

interface Props {

}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.layout.loading)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: null,
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

  const { handleSubmit, control, setValue } = form;

  const onSubmit = useCallback(async (value: FieldType) => {
    // BUILD BODY
    const body: APIPostBody = {
      vehicle_detail: {
        vehicle_type_id: value.vehicle_type?.value || '',
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
      const response = await postVehicleList(body)
      if (response.status === 200) {
        toast.push(
          <Notification
            type="success"
            title="สำเร็จ"
            onClose={() => navigate('/vehicle-list/overview')}
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
    }
  }, [navigate, dispatch])

  return (
    <div>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>เพิ่มรายการรถ</h3>
        <div className='flex items-center gap-3'>
          <Button
            variant='default'
            size='sm'
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            variant='solid'
            size='sm'
            loading={loading}
            onClick={() => submitRef.current?.click()}
          >
            บันทึก
          </Button>
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='block xl:grid grid-cols-2 gap-3'>
            <FormInfo
              control={control}
              setValue={setValue}
            />
            <FormDocument
              control={control}
              setValue={setValue}
            />
          </div>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </div>
  )
}

export default React.memo<Props>(CreateScreen)
