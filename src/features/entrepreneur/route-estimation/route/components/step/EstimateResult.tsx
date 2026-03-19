/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Col, Modal, Row, Tooltip } from 'antd'
import React, { useCallback, useState } from 'react'
import { useRouteContext } from '../../context'
import ContentTab from '../route-estimate/result/ContentTab'
import ContentRouteList from '../route-estimate/result/ContentRouteList'
import DisplayMap from '../map/DisplayMap'
import { InfoCircleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { postConfirmPetitionRoadMapAPI } from '@/services/entrepreneur/PetitionService'
import { AxiosError } from 'axios'
import { getPetitionData } from '@/store/slices/entrepreneur'
// import Map from '../map/Map'

interface Props {

}

const EstimateResult: React.FC<Props> = (props) => {
  const { } = props
  const { loading } = useAppSelector(state => state.layout)
  const { estimate, petition } = useAppSelector(state => state.entrepreneur.permitList)
  const { setStep, index, item, dataParser } = useRouteContext()
  const detail = estimate.detail
  // STATE
  const [remark, setRemark] = useState<'ตารางสรุป' | 'สะพาน' | 'รัศมีเลี้ยว'>('ตารางสรุป')
  // LOCATION STATE
  const { state } = useLocation()
  // DISPATCH
  const dispatch = useAppDispatch()
  // NAVIGATE
  const navigate = useNavigate()

  const onSubmit = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const response = await postConfirmPetitionRoadMapAPI({
        petition_id: state?.petition_id || 0,
        new_set_id: dataParser.res_data.set_id,
      })
      if (response.status === 200) {
        Modal.success({
          title: 'ส่งคำขออนุญาตสำเร็จ',
          content: 'เจ้าหน้าที่ได้รับคำขออนุญาตของคุณแล้ว ใช้ระยะเวลาการพิจารณาภายใน 61 วันทำการโดยไม่นับรวมระยะเวลาที่ผู้ยื่นคำขอใช้ในการแก้ไขหรือเพิ่มเติมเอกสาร ในกรณีที่เอกสารหลักฐานที่ยื่นไม่ครบถ้วนหรือไม่ถูกต้องตามหลักเกณฑ์ที่กำหนด คุณสามารถติดตามสถานะได้ที่ รายการขออนุญาต',
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
      if (error instanceof AxiosError) {
        Modal.error({
          title: 'ผิดพลาด',
          content: error?.response?.data?.message,
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
  }, [dispatch, state?.petition_id, dataParser.res_data.set_id, navigate, petition.overview.search])

  const confirmSubmit = useCallback(() => {
    Modal.confirm({
      title: 'ยืนยันการขอใบอนุญาต',
      content: 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน',
      okText: 'ขอใบอนุญาต',
      cancelText: 'ยกเลิก',
      onOk: () => onSubmit(),
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
  }, [loading, onSubmit])

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
            onClick={() => {
              if (state?.petition_id) {
                confirmSubmit()
              } else {
                setStep((prev: number) => prev + 1)
              }
            }}
          >
            ขอใบนุญาต
          </Button>
        </div>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <ContentTab />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[77vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <DisplayMap
                coord={[detail?.start_point || 0, detail?.end_point || 0]}
                line={detail?.vehicle_route}
              />
            </div>
          </Col>
        </Row>
      </section>
      <hr className='my-5' />
      <section>
        <h3 className='flex items-center gap-3 flex-wrap'>รายการประเมินเส้นทาง ({remark}){remark !== 'รัศมีเลี้ยว' ? null : <Tooltip title="เอกสารสูตรคำนวณรัศมีวงเลี้ยว"><InfoCircleFilled style={{ color: '#69b1ff' }} onClick={() => window.open('/pdf/สูตรคำนวณรัศมีวงเลี้ยว.pdf', '_blank')} /></Tooltip>}</h3>
        <section className='mt-3'>
          <ContentRouteList
            item={item}
            index={index}
            remark={remark}
            setRemark={setRemark}
          />
        </section>
      </section>
    </main>
  )
}

export default React.memo<Props>(EstimateResult)
