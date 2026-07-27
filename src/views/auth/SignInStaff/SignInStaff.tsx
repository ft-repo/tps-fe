import { useEffect } from 'react'
import { message } from 'antd'
import SignInStaffForm from './SignInStaffForm'
import { SESSION_EXPIRED_STORAGE_KEY } from '@/services/sessionManagerInstance'

const SignInStaff = () => {
    useEffect(() => {
        if (sessionStorage.getItem(SESSION_EXPIRED_STORAGE_KEY)) {
            sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY)
            message.warning('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง')
        }
    }, [])

    return (
        <div className="m-auto xl:max-w-[450px] max-w-[380px]">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
                <h3 className="mb-1">สำหรับเจ้าหน้าที่</h3>
            </div>
            <SignInStaffForm disableSubmit={false} />
        </div>
    )
}

export default SignInStaff
