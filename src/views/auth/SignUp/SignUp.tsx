import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SignUpForm from './SignUpForm'
import { SignUpCredential } from '@/@types/auth'
import { useAppDispatch } from '@/store'
import {
  getDistrict,
  getEntityType,
  getProvince,
  getSubDistrict,
  getContactType,
} from '@/store/slices/master/masterSlice'
import { Button } from '@/components/ui'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { ActionLink } from '@/components/shared'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useTimeOutMessage()
  const [provinceId, setProvinceId] = useState<string | number>('')
  const [districtId, setDistrictId] = useState<string | number>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SignUpCredential>({
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
    },
    mode: 'onSubmit', // Change to onSubmit mode
  })

  const { handleSubmit, control, setValue } = form

  useEffect(() => {
    dispatch(getProvince())
    dispatch(getEntityType())
    dispatch(getContactType())
  }, [dispatch])

  useEffect(() => {
    if (provinceId) {
      dispatch(getDistrict(provinceId.toString()))
    }
  }, [dispatch, provinceId])

  useEffect(() => {
    if (districtId) {
      dispatch(getSubDistrict(districtId.toString()))
    }
  }, [dispatch, districtId])

  const onSubmit = useCallback(async (value: SignUpCredential) => {
    setIsSubmitting(true)
    try {
      console.log('Submitting form with values:', value)
      // Add your API call here
      // const response = await signUpAPI(value)
      // Handle success response
      setMessage('ลงทะเบียนสำเร็จ')
    } catch (error) {
      console.error('Sign up error:', error)
      setMessage('เกิดข้อผิดพลาดในการลงทะเบียน')
    } finally {
      setIsSubmitting(false)
    }
  }, [setMessage])

  return (
    <div className="m-auto xl:max-w-[600px] max-w-[450px]">
      <div className="mb-8">
        <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
        <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('สำเร็จ') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpForm
          control={control}
          setValue={setValue}
          setProvinceId={setProvinceId}
          setDistrictId={setDistrictId}
        />

        <div className="mt-4">
          <Button 
            block 
            loading={isSubmitting} 
            variant="solid" 
            type="submit"
          >
            {isSubmitting ? 'กำลังสร้างบัญชี...' : 'ลงทะเบียน'}
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
