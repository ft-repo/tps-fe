/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormInfo, FormDocument } from '../components'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { APIPostBody } from '@/@types/services/vehicle';
import { postVehicleAPI } from '@/services/entrepreneur/VehicleListService';
import { getProductType, setLoading, useAppDispatch, useAppSelector } from '@/store';
import { Button, Modal } from 'antd';
import { getVehicleData } from '@/store/slices/entrepreneur';

interface Props {

}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.layout.loading)
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const { province } = useAppSelector(state => state.master)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: null,
      license_plate: '',
      vehicle_model: '',
      province: null,
      vehicle_weight: '',
      vehicle_color: '',
      vehicle_distance: '',
      wide_unit: '',
      long_unit: '',
      tall_unit: '',
      vehicle_axles: null,
      file_registered_document_id: {
        file: [],
        url: ''
      },
      file_property_document_id: {
        file: [],
        url: ''
      },
      file_hire_contact_document_id: {
        file: [],
        url: ''
      },
      file_purchase_contact_document_id: {
        file: [],
        url: ''
      },
      file_transfer_contact_document_id: {
        file: [],
        url: ''
      },
      file_front_image_id: {
        file: [],
        url: ''
      },
      file_side_image_id: {
        file: [],
        url: ''
      },
      file_back_image_id: {
        file: [],
        url: ''
      },
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
  } = form;

  const onSubmit = useCallback(async (value: FieldType) => {
    // BUILD BODY
    const body: APIPostBody = {
      vehicle_detail: {
        vehicle_type_id: value.vehicle_type || '',
        // plate_no: value.vehicle_type === 3 ? [...value.license_plate].join(',') : value.license_plate,
        plate_no: value.license_plate || '',
        plate_province: province.find(item => item.id === value.province)?.name_th || '',
        brand: value.vehicle_model || '',
        weight: Number(value.vehicle_weight) || 0,
        color: value.vehicle_color || '',
        kingpin_distance: Number(value.vehicle_distance) || 0,
        width: Number(value.wide_unit) || 0,
        length: Number(value.long_unit) || 0,
        height: Number(value.tall_unit) || 0,
        // axis_number: Number(value.vehicle_axles) || 0,
        axis_type_id: Number(value.vehicle_axles) || null,
        registration_document_url: value.file_registered_document_id.url
      },
      vehicle_owner_document: {
        owner_document_url: value.file_property_document_id.url,
        employment_contact_url: value.file_hire_contact_document_id.url,
        buyer_contact_url: value.file_purchase_contact_document_id.url,
        assignment_contact_url: value.file_transfer_contact_document_id.url
      },
      vehicle_picture: {
        front_rear_url: value.file_front_image_id.url,
        side_rear_url: value.file_side_image_id.url,
        back_rear_url: value.file_back_image_id.url
      }
    }
    // INIT LOADING
    dispatch(setLoading(true))
    // CREATING REQUEST
    try {
      const response = await postVehicleAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            navigate('/vehicle-list/overview')
            dispatch(getVehicleData(vehicle.overview.search))
            dispatch(getProductType())
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [navigate, dispatch, vehicle.overview.search, province])

  return (
    <div>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>เพิ่มรายการรถ</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => submitRef.current?.click()}
          >
            บันทึก
          </Button>
          {/* <Button
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
          </Button> */}
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
