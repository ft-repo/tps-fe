import { useCallback, useEffect, useState } from 'react'
import SignInForm from './SignInForm'
import { ConfigProvider, message, Segmented } from 'antd'
import { useLocation, useSearchParams } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'
import { SESSION_EXPIRED_STORAGE_KEY } from '@/services/sessionManagerInstance'

const SignIn = () => {
	const [loginType, setLoginType] = useState<'PERSONAL' | 'ENTREPRENEUR'>('ENTREPRENEUR')
	const { state } = useLocation()
	const [params] = useSearchParams()
	const paramsToken = params.get('token')

	const text = {
		"PERSONAL": {
			"login_title": "สำหรับบุคคลทั่วไป",
			"form_label": "เลขบัตรประชาชน",
		},
		"ENTREPRENEUR": {
			"login_title": "สำหรับผู้ประกอบการ",
			"form_label": "เลขทะเบียนนิติบุคคล",
		}
	}

	const currentText = text[loginType]

	useEffect(() => {
		if (state?.is_personal) {
			setLoginType('PERSONAL')
		}
	}, [state])

	const { signInWithToken } = useAuth()

	const onSignInWithToken = useCallback(async (token: string) => {
		const result = await signInWithToken(token)

		if (result?.status === 'success') {
			message.success('เข้าสู่ระบบสำเร็จ')
		} else {
			message.error(result?.message || 'เข้าสู่ระบบไม่สำเร็จ')
		}
	}, [signInWithToken])

	useEffect(() => {
		if (paramsToken) {
			onSignInWithToken(paramsToken)
		}
	}, [paramsToken, onSignInWithToken])

	useEffect(() => {
		if (sessionStorage.getItem(SESSION_EXPIRED_STORAGE_KEY)) {
			sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY)
			message.warning('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง')
		}
	}, [])

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Noto Sans Thai"
				},
				components: {
					Segmented: {
						itemSelectedBg: "#1677FF",
						itemSelectedColor: "#FFFFFF"
					}
				}
			}}
		>
			<div className="m-auto xl:max-w-[450px] max-w-[380px]">
				<div className="mb-8">
					<Segmented<string>
						options={[{ label: 'ผู้ประกอบการ', value: 'ENTREPRENEUR' }, { label: 'บุคคลทั่วไป', value: 'PERSONAL' }]}
						defaultValue={state?.is_personal ? 'PERSONAL' : 'ENTREPRENEUR'}
						onChange={(value) => {
							setLoginType(value as 'PERSONAL' | 'ENTREPRENEUR')
						}}
					/>
				</div>
				<div className="mb-8">
					<h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
					<h3 className="mb-1">{currentText.login_title}</h3>
				</div>
				<SignInForm disableSubmit={false} formLabel={currentText.form_label} />
			</div>
		</ConfigProvider>
	)
}

export default SignIn
