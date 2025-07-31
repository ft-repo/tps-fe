import React from 'react'
import { Button, Input } from '@/components/ui'
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

const SeachStaff = () => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-3 xl:w-1/3'>
      <Input placeholder="ค้นหาชื่อผู้ใช้งาน" />
      <Button type='submit' variant='solid'>ค้นหา</Button>
      <Button
        variant='solid'
        icon={<PlusIcon />}
        onClick={() => navigate('/user-info/staff/create')}
        >
          เพิ่มผู้ใช้งาน
        </Button>
    </div>
  )
}

export default SeachStaff