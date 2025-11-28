import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'

interface SignInFormProps extends CommonProps {
	disableSubmit?: boolean
	forgotPasswordUrl?: string
	signUpUrl?: string
}

type SignInFormSchema = {
	registration_no: string
	password: string
	// rememberMe: boolean
}

const validationSchema = Yup.object().shape({
	registration_no: Yup.string().required('กรุณาระบุเลขทะเบียนนิติบุคคล'),
	password: Yup.string().required('กรุณาระบุรหัสผ่าน'),
	// registration_no: Yup.string().required('Please enter your registration no'),
	// password: Yup.string().required('Please enter your password'),
	// rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
	const {
		disableSubmit = false,
		className,
		forgotPasswordUrl = '/forgot-password',
		signUpUrl = '/sign-up',
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (
		values: SignInFormSchema,
		setSubmitting: (isSubmitting: boolean) => void,
	) => {
		const { registration_no, password } = values
		setSubmitting(true)

		const result = await signIn({ registration_no, password })

		if (result?.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && (
				<Alert showIcon className="mb-4" type="danger">
					<>{message}</>
				</Alert>
			)}
			<Formik
				initialValues={{
					registration_no: '',
					password: '',
					// rememberMe: true,
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<FormItem
								label="เลขทะเบียนนิติบุคคล"
								invalid={
									(errors.registration_no &&
										touched.registration_no) as boolean
								}
								errorMessage={errors.registration_no}
							>
								<Field
									type="text"
									autoComplete="off"
									name="registration_no"
									placeholder="เลขทะเบียนนิติบุคคล"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="รหัสผ่าน"
								invalid={
									(errors.password &&
										touched.password) as boolean
								}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off"
									name="password"
									placeholder="รหัสผ่าน"
									component={PasswordInput}
								/>
							</FormItem>
							{/* <div className="flex justify-end mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    Remember Me
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    ลืมรหัสผ่าน?
                                </ActionLink>
                            </div> */}
							<Button
								block
								loading={isSubmitting}
								variant="solid"
								// color='primary'
								type="submit"
							>
								{isSubmitting ? 'กำลังลงชื่อเข้าใช้...' : 'ลงชื่อเข้าใช้'}
							</Button>
							<div className="mt-4 text-center">
								<span>{`ยังไม่มีบัญชี?`} </span>
								<ActionLink to={signUpUrl}>สมัครสมาชิก</ActionLink>
							</div>
							<div className='mt-4 text-center'>
								<ActionLink to={'/staff/sign-in'}>สำหรับเจ้าหน้าที่</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm
