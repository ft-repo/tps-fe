/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr } from '@/@types/entrepreneur/route-estimation'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Col, Input, Modal, Row } from 'antd'
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ContentTab } from '../../components'
import { PetitionEstimateRequest } from '@/@types/services/petition'
import { postPetitionEstimateAPI } from '@/services/entrepreneur/PetitionService'
import { useRouteContext } from '../../context'
import MapRoute from '@/components/ui/Maps'

interface Props {

}

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { routeDirection } = useAppSelector(state => state.routeDirection)
  const navigate = useNavigate()
  const { dataParser, setStep, setDataParser } = useRouteContext()

  // console.log(dataParser.raw_body.route_form)

  const form = useForm<FieldTypeArr>({
    defaultValues: {
      start_latitude: dataParser.raw_body.start_latitude || '',
      start_longitude: dataParser.raw_body.start_longitude || '',
      end_latitude: dataParser.raw_body.end_latitude || '',
      end_longitude: dataParser.raw_body.end_longitude || '',
      route_form: dataParser.raw_body.route_form.length ? dataParser.raw_body.route_form :
        [
          {
            match_type: null,
            turn_radius: '',
            towering_vehicle: null,
            semi_trailer_vehicle: null,
            etc_vehicle: null,
            towering_weight1: 0,
            towering_weight2: 0,
            towering_weight3: 0,
            towering_weight4: 0,
            towering_weight5: 0,
            towering_weight6: 0,
            towering_weight7: 0,
            semi_weight1: 0,
            semi_weight2: 0,
            semi_weight3: 0,
            semi_weight4: 0,
            semi_weight5: 0,
            semi_weight6: 0,
            semi_weight7: 0,
          }
        ]
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch
  } = form

  const startLatitude = watch('start_latitude')
  const startLongitude = watch('start_longitude')
  const endLatitude = watch('end_latitude')
  const endLongitude = watch('end_longitude')

  const onSubmit = useCallback(async (value: FieldTypeArr) => {
    const body: PetitionEstimateRequest = {
      vehicle: value.route_form.map((item) => {
        return {
          turn_radius: Number(item.turn_radius),
          towing_vehicle_id: item.match_type === 3 ? null : Number(item.towering_vehicle),
          semi_trailer_vehicle_id: item.match_type === 3 ? null : Number(item.semi_trailer_vehicle),
          etc_vehicle_id: item.match_type === 2 ? null : Number(item.etc_vehicle),
          towing_axis_weight: [
            Number(item.towering_weight1),
            Number(item.towering_weight2),
            Number(item.towering_weight3),
            Number(item.towering_weight4),
            Number(item.towering_weight5),
            Number(item.towering_weight6),
            Number(item.towering_weight7),
          ],
          semi_trailer_axis_weight: [
            Number(item.semi_weight1),
            Number(item.semi_weight2),
            Number(item.semi_weight3),
            Number(item.semi_weight4),
            Number(item.semi_weight5),
            Number(item.semi_weight6),
            Number(item.semi_weight7),
          ]
        }
      }),
      start_point: {
        type: "Point",
        coordinates: [Number(value.start_longitude), Number(value.start_latitude)]
      },
      end_point: {
        type: "Point",
        coordinates: [Number(value.end_longitude), Number(value.end_latitude)]
      },
      vehicle_route: {
        type: "LineString",
        coordinates: routeDirection?.features[0]?.geometry?.coordinates || [
          [Number(value.start_longitude), Number(value.start_latitude)],
          [Number(value.end_longitude), Number(value.end_latitude)]
        ]
      }
    }
    dispatch(setLoading(true))
    try {
      const response = await postPetitionEstimateAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            setDataParser({
              req_data: body,
              res_data: response.data,
              raw_body: value
            })
            setStep(2)
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
  }, [dispatch, setDataParser, setStep, routeDirection?.features])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate('/permit-list')}
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <ContentTab
              control={control}
              setValue={setValue}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[50vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <MapRoute
                coordinates={[[Number(startLongitude || 0), Number(startLatitude || 0)], [Number(endLongitude || 0), Number(endLatitude || 0)]]}
                isRouteEstimate={true}
              />
            </div>
            <section className='mt-5'>
              <h5>เส้นทาง</h5>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='start_latitude'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุละติจูด (ต้นทาง)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ละติจูด (ต้นทาง)</label>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.start_latitude &&
                            <p className='text-red-500'>{errors.start_latitude.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='start_longitude'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุลองจิจูด (ต้นทาง)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ลองจิจูด (ต้นทาง)</label>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.start_longitude &&
                            <p className='text-red-500'>{errors.start_longitude.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='end_latitude'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุละติจูด (ปลายทาง)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ละติจูด (ปลายทาง)</label>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.end_latitude &&
                            <p className='text-red-500'>{errors.end_latitude.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='end_longitude'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุลองจิจูด (ปลายทาง)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ลองจิจูด (ปลายทาง)</label>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.end_longitude &&
                            <p className='text-red-500'>{errors.end_longitude.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(RouteEstimation)
