import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SignUpForm from './SignUpForm'
import { SignUpCredential, SignUpFieldType } from '@/@types/auth'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import {
  getDistrict,
  getEntityType,
  getProvince,
  getSubDistrict,
  getContactType,
} from '@/store/slices/master/masterSlice'
import { Button, Notification, toast } from '@/components/ui'
import { ActionLink } from '@/components/shared'
import useAuth from '@/utils/hooks/useAuth'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [provinceId, setProvinceId] = useState<string | number>('')
  const [districtId, setDistrictId] = useState<string | number>('')
  const loading = useAppSelector(state => state.layout.loading)
  const { signUp } = useAuth()
  
  const form = useForm<SignUpFieldType>({
    defaultValues: {
      password: '',
      password_confirmation: '',
      business_detail: {
        business_name: '',
        registration_no: '',
        entity_type_id: 0,
      },
      business_address: {
        house_number: '',
        village: '',
        lane: '',
        road: '',
        sub_district_id: 0,
        district_id: 0,
        province_id: 0,
        zip_code: '',
      },
      business_document: {
        certificate_file_url: '',
        cid_card_file_url: '',
        business_file_url: '',
      },
      contact_info: {
        contact_name: '',
        contact_type_id: 0,
        phone_number: '',
        cid: '',
      },
    }
  })

  const { handleSubmit, control, setValue, formState: { errors } } = form

  useEffect(() => {
    dispatch(getProvince())
    dispatch(getEntityType())
    dispatch(getContactType())
  }, [dispatch])

  useEffect(() => {
    if (provinceId) {
      dispatch(getDistrict(provinceId.toString()))
    }

    if (districtId) {
      dispatch(getSubDistrict(districtId.toString()))
    }
  }, [dispatch, provinceId, districtId])

  const onSubmit = useCallback(async (value: SignUpCredential) => {
    const body: SignUpCredential = {
      password: value.password,
      business_detail: {
        business_name: value.business_detail.business_name,
        registration_no: value.business_detail.registration_no,
        entity_type_id: Number(value.business_detail.entity_type_id.value),
      },
      business_address: {
        house_number: value.business_address.house_number,
        village: value.business_address.village,
        lane: value.business_address.lane,
        road: value.business_address.road,
        sub_district_id: Number(value.business_address.sub_district_id?.value),
        district_id: Number(value.business_address.district_id?.value),
        province_id: Number(value.business_address.province_id?.value),
        zip_code: value.business_address.zip_code,
      },
      contact_info: {
        contact_name: value.contact_info.contact_name,
        contact_type_id: Number(value.contact_info.contact_type_id?.value),
        phone_number: value.contact_info.phone_number,
        cid: value.contact_info.cid,
      },
      business_document: {
        certificate_file_url: value.business_document.certificate_file_url,
        cid_card_file_url: value.business_document.cid_card_file_url,
        business_file_url: value.business_document.business_file_url,
      },
    }

    // INIT LOADING
    dispatch(setLoading(true))
    try {
      console.log('Submitting form with values:', body)
      // const response = await signUp(body)

      // if (response?.status === 'success') {
      //   toast.push(
      //     <Notification
      //       type="success"
      //       title="ลงทะเบียนสำเร็จ"
      //     >
      //       ลงทะเบียนสำเร็จ
      //     </Notification>, {
      //     placement: 'top-center',
      //   })
      // } else {
      //   console.log(response)
      // }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }

      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการลงทะเบียน'
      
      toast.push(
        <Notification
          type="danger"
          title="ผิดพลาด"
        >
          {errorMessage}
        </Notification>, {
        placement: 'top-center',
      })
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  return (
    <div className="m-auto xl:max-w-[600px] max-w-[450px]">
      <div className="mb-8">
        <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
        <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
      </div>      
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpForm
          control={control}
          setValue={setValue}
          errors={errors}
          setProvinceId={setProvinceId}
          setDistrictId={setDistrictId}
        />

        <div className="mt-4">
          <Button 
            block 
            loading={loading} 
            variant="solid" 
            type="submit"
          >
            {loading ? 'กำลังสร้างบัญชี...' : 'ลงทะเบียน'}
          </Button>
        </div>
        
        <div className="mt-4 mb-8 text-center">
          <span>มีบัญชีอยู่แล้ว? </span>
          <ActionLink to={'/sign-in'}>เข้าสู่ระบบ</ActionLink>
        </div>
      </form>
    </div>
  )
}

export default SignUp
