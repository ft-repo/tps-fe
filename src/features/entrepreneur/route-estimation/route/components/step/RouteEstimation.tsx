/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr } from '@/@types/entrepreneur/route-estimation'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Modal } from 'antd'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ContentTab } from '../../components'
import { PetitionEstimateRequest } from '@/@types/services/petition'
import { postPetitionEstimateAPI } from '@/services/entrepreneur/PetitionService'
import { useRouteContext } from '../../context'

interface Props {

}

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const navigate = useNavigate()
  const { dataParser, setStep, setDataParser } = useRouteContext()

  const form = useForm<FieldTypeArr>({
    defaultValues: {
      route_form: dataParser.raw_body.route_form.length ? dataParser.raw_body.route_form :
        [
          {
            match_type: null,
            turn_radius: 0,
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
            start_latitude: 0,
            start_longitude: 0,
            end_latitude: 0,
            end_longitude: 0,
          }
        ]
    }
  })

  const { handleSubmit, control, setValue } = form

  const onSubmit = useCallback(async (value: FieldTypeArr) => {
    const body: PetitionEstimateRequest = {
      vehicle: value.route_form.map((item) => {
        return {
          turn_radius: Number(item.turn_radius),
          towing_vehicle_id: Number(item.towering_vehicle),
          semi_trailer_vehicle_id: Number(item.semi_trailer_vehicle),
          etc_vehicle_id: Number(item.etc_vehicle),
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
        coordinates: value.route_form.flatMap((item) => {
          return [
            Number(item.start_longitude), Number(item.start_latitude)
          ]
        })
      },
      end_point: {
        type: "Point",
        coordinates: value.route_form.flatMap((item) => {
          return [
            Number(item.end_longitude), Number(item.end_latitude)
          ]
        })
      },
      vehicle_route: {
        type: "LineString",
        coordinates: value.route_form.flatMap((item) => [
          [Number(item.start_longitude), Number(item.start_latitude)],
          [Number(item.end_longitude), Number(item.end_latitude)]
        ])
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
        <ContentTab
          control={control}
          setValue={setValue}
        />
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(RouteEstimation)
