/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormPetition, FormVehicleContent } from '../../components'
import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { useOtherContext } from '../../context'

interface Props {

}

const OtherInfo: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const { setStep } = useOtherContext()

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm' onClick={() => navigate('/route-estimation/route')}>ย้อนกลับ</Button>
          <Button variant='solid' size='sm' onClick={() => setStep(2)}>ถัดไป</Button>
        </div>
      </section>
      <div className='block xl:grid grid-cols-2 gap-5 mt-5'>
        <FormPetition />
        <FormVehicleContent />
      </div>
    </main>
  )
}

export default React.memo<Props>(OtherInfo)
