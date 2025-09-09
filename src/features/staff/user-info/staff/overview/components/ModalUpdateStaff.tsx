/* eslint-disable react-refresh/only-export-components */
import React, { Ref, useCallback, useRef } from 'react'
import { Col, Input, Modal, Row, Select } from 'antd'
import { APIPostBody, StaffList } from '@/@types/services/user';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { INIT_MODAL } from '../screen';
import { Controller, useForm } from 'react-hook-form';
import { putUpdateUserAdminAPI } from '@/services/staff/UserService';
import { getAdminData } from '@/store/slices/staff';

interface Props {
  id: string;
  open: boolean;
  data: StaffList;
  setOpen: ({ open, data, id }: { id: string, open: boolean, data: StaffList }) => void;
}

interface ContentProps {
  id: string;
  data: StaffList;
  submitRef: Ref<HTMLButtonElement>;
  setOpen: ({ open, data, id }: { id: string, open: boolean, data: StaffList }) => void;
}

interface FieldType {
  username: string;
  department_id: number | string | null;
  title: string;
  first_name: string;
  last_name: string;
  role_id: number | string | null;
}

const Content = (props: ContentProps) => {
  const { id, data, submitRef, setOpen } = props;
  const dispatch = useAppDispatch()
  const admin = useAppSelector(state => state.staff.staff.admin)
  const department = useAppSelector(state => state.master.department)
  const role = useAppSelector(state => state.master.role)

  const form = useForm<FieldType>({
    defaultValues: {
      username: data.username,
      department_id: data.department.id,
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name,
      role_id: data.role.id
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = form

  const onSubmit = useCallback(async (value: FieldType) => {
    // INIT LOADING
    dispatch(setLoading(true))
    // CREATING REQUEST
    try {
      const response = await putUpdateUserAdminAPI(id, value as APIPostBody)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getAdminData(admin.overview.search))
            setOpen(INIT_MODAL)
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [id, dispatch, admin.overview.search, setOpen])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='username'
            control={control}
            rules={{
              required: 'กรุณาระบุ Username'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>Username <span className='text-red-500'>*</span></label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.username &&
                    <p className='text-red-500'>{errors.username.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mt-3'>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='title'
            control={control}
            rules={{
              required: 'กรุณาระบุคำนำหน้า'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>คำนำหน้า <span className='text-red-500'>*</span></label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.title &&
                    <p className='text-red-500'>{errors.title.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='first_name'
            control={control}
            rules={{
              required: 'กรุณาระบุชื่อ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ชื่อ <span className='text-red-500'>*</span></label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.first_name &&
                    <p className='text-red-500'>{errors.first_name.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='last_name'
            control={control}
            rules={{
              required: 'กรุณาระบุนามสกุล'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>นามสกุล <span className='text-red-500'>*</span></label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.last_name &&
                    <p className='text-red-500'>{errors.last_name.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Controller
            name='department_id'
            control={control}
            rules={{
              required: 'กรุณาเลือกหน่วยงาน'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>หน่วยงาน <span className='text-red-500'>*</span></label>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={department}
                    fieldNames={{
                      label: 'dept_name',
                      value: 'id'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.dept_name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.department_id &&
                    <p className='text-red-500'>{errors.department_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Controller
            name='role_id'
            control={control}
            rules={{
              required: 'กรุณาเลือกสิทธิ์การเข้าใช้งาน'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>สิทธิ์การเข้าใช้งาน <span className='text-red-500'>*</span></label>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={role}
                    fieldNames={{
                      label: 'name',
                      value: 'id'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                  {!!errors.role_id &&
                    <p className='text-red-500'>{errors.role_id.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

const ModalUpdateStaff: React.FC<Props> = (props) => {
  const { open, data, id, setOpen } = props
  const loading = useAppSelector(state => state.layout.loading)
  const submitRef = useRef<HTMLButtonElement>(null)

  return (
    <Modal
      destroyOnHidden
      width={800}
      open={open}
      title='แก้ไขข้อมูลเจ้าหน้าที่'
      okText='บันทึก'
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
      onCancel={() => setOpen(INIT_MODAL)}
      onOk={() => submitRef.current?.click()}
    >
      <Content
        id={id}
        data={data}
        submitRef={submitRef}
        setOpen={setOpen}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalUpdateStaff)
