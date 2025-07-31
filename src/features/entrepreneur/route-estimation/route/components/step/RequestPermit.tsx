/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormPermitRoute } from '..'
import DocumentTabList from '../route-estimate/petition/DocumentTabList'
import { Button } from '@/components/ui'
import { useRouteContext } from '../../context'

interface Props {

}

const RequestPermit: React.FC<Props> = (props) => {
  const { } = props
  const { setStep } = useRouteContext()

  return (
    <>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ใบขออนุญาต</h3>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm' onClick={() => setStep((prev: number) => prev - 1)}>ย้อนกลับ</Button>
          <Button variant='solid' size='sm'>บันทึก</Button>
        </div>
      </section>
      <section className='mt-5'>
        <div className='block xl:grid grid-cols-2 gap-5'>
          <FormPermitRoute />
          <DocumentTabList />
        </div>
      </section>
    </>
  )
}

export default React.memo<Props>(RequestPermit)
