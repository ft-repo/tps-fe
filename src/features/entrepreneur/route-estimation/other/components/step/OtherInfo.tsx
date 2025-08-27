/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormPetition, FormVehicleContent } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useOtherContext } from '../../context'
import { useForm } from 'react-hook-form'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation'
import { useAppSelector, useAppDispatch, setLoading } from '@/store'
import { Button, Col, Modal, Row } from 'antd'
import { PetitionExtendedPostRequest } from '@/@types/services/petition'
import dayjs from 'dayjs'
import { postPetitionExtendedAPI } from '@/services/entrepreneur/PetitionService'

interface Props {

}

const OtherInfo: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()
  const { dataParser, setStep, setDataParser } = useOtherContext()
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldTypeForOther>({
    defaultValues: {
      // 1. PETITOR INFO
      company_name: user.details.business_details.business_name || '',
      company_contactor: user.details.contact_info.contact_name || '',
      company_address: dataParser.data.petition_extended_address.contact_address.house_number || '',
      company_village_number: dataParser.data.petition_extended_address.contact_address.village || '',
      company_alley: dataParser.data.petition_extended_address.contact_address.lane || '',
      company_road: dataParser.data.petition_extended_address.contact_address.road || '',
      company_province: dataParser.data.petition_extended_address.contact_address.province_id || null,
      company_district: dataParser.data.petition_extended_address.contact_address.district_id || null,
      company_sub_district: dataParser.data.petition_extended_address.contact_address.sub_district_id || null,
      company_postcode: dataParser.data.petition_extended_address.contact_address.zip_code || '',
      // 1.1 REGISTERED DETAIL
      business_type: user.details.business_details.entity_type.id,
      registered_date: dataParser.data.petition_extended_detail.cert_date ? dayjs(dataParser.data.petition_extended_detail.cert_date) : user.details.created_at ? dayjs(user.details.created_at) : null,
      registered_company_address: user.details.business_address.house_number,
      registered_company_village_no: user.details.business_address.village,
      registered_company_alley: user.details.business_address.lane,
      registered_company_road: user.details.business_address.road,
      registered_company_province: user.details.business_address.province.id || null,
      registered_company_district: user.details.business_address.district.id || null,
      registered_company_sub_district: user.details.business_address.sub_district.id || null,
      registered_company_postcode: user.details.business_address.zip_codes,
      // 1.2 TRANSFERER DETAIL
      transferer_name: dataParser.data.petition_extended_detail.poa_name || '',
      transferer_phone_number: dataParser.data.petition_extended_detail.phone_number || '',
      transferer_company_address: dataParser.data.petition_extended_address.poa_address.house_number || '',
      transferer_company_village_no: dataParser.data.petition_extended_address.poa_address.village || '',
      transferer_company_alley: dataParser.data.petition_extended_address.poa_address.lane || '',
      transferer_company_road: dataParser.data.petition_extended_address.poa_address.road || '',
      transferer_company_province: dataParser.data.petition_extended_address.poa_address.province_id || null,
      transferer_company_district: dataParser.data.petition_extended_address.poa_address.district_id || null,
      transferer_company_sub_district: dataParser.data.petition_extended_address.poa_address.sub_district_id || null,
      transferer_company_postcode: dataParser.data.petition_extended_address.poa_address.zip_code || '',
      // 2. VEHICLE DETAIL
      match_type: dataParser.match_type || null,
      towering_vehicle: dataParser.data.petition_extended_vehicle.towing_vehicle_id || null,
      semi_trailer_vehicle: dataParser.data.petition_extended_vehicle.semi_trailer_vehicle_id || null,
      etc_vehicle: dataParser.data.petition_extended_vehicle.etc_vehicle_id || null,
      towering_weight1: dataParser.data.petition_extended_vehicle.axis_weight_towing[0] || 0,
      towering_weight2: dataParser.data.petition_extended_vehicle.axis_weight_towing[1] || 0,
      towering_weight3: dataParser.data.petition_extended_vehicle.axis_weight_towing[2] || 0,
      towering_weight4: dataParser.data.petition_extended_vehicle.axis_weight_towing[3] || 0,
      towering_weight5: dataParser.data.petition_extended_vehicle.axis_weight_towing[4] || 0,
      towering_weight6: dataParser.data.petition_extended_vehicle.axis_weight_towing[5] || 0,
      towering_weight7: dataParser.data.petition_extended_vehicle.axis_weight_towing[6] || 0,
      semi_weight1: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[0] || 0,
      semi_weight2: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[1] || 0,
      semi_weight3: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[2] || 0,
      semi_weight4: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[3] || 0,
      semi_weight5: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[4] || 0,
      semi_weight6: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[5] || 0,
      semi_weight7: dataParser.data.petition_extended_vehicle.axis_weight_semi_trailer[6] || 0,
      // 3. REMARK
      petition_number: String(dataParser.data.petition_extended_detail.ref_form_no) || '',
      remark: dataParser.data.petition_extended_detail.remark || ''
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
  } = form

  const onSubmit = useCallback(async (value: FieldTypeForOther) => {
    const body: PetitionExtendedPostRequest = {
      petition_extended_detail: {
        cert_date: dayjs(value.registered_date).format('YYYY-MM-DD'),
        poa_name: value.transferer_name,
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
        towing_vehicle_id: Number(value.towering_vehicle),
        semi_trailer_vehicle_id: Number(value.semi_trailer_vehicle),
        etc_vehicle_id: Number(value.etc_vehicle),
        axis_weight_towing: [
          Number(value.towering_weight1),
          Number(value.towering_weight2),
          Number(value.towering_weight3),
          Number(value.towering_weight4),
          Number(value.towering_weight5),
          Number(value.towering_weight6),
          Number(value.towering_weight7),
        ],
        axis_weight_semi_trailer: [
          Number(value.semi_weight1),
          Number(value.semi_weight2),
          Number(value.semi_weight3),
          Number(value.semi_weight4),
          Number(value.semi_weight5),
          Number(value.semi_weight6),
          Number(value.semi_weight7),
        ],
      },
    }

    dispatch(setLoading(true))
    try {
      const response = await postPetitionExtendedAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            setStep(2)
            setDataParser({
              data: body,
              temporary_id: response.data.temporary_id,
              match_type: Number(value.match_type)
            })
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, setDataParser, setStep])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate(-1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
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
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <FormVehicleContent
              control={control}
              setValue={setValue}
            />
          </Col>
        </Row>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(OtherInfo)
