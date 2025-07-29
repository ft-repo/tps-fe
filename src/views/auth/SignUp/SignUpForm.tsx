import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { Select, Input, Upload } from '@/components/ui'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    entity_type_id: string
    business_name: string
    userName: string
    password: string
    email: string
    address: {
        number: string
        moo: string
        soi: string
        road: string
        subdistrict: string
        district: string
        province: string
        postcode: string
    }
    phone_number: string
    registration_no: string
    certificateFile: File | null
    contact_name: string
    contact_type: string
    contact_phone: string
    contact_id_card: string
    id_card: File | null
    company_logo: File | null
}

const validationSchema = Yup.object().shape({
    entity_type_id: Yup.string().required('Please select entity type'),
    business_name: Yup.string().required('Please enter your business name'),
    userName: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords do not match',
    ),
    address: Yup.object().shape({
        number: Yup.string(),
        moo: Yup.string(),
        soi: Yup.string(),
        road: Yup.string(),
        subdistrict: Yup.string(),
        district: Yup.string(),
        province: Yup.string(),
        postcode: Yup.string(),
    }),
    phone_number: Yup.string().required('Please enter your phone number'),
    registration_no: Yup.string().required('Please enter your registration number'),
    certificateFile: Yup.mixed().required('Please upload your certificate file'),
    contact_name: Yup.string().required('Please enter your contact name'),
    contact_type: Yup.string().required('Please select contact type'),
    contact_phone: Yup.string().required('Please enter your contact phone'),
    contact_id_card: Yup.string().required('Please enter your contact id card'),
    id_card: Yup.mixed().required('Please upload your id card file'),
    company_logo: Yup.mixed().required('Please upload your company logo'),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        const { userName, password, email } = values
        setSubmitting(true)
        const result = await signUp({ userName, password, email })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    entity_type_id: '',
                    business_name: '',
                    userName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    address: {
                        number: '',
                        moo: '',
                        soi: '',
                        road: '',
                        subdistrict: '',
                        district: '',
                        province: '',
                        postcode: '',
                    },
                    phone_number: '',
                    registration_no: '',
                    certificateFile: null,
                    contact_name: '',
                    contact_type: '',
                    contact_phone: '',
                    contact_id_card: '',
                    id_card: null,
                    company_logo: null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="ประเภทนิติบุคคล"
                                invalid={errors.entity_type_id && touched.entity_type_id}
                                errorMessage={errors.entity_type_id}
                            >
                                <Field
                                    type="select"
                                    autoComplete="off"
                                    name="entity_type_id"
                                    placeholder="ประเภทนิติบุคคล"
                                    component={Select}
                                    options={[
                                        { label: 'บริษัท', value: '1' },
                                        { label: 'ห้างหุ้นส่วนสามัญ', value: '2' },
                                        { label: 'ห้างหุ้นส่วนจำกัด', value: '3' },
                                        { label: 'ห้างหุ้นส่วนมหาชน', value: '4' },
                                    ]}
                                />
                            </FormItem>
                            <FormItem
                                label="ชื่อบริษัท / ห้างหุ้นส่วน / นิติบุคคล"
                                invalid={errors.business_name && touched.business_name}
                                errorMessage={errors.business_name}
                            >
                                <Field
                                    type="business_name"
                                    autoComplete="off"
                                    name="business_name"
                                    placeholder="ชื่อบริษัท / ห้างหุ้นส่วน / นิติบุคคล"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="เลขทะเบียนนิติบุคคล"
                                invalid={errors.registration_no && touched.registration_no}
                                errorMessage={errors.registration_no}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="registration_no"
                                    placeholder="เลขทะเบียนนิติบุคคล"
                                    component={Input}
                                />
                            </FormItem>
                            <div className="mb-4">
                                <div className="font-semibold mb-2">ที่อยู่ (Address)</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="เลขที่"
                                        invalid={errors.address?.number && touched.address?.number}
                                        errorMessage={errors.address?.number}
                                    >
                                        <Field
                                            name="address.number"
                                            placeholder="เลขที่"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="หมู่"
                                        invalid={errors.address?.moo && touched.address?.moo}
                                        errorMessage={errors.address?.moo}
                                    >
                                        <Field
                                            name="address.moo"
                                            placeholder="หมู่"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="ตรอก/ซอย"
                                        invalid={errors.address?.soi && touched.address?.soi}
                                        errorMessage={errors.address?.soi}
                                    >
                                        <Field
                                            name="address.soi"
                                            placeholder="ตรอก/ซอย"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="ถนน"
                                        invalid={errors.address?.road && touched.address?.road}
                                        errorMessage={errors.address?.road}
                                    >
                                        <Field
                                            name="address.road"
                                            placeholder="ถนน"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="แขวง/ตำบล"
                                        invalid={errors.address?.subdistrict && touched.address?.subdistrict}
                                        errorMessage={errors.address?.subdistrict}
                                    >
                                        <Field
                                            name="address.subdistrict"
                                            placeholder="แขวง/ตำบล"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="เขต/อำเภอ"
                                        invalid={errors.address?.district && touched.address?.district}
                                        errorMessage={errors.address?.district}
                                    >
                                        <Field
                                            name="address.district"
                                            placeholder="เขต/อำเภอ"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="จังหวัด"
                                        invalid={errors.address?.province && touched.address?.province}
                                        errorMessage={errors.address?.province}
                                    >
                                        <Field
                                            name="address.province"
                                            placeholder="จังหวัด"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="รหัสไปรษณีย์"
                                        invalid={errors.address?.postcode && touched.address?.postcode}
                                        errorMessage={errors.address?.postcode}
                                    >
                                        <Field
                                            name="address.postcode"
                                            placeholder="รหัสไปรษณีย์"
                                            component={Input}
                                            autoComplete="off"
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <FormItem
                                label="เบอร์โทรสำนักงาน"
                                invalid={errors.phone_number && touched.phone_number}
                                errorMessage={errors.phone_number}
                            >
                                <Field
                                    type="tel"
                                    autoComplete="off"
                                    name="phone_number"
                                    placeholder="เบอร์โทรสำนักงาน"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="หนังสือรับรองนิติบุคคล (ไฟล์ .pdf เท่านั้น)"
                                invalid={errors.certificateFile && touched.certificateFile}
                                errorMessage={errors.certificateFile}
                            >
                                <Field
                                    name="certificateFile"
                                    component={Upload}
                                    accept=".pdf"
                                />
                            </FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="ชื่อผู้ติดต่อ / มอบอำนาจ"
                                    invalid={errors.contact_name && touched.contact_name}
                                    errorMessage={errors.contact_name}
                                >
                                    <Field
                                        name="contact_name"
                                        placeholder="ชื่อผู้ติดต่อ / มอบอำนาจ"
                                        component={Input}
                                        autoComplete="off"
                                    />
                                </FormItem>
                                <FormItem
                                    label="ประเภทผู้ติดต่อ / มอบอำนาจ"
                                    invalid={errors.contact_type && touched.contact_type}
                                    errorMessage={errors.contact_type}
                                >
                                    <Field
                                        name="contact_type"
                                        placeholder="ประเภทผู้ติดต่อ / มอบอำนาจ"
                                        component={Input}
                                        autoComplete="off"
                                    />
                                </FormItem>
                                <FormItem
                                    label="เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ"
                                    invalid={errors.contact_phone && touched.contact_phone}
                                    errorMessage={errors.contact_phone}
                                >
                                    <Field
                                        name="contact_phone"
                                        type="tel"
                                        placeholder="เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ"
                                        component={Input}
                                        autoComplete="off"
                                    />
                                </FormItem>
                                <FormItem
                                    label="หมายเลขบัตรประชาชน"
                                    invalid={errors.contact_id_card && touched.contact_id_card}
                                    errorMessage={errors.contact_id_card}
                                >
                                    <Field
                                        name="contact_id_card"
                                        placeholder="หมายเลขบัตรประชาชน"
                                        component={Input}
                                        autoComplete="off"
                                    />
                                </FormItem>
                            </div>
                            <FormItem
                                label="สำเนาบัตรประชาชนผู้มีอำนาจ (รองรับไฟล์ .pdf เท่านั้น)"
                                invalid={errors.id_card && touched.id_card}
                                errorMessage={errors.id_card}
                            >
                                <Field
                                    name="id_card"
                                    component={Upload}
                                    accept=".pdf"
                                />
                            </FormItem>
                            <FormItem
                                label="รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ (รองรับไฟล์ .pdf .png .jpeg .jpg)"
                                invalid={errors.company_logo && touched.company_logo}
                                errorMessage={errors.company_logo}
                            >
                                <Field
                                    name="company_logo"
                                    component={Upload}
                                    accept=".pdf,.png,.jpeg,.jpg"
                                />
                            </FormItem>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="รหัสผ่าน"
                                    invalid={errors.password && touched.password}
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="รหัสผ่าน"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    label="ยืนยันรหัสผ่าน"
                                    invalid={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                    }
                                    errorMessage={errors.confirmPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder="ยืนยันรหัสผ่าน"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'กำลังสร้างบัญชี...'
                                    : 'ลงทะเบียน'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>มีบัญชีอยู่แล้ว? </span>
                                <ActionLink to={signInUrl}>เข้าสู่ระบบ</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
