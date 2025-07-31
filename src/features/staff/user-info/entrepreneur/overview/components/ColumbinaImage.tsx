/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface Props {

}

const ColumbinaImage: React.FC<Props> = (props) => {
  const { } = props

  return (
    <>
    <h3>ข้อมูลผู้ประกอบการ</h3>
      <div className='flex items-center gap-3 xl:w-1/3'>
        <Input
          placeholder="พิมพ์เพื่อค้นหา..."
        />
        <Button type='submit' variant='solid'>ค้นหา</Button>
      </div>
    </>
  )
}

export default React.memo<Props>(ColumbinaImage)
