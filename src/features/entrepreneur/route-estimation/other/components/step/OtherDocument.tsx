/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { useOtherContext } from '../../context'
import FormDocumentApproval from '../other-step/upload/FormDocumentApproval'
import FormDocumentVehicle from '../other-step/upload/FormDocumentVehicle'
import FormDocumentProposal from '../other-step/upload/FormDocumentProposal'
import { Button, Modal } from 'antd'
import { useForm } from 'react-hook-form'
import { DocumentFieldType } from '@/@types/entrepreneur/route-estimation'
import { PetitionExtendedDocumentPostRequest } from '@/@types/services/petition'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { postConfirmPetitionExtendedAPI } from '@/services/entrepreneur/PetitionService'
import { getPetitionExtendedData } from '@/store/slices/entrepreneur'
import { useNavigate } from 'react-router-dom'

interface Props {

}

const OtherDocument: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser, setStep } = useOtherContext()
  const dispatch = useAppDispatch()
  const { petition_extended } = useAppSelector(state => state.entrepreneur.permitList)
  const { loading } = useAppSelector(state => state.layout)
  const navigate = useNavigate()
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<DocumentFieldType>({
    defaultValues: {
      petition_extended_user_document: {
        cid_url: {
          file: [],
          url: ''
        },
        company_certificate_url: {
          file: [],
          url: ''
        },
        vehicle_permit_url: {
          file: [],
          url: ''
        },
        power_of_attorney_url: {
          file: [],
          url: ''
        },
      },
      petition_extended_vehicle_document: {
        vehicle_registration_url: {
          file: [],
          url: ''
        },
        vehicle_photos_url: {
          file: [],
          url: ''
        },
        vehicle_dimensions_empty_url: {
          file: [],
          url: ''
        },
        vehicle_dimensions_loaded_url: {
          file: [],
          url: ''
        },
        prefab_parts_details_url: {
          file: [],
          url: ''
        },
        vehicle_turning_radius_url: {
          file: [],
          url: ''
        }
      },
      petition_extended_audit_document: {
        bridge_structure_calculation_url: {
          file: [],
          url: ''
        },
        road_structure_calculation_url: {
          file: [],
          url: ''
        },
        bridge_engineer_certificate_url: {
          file: [],
          url: ''
        },
        road_engineer_certificate_url: {
          file: [],
          url: ''
        },
        mechanical_engineer_certificate_url: {
          file: [],
          url: ''
        },
        safety_management_plan_url: {
          file: [],
          url: ''
        },
        route_map_url: {
          file: [],
          url: ''
        },
        operation_plan_url: {
          file: [],
          url: ''
        },
        contact_info_url: {
          file: [],
          url: ''
        }
      }
    }
  })

  const {
    handleSubmit,
    control,
    setValue
  } = form

  const onSubmit = useCallback(async (value: DocumentFieldType) => {
    const body: PetitionExtendedDocumentPostRequest = {
      petition_extended_user_document: {
        cid_url: value.petition_extended_user_document.cid_url.url,
        company_certificate_url: value.petition_extended_user_document.company_certificate_url.url,
        vehicle_permit_url: value.petition_extended_user_document.vehicle_permit_url.url,
        power_of_attorney_url: value.petition_extended_user_document.power_of_attorney_url.url
      },
      petition_extended_vehicle_document: {
        vehicle_registration_url: value.petition_extended_vehicle_document.vehicle_registration_url.url,
        vehicle_photos_url: value.petition_extended_vehicle_document.vehicle_photos_url.url,
        vehicle_dimensions_empty_url: value.petition_extended_vehicle_document.vehicle_dimensions_empty_url.url,
        vehicle_dimensions_loaded_url: value.petition_extended_vehicle_document.vehicle_dimensions_loaded_url.url,
        prefab_parts_details_url: value.petition_extended_vehicle_document.prefab_parts_details_url.url,
        vehicle_turning_radius_url: value.petition_extended_vehicle_document.vehicle_turning_radius_url.url
      },
      petition_extended_audit_document: {
        bridge_structure_calculation_url: value.petition_extended_audit_document.bridge_structure_calculation_url.url,
        road_structure_calculation_url: value.petition_extended_audit_document.road_structure_calculation_url.url,
        bridge_engineer_certificate_url: value.petition_extended_audit_document.bridge_engineer_certificate_url.url,
        road_engineer_certificate_url: value.petition_extended_audit_document.road_engineer_certificate_url.url,
        mechanical_engineer_certificate_url: value.petition_extended_audit_document.mechanical_engineer_certificate_url.url,
        safety_management_plan_url: value.petition_extended_audit_document.safety_management_plan_url.url,
        route_map_url: value.petition_extended_audit_document.route_map_url.url,
        operation_plan_url: value.petition_extended_audit_document.operation_plan_url.url,
        contact_info_url: value.petition_extended_audit_document.contact_info_url.url
      }
    }

    dispatch(setLoading(true))
    try {
      const response = await postConfirmPetitionExtendedAPI(dataParser.temporary_id, body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getPetitionExtendedData(petition_extended.overview.search))
            navigate('/permit-list')
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
  }, [dataParser.temporary_id, dispatch, navigate, petition_extended.overview.search])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => setStep((prev: number) => prev - 1)}
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
            บันทึกข้อมูล
          </Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='mt-3'>
          <div className='block xl:grid grid-cols-2 gap-5 mt-5'>
            <FormDocumentProposal
              control={control}
              setValue={setValue}
            />
            <FormDocumentVehicle
              control={control}
              setValue={setValue}
            />
          </div>
        </section>
        <section className='mt-3'>
          <FormDocumentApproval
            control={control}
            setValue={setValue}
          />
        </section>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(OtherDocument)
