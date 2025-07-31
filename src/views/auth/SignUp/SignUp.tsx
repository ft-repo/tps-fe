import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <div className="m-auto xl:max-w-[600px] max-w-[450px]">
            <div className="mb-8">
                <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
                <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </div>
    )
}

export default SignUp
