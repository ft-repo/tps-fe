import { useState } from 'react'
import SignInForm from './SignInForm'
import { ConfigProvider, Segmented } from 'antd'

const SignIn = () => {
	const [loginType, setLoginType] = useState<'PERSONAL' | 'ENTREPRENEUR'>('ENTREPRENEUR')

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
