/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { Badge, Button, Col, Row } from 'antd'
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/store';

interface Props {
  setShowTable: (value: 'summary' | 'bridge' | 'turn_radius') => void;
  remark: 'ตารางสรุป' | 'สะพาน' | 'รัศมีเลี้ยว';
  setRemark: (value: 'ตารางสรุป' | 'สะพาน' | 'รัศมีเลี้ยว') => void;
}

export interface FieldType {
  status_id: 'summary' | 'bridge' | 'turn_radius';
}

const FormSearchRoute: React.FC<Props> = (props) => {
  const { setShowTable, remark, setRemark } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const { estimate } = useAppSelector(state => state.entrepreneur.permitList)
  const detail = estimate.detail

  // console.log(estimate)

  const form = useForm<FieldType>({
    defaultValues: {
      status_id: 'summary'
    }
  })

  const { handleSubmit, setValue } = form

  const onSubmit = useCallback((value: FieldType) => {
    setShowTable(value.status_id)
  }, [setShowTable])

  const renderRoadCodeName = useCallback((roadCode: string, roadName: string) => {
    const nameArr = [roadCode, roadName]
    if (!nameArr?.length) return '-'
    return nameArr.join(' ')
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={15} xxl={15}>
          <h5>ทางหลวงชนบทหมายเลข {renderRoadCodeName(detail.start_road_code, detail.start_road)} - {renderRoadCodeName(detail.end_road_code, detail.end_road)}</h5>
          <p>แยกทางหลวงหมายเลข {renderRoadCodeName(detail.start_road_code, detail.start_road)} - {renderRoadCodeName(detail.end_road_code, detail.end_road)}</p>
          {/* <h5>ทางหลวงชนบทหมายเลข อย.3035 - ทางหลวงชนบทหมายเลข รย.2043</h5>
        <p>แยกทางหลวงหมายเลข 35 (กม.ที่ 30+500) - แยกทางหลวงหมายเลข 43 (กม.ที่ 20+100) </p> */}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={3} xxl={3}>
          <Button
            block
            htmlType='submit'
            type='primary'
            size='large'
            style={remark === 'ตารางสรุป' ? { backgroundColor: '#0958d9', borderColor: '#0958d9' } : { backgroundColor: '#4096ff', borderColor: '#4096ff' }}
            onClick={() => {
              setValue('status_id', 'summary')
              setRemark('ตารางสรุป')
            }}
          >
            ตารางสรุป
          </Button>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={3} xxl={3}>
          <Badge
            count={estimate.summary.data.data.find(item => item.type === 'สะพานทั้งหมด')?.total || 0}
            styles={{
              root: {
                width: '100%'
              }
            }}
          >
            <Button
              block
              htmlType='submit'
              type='primary'
              size='large'
              style={remark === 'สะพาน' ? { backgroundColor: '#0958d9', borderColor: '#0958d9' } : { backgroundColor: '#4096ff', borderColor: '#4096ff' }}
              onClick={() => {
                setValue('status_id', 'bridge')
                setRemark('สะพาน')
              }}
            >
              สะพาน
            </Button>
          </Badge>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={3} xxl={3}>
          <Badge
            count={estimate.summary.data.data.find(item => item.type === 'รัศมีเลี้ยวทั้งหมด')?.total || 0}
            styles={{
              root: {
                width: '100%'
              }
            }}
          >
            <Button
              block
              htmlType='submit'
              type='primary'
              size='large'
              style={remark === 'รัศมีเลี้ยว' ? { backgroundColor: '#0958d9', borderColor: '#0958d9' } : { backgroundColor: '#4096ff', borderColor: '#4096ff' }}
              onClick={() => {
                setValue('status_id', 'turn_radius')
                setRemark('รัศมีเลี้ยว')
              }}
            >
              รัศมีเลี้ยว
            </Button>
          </Badge>
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

export default React.memo<Props>(FormSearchRoute)
