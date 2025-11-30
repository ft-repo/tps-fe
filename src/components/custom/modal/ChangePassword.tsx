/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { Ref, useCallback, useRef } from 'react'
import { Input, message, Modal } from 'antd'
import { useAppSelector, useAppDispatch, setOpenModal, setLoading } from '@/store'
import { Controller, useForm } from 'react-hook-form'
import { putChangePassword } from '@/services/entrepreneur/UserService';
import useAuth from '@/utils/hooks/useAuth';

interface Props {

}

interface ContentProps {
  submitRef: Ref<HTMLButtonElement>;
}

interface FieldType {
  new_password: string;
  confirm_password: string;
}

const Content = (props: ContentProps) => {
  const { submitRef } = props;
  const dispatch = useAppDispatch()
  const { signOut } = useAuth()

  const form = useForm<FieldType>({
    defaultValues: {
      new_password: '',
      confirm_password: ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = form;

  const onSubmit = useCallback(async (value: FieldType) => {
    dispatch(setLoading(true))
    try {
      const response = await putChangePassword(value)
      if (response.status === 200) {
        Modal.success({
          title: 'เปลี่ยนรหัสสำเร็จ',
          content: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
          okText: 'ออกจากระบบ',
          onOk: () => signOut(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        // console.error(error.message)
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setOpenModal(false))
      dispatch(setLoading(false))
    }
  }, [dispatch, signOut])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='new_password'
        control={control}
        rules={{
          required: 'กรุณาระบุรหัสผ่าน',
          validate: (value) => value.length >= 6 || 'กรุณาระบุรหัสผ่านขั้นต่ำ 6 ตัวอักษร'
        }}
        render={({ field }) => {
          return (
            <fieldset>
              <label>รหัสผ่าน <span className='text-red-500'>*</span></label>
              <Input.Password
                {...field}
                name={field.name}
                placeholder='กรุณาระบุรหัสผ่าน'
                className='w-full'
                size='large'
                style={{
                  fontFamily: 'Noto Sans Thai'
                }}
              />
              {!!errors.new_password &&
                <p className='text-red-500'>{errors.new_password.message}</p>
              }
            </fieldset>
          )
        }}
      />
      <Controller
        name='confirm_password'
        control={control}
        rules={{
          validate: (value) => value === watch('new_password') || 'รหัสผ่านไม่ถูกต้อง'
        }}
        render={({ field }) => {
          return (
            <fieldset className='mt-3'>
              <label>ยืนยันรหัสผ่าน <span className='text-red-500'>*</span></label>
              <Input.Password
                {...field}
                name={field.name}
                placeholder='กรุณาตรวจสอบรหัสผ่านอีกครั้ง'
                className='w-full'
                size='large'
                style={{
                  fontFamily: 'Noto Sans Thai'
                }}
              />
              {!!errors.confirm_password &&
                <p className='text-red-500'>{errors.confirm_password.message}</p>
              }
            </fieldset>
          )
        }}
      />
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

const ChangePassword: React.FC<Props> = (props) => {
  const { } = props
  const { open_modal, loading } = useAppSelector(state => state.layout)
  const dispatch = useAppDispatch()
  const submitRef = useRef<HTMLButtonElement>(null)

  return (
    <Modal
      destroyOnHidden
      open={open_modal}
      title='เปลี่ยนรหัสผ่าน'
      okText='เปลี่ยนรหัสผ่าน'
      cancelText='ยกเลิก'
      style={{
        fontFamily: 'Noto Sans Thai'
      }}
      cancelButtonProps={{
        disabled: loading,
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      }}
      okButtonProps={{
        loading: loading,
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      }}
      onCancel={() => dispatch(setOpenModal(false))}
      onOk={() => submitRef.current?.click()}
    >
      <Content
        submitRef={submitRef}
      />
    </Modal>
  )
}

export default React.memo<Props>(ChangePassword)
