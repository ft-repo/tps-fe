import SignInStaffForm from './SignInStaffForm'

const SignInStaff = () => {
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
