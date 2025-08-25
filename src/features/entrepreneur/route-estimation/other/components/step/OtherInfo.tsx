/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormPetition, FormVehicleContent } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useOtherContext } from '../../context'
import { useForm } from 'react-hook-form'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation'
import { useAppDispatch, useAppSelector } from '@/store'
import { Button, Col, Row } from 'antd'
import { PetitionExtendedPostRequest } from '@/@types/services/petition'

interface Props {

}

const OtherInfo: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()
  const { setStep, setDataParser } = useOtherContext()
  const submitRef = useRef<HTMLButtonElement>(null)

  console.log(user)

  const form = useForm<FieldTypeForOther>({
    defaultValues: {
      // 1. PETITOR INFO
      company_name: user.details.business_details.business_name || '',
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
      business_type: user.details.business_details.entity_type.id,
      registered_date: '',
      registered_company_address: user.details.business_address.house_number,
      registered_company_village_no: user.details.business_address.village,
      registered_company_alley: user.details.business_address.lane,
      registered_company_road: user.details.business_address.road,
      registered_company_province: user.details.business_address.province.id,
      registered_company_district: user.details.business_address.district.id,
      registered_company_sub_district: user.details.business_address.sub_district.id,
      registered_company_postcode: user.details.business_address.zip_codes,
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
      vehicle_axles_weight1: 0,
      vehicle_axles_weight2: 0,
      vehicle_axles_weight3: 0,
      vehicle_axles_weight4: 0,
      vehicle_axles_weight5: 0,
      vehicle_axles_weight6: 0,
      vehicle_axles_weight7: 0,
      // 3. REMARK
      petition_number: '',
      remark: ''
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = form

  const onSubmit = useCallback(async (value: FieldTypeForOther) => {
    const body: PetitionExtendedPostRequest = {
      petition_extended_detail: {
        cert_date: value.registered_date,
        poa_name: value.company_name,
        phone_number: value.transferer_phone_number,
        ref_form_no: Number(value.petition_number),
        remark: value.remark
      },
      petition_extended_address: {
        contact_address: {
          house_number: value.company_address,
          village: value.company_village_number,
          lane: value.company_road,
          road: value.company_alley,
          sub_district_id: Number(value.company_sub_district),
          district_id: Number(value.company_district),
          province_id: Number(value.company_province),
          zip_code: value.company_postcode
        },
        poa_address: {
          house_number: value.transferer_company_address,
          village: value.transferer_company_village_no,
          lane: value.transferer_company_road,
          road: value.transferer_company_alley,
          sub_district_id: Number(value.transferer_company_sub_district),
          district_id: Number(value.transferer_company_district),
          province_id: Number(value.transferer_company_province),
          zip_code: value.transferer_company_postcode
        }
      },
      petition_extended_vehicle: {
        characteristic: value.vehicle_appearance,
        type: value.vehicle_type,
        plate_no: value.vehicle_license_plate,
        plate_province: value.vehicle_province,
        color: value.vehicle_color,
        axis_number: Number(value.vehicle_axles),
        weight_total: Number(value.vehicle_weight),
        axis_weight: [
          value.vehicle_axles_weight1,
          value.vehicle_axles_weight2,
          value.vehicle_axles_weight3,
          value.vehicle_axles_weight4,
          value.vehicle_axles_weight5,
          value.vehicle_axles_weight6,
          value.vehicle_axles_weight7
        ]
      },
    }

    console.log(body)
  }, [])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate('/route-estimation/route')}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            size='large'
            className='w-full lg:w-auto'
            onClick={() => submitRef.current?.click()}
          >
            ถัดไป
          </Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <FormPetition
              control={control}
              setValue={setValue}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <FormVehicleContent
              control={control}
              setValue={setValue}
              errors={errors}
            />
          </Col>
        </Row>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(OtherInfo)
