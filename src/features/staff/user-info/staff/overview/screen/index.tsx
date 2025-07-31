/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { SeachStaff, StaffTable } from '../components'
import { Button } from '@/components/ui'
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()

  return (
    <div>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ข้อมูลเจ้าหน้าที่</h3>
        <Button
          variant='solid'
          icon={<PlusIcon />}
          onClick={() => navigate('/user-info/staff/create')}
        >
          เพิ่มผู้ใช้งาน
        </Button>
      </section>
      <section className='mt-5'>
        <SeachStaff />
      </section>
      <section className='mt-3'>
        <StaffTable />
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)