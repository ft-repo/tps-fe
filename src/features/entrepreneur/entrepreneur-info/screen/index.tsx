/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormExecutiveData, FormExecutiveDocument } from '../components';
import { useForm } from 'react-hook-form';
import { APIPutBody, FieldType } from '@/@types/entrepreneur/executive-data';
import { Button } from '@/components/ui';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUserData } from '@/store/slices/entrepreneur';
import dayjs from 'dayjs';
import { putUserAPI } from '@/services/entrepreneur/UserService';
import { Modal } from 'antd';

interface Props {
}

const ExecutiveDataScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.entrepreneur.user)
  const loading = useAppSelector(state => state.layout.loading)

  console.log(userData)

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
      business_type: userData.important_info.entity_name,
      business_name: userData.important_info.business_name,
      business_address: renderBusinessAddress(
        userData.important_info.business_address.house_number,
        userData.important_info.business_address.village,
        userData.important_info.business_address.lane,
        userData.important_info.business_address.road,
        userData.important_info.business_address.province,
        userData.important_info.business_address.district,
        userData.important_info.business_address.sub_district,
        userData.important_info.business_address.zip_code
      ),
      office_tel: userData.important_info.business_phone_number,
      business_no: userData.important_info.registration_no,
      contact_name: userData.important_info.contact_name,
      contact_type: userData.important_info.contact_type.id,
      citizen_id: userData.important_info.cid,
      contact_tel: userData.important_info.contact_phone_number,
      file_id: {
        file: [
          {
            uid: '1',
            name: userData.profile_url,
            url: userData.profile_url
          }
        ],
        url: userData.profile_url
      },
      approved_date: dayjs(userData.important_info.permission_date),
      file_copied_of_citizen_id: {
        file: [
          {
            uid: '2',
            name: userData.business_document.cid_card_file_url,
            url: userData.business_document.cid_card_file_url
          }
        ],
        url: userData.business_document.cid_card_file_url
      },
      file_legal_entity_id: {
        file: [
          {
            uid: '3',
            name: userData.business_document.business_file_url,
            url: userData.business_document.business_file_url
          }
        ],
        url: userData.business_document.business_file_url
      },
      file_trasfer_ownership_image_id: {
        file: [
          {
            uid: '4',
            name: userData.business_document.certificate_file_url,
            url: userData.business_document.certificate_file_url
          }
        ],
        url: userData.business_document.certificate_file_url
      },
    },
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
          </Button>
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

export default React.memo<Props>(ExecutiveDataScreen)
