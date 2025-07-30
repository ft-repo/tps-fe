/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button } from '@/components/ui'
import React from 'react'
import { useOtherContext } from '../../context'
import FormDocumentApproval from '../other-step/upload/FormDocumentApproval'
import FormDocumentVehicle from '../other-step/upload/FormDocumentVehicle'
import FormDocumentProposal from '../other-step/upload/FormDocumentProposal'
import { STATUS_COLOR } from '@/utils/constant'

interface Props {

}

const OtherDocument: React.FC<Props> = (props) => {
  const { } = props
  const { setStep } = useOtherContext()

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm' onClick={() => setStep((prev: number) => prev - 1)}>ย้อนกลับ</Button>
          <Button variant='solid' size='sm'>ถัดไป</Button>
        </div>
      </section>
      <section className='mt-3'>
        <div className='block lg:grid grid-cols-2 gap-5 mt-5'>
          <FormDocumentProposal />
          <FormDocumentVehicle />
        </div>
      </section>
      <section className='mt-3'>
        <FormDocumentApproval />
      </section>
    </main>
  )
}

export default React.memo<Props>(OtherDocument)
