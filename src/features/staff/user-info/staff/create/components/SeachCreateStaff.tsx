import React from 'react'
import { Button, Input } from '@/components/ui'

const SeachCreateStaff = () => {

  return (
    <div className='flex items-center gap-3 xl:w-1/3'>
      <Input placeholder="ค้นหาชื่อผู้ใช้งาน" />
      <Button type='submit' variant='solid'>ค้นหา</Button>
    </div>
  )
}

export default SeachCreateStaff