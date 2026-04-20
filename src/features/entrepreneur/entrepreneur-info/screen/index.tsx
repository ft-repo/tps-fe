/* eslint-disable no-useless-escape */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormExecutiveData, FormExecutiveDocument, FormGeneralUser } from '../components';
import { useForm } from 'react-hook-form';
import { APIPutBody, FieldType } from '@/@types/entrepreneur/executive-data';
import { setLoading, setUser, signInSuccess, useAppDispatch, useAppSelector } from '@/store';
import { getUserData } from '@/store/slices/entrepreneur';
import dayjs from 'dayjs';
import { putUserAPI } from '@/services/entrepreneur/UserService';
import { Button, message, Modal } from 'antd';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';

interface Props {
}

const ExecutiveDataScreen: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.entrepreneur.user)
  const loading = useAppSelector(state => state.layout.loading)
  const auth = useAppSelector(state => state.auth)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bulkLoading, setBulkLoading] = useState({
    profile: false,
    cid: false,
    certificate: false,
    business: false
  })

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
      houseNumber ? `เลขที่${houseNumber}` : null,
      village ? `หมู่ที่ ${village}` : null,
      lane ? `ซอบ ${lane}` : null,
      road ? `ถนน ${road}` : null,
      province || null,
      district || null,
      subDistrict || null,
      zipCode || null
    ]
    return addressArr.join(' ').trim()
  }, [])

  const form = useForm<FieldType>({
    defaultValues: {
      registration_no: userData.important_info.registration_no || "",
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
        file: [],
        url: ''
      },
      approved_date: dayjs(userData.important_info.permission_date),
      file_copied_of_citizen_id: {
        file: [],
        url: ''
      },
      file_trasfer_ownership_image_id: {
        file: [],
        url: ''
      },
      file_legal_entity_id: {
        file: [],
        url: ''
      },
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
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
          title: 'บันทึกข้อมูลสำเร็จ',
          content: 'กรุณาลงชื่อเข้าใช้งานใหม่อีกครั้ง ระบบจะทำการอัพเดรตรูปโปรไฟล์ล่าสุด',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(signInSuccess(String(auth.session.token)))
            dispatch(getUserData())
            dispatch(setUser({
              ...auth.user,
              profile_url: body.profile_url
            }))
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
  }, [dispatch, auth.user, auth.session.token])

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchProfileUrl = useCallback(async (imgUrl: string) => {
    // dispatch(setLoading(true))
    setBulkLoading(prev => ({ ...prev, profile: true }))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(userData.profile_url)),
            name: 'รูปโปรไฟล์',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_id.url', userData.profile_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setBulkLoading(prev => ({ ...prev, profile: false }))
    }
  }, [userData.profile_url, setValue])

  const fetchCIDUrl = useCallback(async (imgUrl: string) => {
    setBulkLoading(prev => ({ ...prev, cid: true }))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_copied_of_citizen_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(userData.business_document.cid_card_file_url)),
            name: 'สำเนาบัตรประชาชนผู้มีอำนาจ',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_copied_of_citizen_id.url', userData.business_document.cid_card_file_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setBulkLoading(prev => ({ ...prev, cid: false }))
    }
  }, [userData.business_document.cid_card_file_url, setValue])

  const fetchCertificateUrl = useCallback(async (imgUrl: string) => {
    setBulkLoading(prev => ({ ...prev, certificate: true }))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_trasfer_ownership_image_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(userData.business_document.certificate_file_url)),
            name: 'หนังสือรับรองนิติบุคคล',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_trasfer_ownership_image_id.url', userData.business_document.certificate_file_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setBulkLoading(prev => ({ ...prev, certificate: false }))
    }
  }, [userData.business_document.certificate_file_url, setValue])

  const fetchBusinessUrl = useCallback(async (imgUrl: string) => {
    setBulkLoading(prev => ({ ...prev, business: true }))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_legal_entity_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(userData.business_document.business_file_url)),
            name: 'รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_legal_entity_id.url', userData.business_document.business_file_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setBulkLoading(prev => ({ ...prev, business: false }))
    }
  }, [userData.business_document.business_file_url, setValue])

  useEffect(() => {
    if (userData.profile_url) {
      if (extractUrl(userData.profile_url)) {
        fetchProfileUrl(extractUrl(userData.profile_url))
      }
    }
    if (userData.business_document.cid_card_file_url) {
      if (extractUrl(userData.business_document.cid_card_file_url)) {
        fetchCIDUrl(extractUrl(userData.business_document.cid_card_file_url))
      }
    }
    if (userData.business_document.certificate_file_url) {
      if (extractUrl(userData.business_document.certificate_file_url)) {
        fetchCertificateUrl(extractUrl(userData.business_document.certificate_file_url))
      }
    }
    if (userData.business_document.business_file_url) {
      if (extractUrl(userData.business_document.business_file_url)) {
        fetchBusinessUrl(extractUrl(userData.business_document.business_file_url))
      }
    }
  }, [
    extractUrl,
    fetchProfileUrl,
    fetchCIDUrl,
    fetchCertificateUrl,
    fetchBusinessUrl,
    userData.profile_url,
    userData.business_document.cid_card_file_url,
    userData.business_document.certificate_file_url,
    userData.business_document.business_file_url
  ])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap'>
        <h3>{auth.user.details.is_personal ? 'ข้อมูลผู้ยื่นคำขอฯ สำหรับบุคคลทั่วไป' : 'ข้อมูลผู้ยื่นคำขอฯ สำหรับผู้ประกอบการ'}</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => dispatch(getUserData())}
          >
            ย้อนกลับข้อมูลก่อนหน้า
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => submitRef.current?.click()}
          >
            บันทึกข้อมูลใหม่
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
            {auth.user.details.is_personal ?
              <FormGeneralUser
                control={control}
                setValue={setValue}
              />
              :
              <FormExecutiveData
                control={control}
                setValue={setValue}
              />
            }
            <FormExecutiveDocument
              control={control}
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
