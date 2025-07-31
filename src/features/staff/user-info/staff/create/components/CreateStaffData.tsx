/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Button, Input, Select } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

interface Props {

}

const CreateStaffData: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()

  return (
    <div className='border-2 rounded-md p-4'>
      <section>
        <h5>เพิ่มข้อมูลผู้ใช้งาน</h5>
        <div className='block lg:grid grid-cols-2 2xl:grid-cols-3 gap-5 mt-3'>
          <fieldset>
            <label>Username</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
        <div className='block sm:grid grid-cols-2 lg:grid-cols-3 gap-5 mt-3'>
          <fieldset>
            <label>คำนำหน้า</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ชื่อ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>นามสกุล</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <div className='lg:col-span-2'>
            <fieldset>
              <label>หน่วยงาน</label>
              <Select
                placeholder='กรุณาเลือก'
                options={[]}
              />
            </fieldset>
          </div>
          <fieldset>
            <fieldset>
              <label>สิทธิ์การเข้าใช้งาน</label>
              <Select
                placeholder='กรุณาเลือก'
                options={[]}
              />
            </fieldset>
          </fieldset>
        </div>
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
  )
}

export default React.memo<Props>(CreateStaffData)
