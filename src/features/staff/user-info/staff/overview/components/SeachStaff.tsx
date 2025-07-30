import React from 'react'
import { Button, Input } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

const SeachStaff = () => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-3 xl:w-1/3'>
      <Input placeholder="ค้นหาชื่อผู้ใช้งาน" />
      <Button type='submit' variant='solid'>ค้นหา</Button>
      <Button
        variant='solid'
        //size="sm"
        onClick={() => navigate('/staff/create')}
        >
          เพิ่มผู้ใช้งาน
        </Button>
    </div>
  )
}

export default SeachStaff