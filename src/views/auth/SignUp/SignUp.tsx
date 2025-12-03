import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SignUpForm from './SignUpForm'
import { SignUpCredential } from '@/@types/auth'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import {
  // getDistrict,
  // getProvince,
  // getSubDistrict,
  getEntityType,
  getContactType,
} from '@/store/slices/master/masterSlice'
import { Button } from '@/components/ui'
import { ActionLink } from '@/components/shared'
import useAuth from '@/utils/hooks/useAuth'
import { ConfigProvider, message, Modal } from 'antd'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import useQuery from '@/utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'

export interface FieldType {
  // BUSINESS
  entity_type_id: string | number | null;
  registration_no: string;
  business_name: string;
  business_phone_number: string;
  // LOCATION
  house_number: string;
  village: string;
  lane: string;
  road: string;
  province_id: string | number | null;
  district_id: string | number | null;
  sub_district_id: string | number | null;
  zip_code: string;
  // CONTACT
  contact_name: string;
  contact_type_id: string | number | null;
  contact_phone_number: string;
  cid: string;
  // URL
  certificate_file_url: string;
  cid_card_file_url: string;
  business_file_url: string;
  // PASSWORD
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { signUp } = useAuth()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const query = useQuery()

  const form = useForm<FieldType>({
    defaultValues: {
      // BUSINESS
      entity_type_id: null,
      registration_no: '',
      business_name: '',
      business_phone_number: '',
      // LOCATION
      house_number: '',
      village: '',
      lane: '',
      road: '',
      province_id: null,
      district_id: null,
      sub_district_id: null,
      zip_code: '',
      // CONTACT
      contact_name: '',
      contact_type_id: null,
      contact_phone_number: '',
      cid: '',
      // URL
      certificate_file_url: '',
      cid_card_file_url: '',
      business_file_url: '',
      // PASSWORD
      password: '',
      confirm_password: '',
    }
  })

  const { handleSubmit, control, setValue, setError, formState: { errors } } = form

  useEffect(() => {
    // LOCATION
    // dispatch(getProvince())
    // dispatch(getDistrict(''))
    // dispatch(getSubDistrict(''))
    // ENTITY
    dispatch(getEntityType())
    dispatch(getContactType())
  }, [dispatch])

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: SignUpCredential = {
      password: value.password,
      business_detail: {
        business_name: value.business_name,
        registration_no: value.registration_no,
        entity_type_id: Number(value.entity_type_id),
      },
      business_address: {
        house_number: value.house_number,
        village: value.village,
        lane: value.lane,
        road: value.road,
        sub_district_id: Number(value.sub_district_id),
        district_id: Number(value.district_id),
        province_id: Number(value.province_id),
        zip_code: value.zip_code,
        phone_number: value.business_phone_number,
      },
      contact_info: {
        contact_name: value.contact_name,
        contact_type_id: Number(value.contact_type_id),
        phone_number: value.contact_phone_number,
        cid: value.cid,
      },
      business_document: {
        certificate_file_url: value.certificate_file_url,
        cid_card_file_url: value.cid_card_file_url,
        business_file_url: value.business_file_url,
      },
    }

    // INIT LOADING
    dispatch(setLoading(true))
    try {
      console.log('Submitting form with values:', body)
      const response = await signUp(body)

      if (response?.status === 'success') {
        messageApi.success('ลงทะเบียนสำเร็จ')
        Modal.success({
          title: 'บันทึกข้อมูลสำเร็จ',
          content: 'ลงทะเบียนสำเร็จ',
          okText: 'เข้าสู่ระบบ',
          onOk: () => {
            const redirectUrl = query.get(REDIRECT_URL_KEY)
            setTimeout(() => {
              navigate(
                redirectUrl
                  ? redirectUrl
                  : appConfig.authenticatedEntryPath,
              )
            }, 3000)
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
        Modal.error({
          title: 'ผิดพลาด',
          content: response?.message || 'ไม่สามารถบันทึกข้อมูลได้',
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
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: error.message || 'ไม่สามารถบันทึกข้อมูลได้',
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
        console.error(error || 'เกิดข้อผิดพลาดในการลงทะเบียน')
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, signUp, messageApi, navigate, query])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <div className="m-auto xl:max-w-[600px] max-w-[450px]">
        <div className="mb-8">
          <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
          <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignUpForm
            control={control}
            setValue={setValue}
            setError={setError}
            errors={errors}
          />
          <div className='flex items-center gap-3'>
            <AiOutlineExclamationCircle />
            <p className='text-gray-500'>ควรตั้งรหัสผ่านอย่างน้อย 6 หลัก</p>
          </div>
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
      {contextHolder}
    </ConfigProvider>
  )
}

export default SignUp
