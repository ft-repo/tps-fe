import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">ลงทะเบียนผู้ประกอบการ</h3>
                <p>ลงทะเบียนผู้ประกอบการสำหรับการประเมินและขอใช้เส้นทาง</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
