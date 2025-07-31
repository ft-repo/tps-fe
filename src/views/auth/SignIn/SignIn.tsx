import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <div className="m-auto xl:max-w-[450px] max-w-[380px]">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
                <h3 className="mb-1">สำหรับผู้ประกอบการ</h3>
            </div>
            <SignInForm disableSubmit={false} />
        </div>
    )
}

export default SignIn
