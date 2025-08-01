/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormPetition, FormVehicleContent } from '../../components'
import { Button, Notification, toast } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { useOtherContext } from '../../context'
import { useForm } from 'react-hook-form'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation'

interface Props {

}

const OtherInfo: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const { setStep, setDataParser } = useOtherContext()
  const refSubmit = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldTypeForOther>({
    defaultValues: {
      // 1. PETITOR INFO
      company_name: '',
      company_contactor: '',
      company_address: '',
      company_village_number: '',
      company_alley: '',
      company_road: '',
      company_province: '',
      company_district: '',
      company_sub_district: '',
      company_postcode: '',
      // 1.1 REGISTERED DETAIL
      business_type: '',
      registered_date: '',
      registered_company_address: '',
      registered_company_village_no: '',
      registered_company_alley: '',
      registered_company_road: '',
      registered_company_province: '',
      registered_company_district: '',
      registered_company_sub_district: '',
      registered_company_postcode: '',
      // 1.2 TRANSFERER DETAIL
      transferer_name: '',
      transferer_phone_number: '',
      transferer_company_address: '',
      transferer_company_village_no: '',
      transferer_company_alley: '',
      transferer_company_road: '',
      transferer_company_province: '',
      transferer_company_district: '',
      transferer_company_sub_district: '',
      transferer_company_postcode: '',
      // 2. VEHICLE DETAIL
      vehicle_appearance: '',
      vehicle_type: '',
      vehicle_license_plate: '',
      vehicle_province: '',
      vehicle_color: '',
      vehicle_axles: '',
      vehicle_weight: '',
      // 3. REMARK
      petition_number: '',
      remark: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((data: FieldTypeForOther) => {
    toast.push(
      <Notification
        title={'Success'}
        type={'success'}
        onClose={() => {
          setStep(2)
          setDataParser(data)
        }}
      >
        <p className='break-all'>Successfully submit data</p>
      </Notification>
    )
  }, [setDataParser, setStep])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button variant='default' size='sm' onClick={() => navigate('/route-estimation/route')}>ย้อนกลับ</Button>
          <Button variant='solid' size='sm' onClick={() => refSubmit.current?.click()}>ถัดไป</Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='block xl:grid grid-cols-2 gap-5 mt-5'>
          <FormPetition
            control={control}
          />
          <FormVehicleContent
            control={control}
          />
        </div>
        <button ref={refSubmit} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(OtherInfo)
