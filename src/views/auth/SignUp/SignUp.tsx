import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SignUpForm from './SignUpForm'
import { SignUpCredential } from '@/@types/auth'
import { useAppDispatch } from '@/store'
import { getDistrict, getEntityType, getProvince, getSubDistrict } from '@/store/slices/master/masterSlice'
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
        },
    })

    const { handleSubmit, control, setValue, getValues } = form

    useEffect(() => {
        dispatch(getProvince())
        dispatch(getEntityType())
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
        console.log(value)
    }, [])

    return (
        <div className="m-auto xl:max-w-[600px] max-w-[450px]">
            <div className="mb-8">
                <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
                <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SignUpForm control={control} setValue={setValue} setProvinceId={setProvinceId} setDistrictId={setDistrictId} />

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
