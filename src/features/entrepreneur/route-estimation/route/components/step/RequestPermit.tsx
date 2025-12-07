/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { FormPermitRoute } from '..'
import DocumentTabList from '../route-estimate/petition/DocumentTabList'
import { useRouteContext } from '../../context'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Col, Modal, Row } from 'antd'
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list'
import { PetitionConfirmRequest } from '@/@types/services/petition'
import dayjs from 'dayjs'
import { postConfirmPetitionAPI } from '@/services/entrepreneur/PetitionService'
import { getPetitionData } from '@/store/slices/entrepreneur'

interface Props {

}

const RequestPermit: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser, setStep } = useRouteContext()
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { user } = useAppSelector(state => state.auth)
  const { province } = useAppSelector(state => state.master)
  const { petition } = useAppSelector(state => state.entrepreneur.permitList)
  const navigate = useNavigate()

  // console.log(dataParser)
  // console.log(user)

  const form = useForm<FieldTypePetition>({
    defaultValues: {
      set_id: dataParser.res_data.set_id,
      start_date: dayjs().add(62, 'day'),
      end_date: dayjs().add(62, 'day').add(1, 'year'),
      contact_name: user.details.contact_info.contact_name,
      phone_number: user.details.contact_info.phone_number,
      project_name: '',
      start_point: dataParser.raw_body.start_point,
      end_point: dataParser.raw_body.end_point,
      start_province: dataParser.region_detail.start.id,
      end_Povince: dataParser.region_detail.end.id,
      poa_url: {
        file: [],
        url: ''
      },
      mach_book_url: {
        file: [],
        url: ''
      },
      vehicle: dataParser.res_data.estimate.map(item => {
        return {
          estimate_id: item.estimate_id,
          truck_dimension_url: {
            file: [],
            url: ''
          },
          semi_trailer_dimension_url: {
            file: [],
            url: ''
          },
          combined_vehicle_url: {
            file: [],
            url: ''
          },
          turning_radius_url: {
            file: [],
            url: ''
          },
          cargo_dimension_url: {
            file: [],
            url: ''
          },
          highway_dept_permit_url: {
            file: [],
            url: ''
          },
          highway_dept_permit_number_url: {
            file: [],
            url: ''
          },
          rural_highway_dept_permit_url: {
            file: [],
            url: ''
          },
          rural_highway_dept_permit_number_url: {
            file: [],
            url: ''
          },
        }
      })
    }
  })

  const { handleSubmit, control, setValue } = form

  const onSubmit = useCallback(async (value: FieldTypePetition) => {
    const body: PetitionConfirmRequest = {
      set_id: value.set_id,
      start_date: dayjs(value.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(value.end_date).format('YYYY-MM-DD'),
      contact_name: value.contact_name,
      phone_number: value.phone_number,
      project_name: value.project_name,
      start_point: value.start_point,
      end_point: value.end_point,
      start_province: String(province.find(item => item.id === value.start_province)?.name_th) || String(value.start_province),
      end_Povince: String(province.find(item => item.id === value.end_Povince)?.name_th) || String(value.end_Povince),
      poa_url: value.poa_url.url,
      mach_book_url: value.mach_book_url.url,
      vehicle: value.vehicle.map((item) => {
        return {
          estimate_id: item.estimate_id,
          truck_dimension_url: item.truck_dimension_url.url,
          semi_trailer_dimension_url: item.semi_trailer_dimension_url.url,
          combined_vehicle_url: item.combined_vehicle_url.url,
          turning_radius_url: item.turning_radius_url.url,
          cargo_dimension_url: item.cargo_dimension_url.url,
          highway_dept_permit_url: item.highway_dept_permit_url.url,
          highway_dept_permit_number_url: item.highway_dept_permit_number_url.url,
          rural_highway_dept_permit_url: item.rural_highway_dept_permit_url.url,
          rural_highway_dept_permit_number_url: item.rural_highway_dept_permit_number_url.url,
        }
      })
    }

    dispatch(setLoading(true))
    try {
      const response = await postConfirmPetitionAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'ส่งคำขออนุญาตสำเร็จ',
          content: 'เจ้าหน้าที่ได้รับคำขออนุญาตของคุณแล้ว ใช้ระยะเวลาการพิจารณาไม่เกิน 62 วัน คุณสามารถติดตามสถานะได้ที่ รายการขออนุญาต',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getPetitionData(petition.overview.search))
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
  }, [dispatch, province, petition.overview.search, navigate])

  const confirmSubmit = useCallback(() => {
    Modal.confirm({
      title: 'ยืนยันการขอใบอนุญาต',
      content: 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน',
      okText: 'ขอใบอนุญาต',
      cancelText: 'ยกเลิก',
      onOk: () => submitRef.current?.click(),
      onCancel: () => Modal.destroyAll(),
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        loading: loading
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        disabled: loading
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      }
    })
  }, [loading])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ใบขออนุญาต</h3>
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
            onClick={() => confirmSubmit()}
          >
            บันทึก
          </Button>
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <FormPermitRoute
                control={control}
                setValue={setValue}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <DocumentTabList
                control={control}
                setValue={setValue}
              />
            </Col>
          </Row>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </>
  )
}

export default React.memo<Props>(RequestPermit)
