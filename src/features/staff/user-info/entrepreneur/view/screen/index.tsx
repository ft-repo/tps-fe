/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormExecutiveData, FormExecutiveDocument } from '@/features/entrepreneur/entrepreneur-info/components';
import { useForm } from 'react-hook-form';
import { APIPutBody, FieldType } from '@/@types/entrepreneur/executive-data';
import { Button } from '@/components/ui';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUserData } from '@/store/slices/entrepreneur';
import dayjs from 'dayjs';
import { putUserAPI } from '@/services/entrepreneur/UserService';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {
  fileList: any[];
}

const ViewScreen: React.FC<Props> = (props) => {
  const { fileList } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { detail } = useAppSelector(state => state.staff.staff.client)
  const loading = useAppSelector(state => state.layout.loading)
  const navigate = useNavigate()

  const renderBusinessAddress = useCallback((
    houseNumber: string,
    village: string,
    lane: string,
    road: string,
    province: string,
    district: string,
    subDistrict: string,
    zipCode: string
  ) => {
    const addressArr = [
      houseNumber || null,
      village || null,
      lane || null,
      road || null,
      province || null,
      district || null,
      subDistrict || null,
      zipCode || null
    ]
    return addressArr.join(' ').trim()
  }, [])

  const form = useForm<FieldType>({
    defaultValues: {
      business_type: detail.business_details.entity_type.name,
      business_name: detail.business_details.business_name,
      business_address: renderBusinessAddress(
        detail.business_address.house_number,
        detail.business_address.village,
        detail.business_address.lane,
        detail.business_address.road,
        detail.business_address.province.name_th,
        detail.business_address.district.name_th,
        detail.business_address.sub_district.name_th,
        detail.business_address.zip_codes
      ),
      office_tel: detail.business_address.phone_number,
      business_no: detail.registration_no,
      contact_name: detail.contact_info.contact_name,
      contact_type: Number(detail.contact_info.contact_type.id),
      citizen_id: detail.contact_info.cid,
      contact_tel: detail.contact_info.phone_number,
      file_id: {
        file: fileList.length ? [fileList[0] || { uid: '1', name: detail.profile_url, url: detail.profile_url }] : [],
        url: detail.profile_url
      },
      approved_date: dayjs(detail.created_at),
      file_copied_of_citizen_id: {
        file: fileList.length ? [fileList[1] || { uid: '2', name: detail.documents.cid_card_file_url, url: detail.documents.cid_card_file_url }] : [],
        url: detail.documents.cid_card_file_url
      },
      file_legal_entity_id: {
        file: fileList.length ? [fileList[2] || { uid: '3', name: detail.documents.business_file_url, url: detail.documents.business_file_url }] : [],
        url: detail.documents.business_file_url
      },
      file_trasfer_ownership_image_id: {
        file: fileList.length ? [fileList[3] || { uid: '4', name: detail.documents.certificate_file_url, url: detail.documents.certificate_file_url }] : [],
        url: detail.documents.certificate_file_url
      },
    },
    disabled: true
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = form

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: APIPutBody = {
      profile_url: value.file_id.url,
      important_info: {
        business_phone_number: value.office_tel,
        contact_name: value.contact_name,
        contact_type_id: Number(value.contact_type),
        cid: value.citizen_id,
        contact_phone_number: value.contact_tel
      },
      business_document: {
        cid_card_file_url: value.file_copied_of_citizen_id.url,
        certificate_file_url: value.file_trasfer_ownership_image_id.url,
        business_file_url: value.file_legal_entity_id.url,
      }
    }

    dispatch(setLoading(true))
    try {
      const response = await putUserAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => dispatch(getUserData()),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
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
  }, [dispatch])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap'>
        <h3>ข้อมูลผู้ประกอบการ</h3>
        <div className='flex items-center gap-3'>
          <Button
            variant='default'
            size='sm'
            loading={loading}
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          {/* <Button
            variant='default'
            size='sm'
            loading={loading}
            onClick={() => dispatch(getUserData())}
          >
            ย้อนกลับข้อมูลก่อนหน้า
          </Button>
          <Button
            variant='solid'
            size='sm'
            loading={loading}
            onClick={() => submitRef.current?.click()}
          >
            บันทึกข้อมูลใหม่
          </Button> */}
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='block xl:grid grid-cols-2 gap-5'>
            <FormExecutiveData
              control={control}
              errors={errors}
              setValue={setValue}
            />
            <FormExecutiveDocument
              control={control}
              errors={errors}
              setValue={setValue}
            />
          </div>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </>
  )
}

export default React.memo<Props>(ViewScreen)
