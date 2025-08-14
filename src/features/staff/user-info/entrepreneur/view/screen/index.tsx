/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/executive-data';
import dayjs from 'dayjs';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { FormExecutiveData, FormExecutiveDocument } from '@/features/entrepreneur/entrepreneur-info/components';
import { useAppSelector } from '@/store/hook';

const ViewScreen: FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const userData = useAppSelector(state => state.staff.userData)

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
      business_type: userData?.business_details?.entity_type?.name,
      business_name: userData?.business_details?.business_name,
      business_address: renderBusinessAddress(
        userData?.business_address?.house_number ?? '',
        userData?.business_address?.village ?? '',
        userData?.business_address?.lane ?? '',
        userData?.business_address?.road ?? '',
        userData?.business_address?.province?.name_th ?? '',
        userData?.business_address?.district?.name_th ?? '',
        userData?.business_address?.sub_district?.name_th ?? '',
        userData?.business_address?.zip_codes ?? ''
      ),
      office_tel: userData?.business_address?.phone_number,
      business_no: userData?.registration_no,
      contact_name: userData?.contact_info?.contact_name,
      contact_type: userData?.contact_info?.contact_type.id,
      citizen_id: userData?.contact_info?.cid,
      contact_tel: userData?.contact_info?.phone_number,
      file_id: {
        file: [
          {
            uid: '1',
            name: userData?.profile_url,
            url: userData?.profile_url
          }
        ],
        url: userData?.profile_url
      },
      approved_date: dayjs(userData?.created_at),
      file_copied_of_citizen_id: {
        file: [
          {
            uid: '2',
            name: userData?.documents?.cid_card_file_url,
            url: userData?.documents?.cid_card_file_url
          }
        ],
        url: userData?.documents?.cid_card_file_url
      },
      file_legal_entity_id: {
        file: [
          {
            uid: '3',
            name: userData?.documents?.business_file_url,
            url: userData?.documents?.business_file_url
          }
        ],
        url: userData?.documents?.business_file_url
      },
      file_trasfer_ownership_image_id: {
        file: [
          {
            uid: '4',
            name: userData?.documents?.certificate_file_url,
            url: userData?.documents?.certificate_file_url
          }
        ],
        url: userData?.documents?.certificate_file_url
      },
    },
    disabled: true,
  })

  const { handleSubmit, control, formState: { errors }, setValue } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap'>
        <h3>ข้อมูลผู้ประกอบการ</h3>
        <div className='flex items-center gap-3'>
          <Button
            variant='default'
            size='sm'
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          {/* <Button variant='solid' size='sm' onClick={() => submitRef.current?.click()}>บันทึกข้อมูลใหม่</Button> */}
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

export default memo(ViewScreen)
