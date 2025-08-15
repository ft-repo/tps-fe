/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo } from 'react'
import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { Col, Input, Row, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '@/store';
import { LDAPList } from '@/@types/reducer/user';

interface Props {
  ldapPrefil: LDAPList;
}

interface FieldType {
  username: string;
  department_id: number | string | null;
  title: string;
  first_name: string;
  last_name: string;
  role_id: number | string | null;
}

const CreateStaffData: React.FC<Props> = (props) => {
  const { ldapPrefil } = props
  const navigate = useNavigate()
  const department = useAppSelector(state => state.master.department)
  const role = useAppSelector(state => state.master.role)

  const nameDestructure = useMemo(() => {
    const prefixList = ['นาย', 'นาง', 'นางสาว'];
    const destructure = ldapPrefil.Description?.split(' ')

    if (destructure?.length === 2) {
      let prefix = '';
      let firstname = destructure[0];
      const lastname = destructure[1];

      for (const p of prefixList) {
        if (firstname.startsWith(p)) {
          prefix = p;
          firstname = firstname.slice(p.length)
          break;
        }
      }

      return {
        prefix,
        firstname,
        lastname
      };
    }

    return {
      prefix: '',
      firstname: '',
      lastname: ''
    }
  }, [ldapPrefil.Description])

  const form = useForm<FieldType>({
    defaultValues: {
      username: ldapPrefil.Username || '',
      department_id: null,
      title: nameDestructure.prefix || '',
      first_name: nameDestructure.firstname || '',
      last_name: nameDestructure.lastname || '',
      role_id: null
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='border-2 rounded-md p-4'>
        <section>
          <h5>เพิ่มข้อมูลผู้ใช้งาน</h5>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                disabled
                name='username'
                control={control}
                rules={{
                  required: 'กรุณาระบุ Username'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>Username</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุ'
                        disabled={field.disabled}
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
                disabled
                name='title'
                control={control}
                rules={{
                  required: 'กรุณาระบุคำนำหน้า'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>คำนำหน้า</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุ'
                        disabled={field.disabled}
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
                disabled
                name='first_name'
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อ'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>ชื่อ</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุ'
                        disabled={field.disabled}
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
                disabled
                name='last_name'
                control={control}
                rules={{
                  required: 'กรุณาระบุนามสกุล'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>นามสกุล</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุ'
                        disabled={field.disabled}
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
                      <label>หน่วยงาน</label>
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
                      <label>สิทธิ์การเข้าใช้งาน</label>
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
        </section>
        <section className='mt-5'>
          <div className='flex items-center gap-3'>
            <Button
              type='button'
              variant='default'
              onClick={() => navigate(-1)}
            >
              ย้อนกลับ
            </Button>
            <Button
              type='submit'
              variant='solid'
            >
              บันทึก
            </Button>
          </div>
        </section>
      </div>
    </form>
  )
}

export default React.memo<Props>(CreateStaffData)
