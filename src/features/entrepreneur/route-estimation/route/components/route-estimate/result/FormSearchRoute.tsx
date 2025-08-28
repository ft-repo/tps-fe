/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { Col, Radio, Row } from 'antd'
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '@/store';

interface Props {
  setShowTable: (value: 'summary' | 'bridge' | 'turn_radius') => void;
}

export interface FieldType {
  status_id: 'summary' | 'bridge' | 'turn_radius';
}

const STATUS_OPTION = [
  {
    label: 'ตารางสรุป',
    value: 'summary',
  },
  {
    label: 'สะพาน',
    value: 'bridge',
  },
  // {
  //   label: 'โครงสร้าง',
  //   value: 'structure',
  // },
  {
    label: 'รัศมีเลี้ยว',
    value: 'turn_radius',
  },
]

const FormSearchRoute: React.FC<Props> = (props) => {
  const { setShowTable } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const { estimate } = useAppSelector(state => state.entrepreneur.permitList)
  const detail = estimate.detail

  const form = useForm<FieldType>({
    defaultValues: {
      status_id: 'summary'
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    setShowTable(value.status_id)
  }, [setShowTable])

  const renderRoadCodeName = useCallback((roadCode: string, roadName: string) => {
    const nameArr = [roadCode, roadName]
    if (!nameArr.length) return '-'
    return nameArr.join(' ')
  }, [])

  return (
    <Row gutter={[16, 16]} align={'middle'}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <h5>ทางหลวงชนบทหมายเลข {renderRoadCodeName(detail.start_road_code, detail.start_road)} - {renderRoadCodeName(detail.end_road_code, detail.end_road)}</h5>
        <p>แยกทางหลวงหมายเลข {renderRoadCodeName(detail.start_road_code, detail.start_road)} - {renderRoadCodeName(detail.end_road_code, detail.end_road)}</p>
        {/* <h5>ทางหลวงชนบทหมายเลข อย.3035 - ทางหลวงชนบทหมายเลข รย.2043</h5>
        <p>แยกทางหลวงหมายเลข 35 (กม.ที่ 30+500) - แยกทางหลวงหมายเลข 43 (กม.ที่ 20+100) </p> */}
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='status_id'
            control={control}
            render={({ field }) => {
              return (
                <Radio.Group
                  block
                  {...field}
                  name={field.name}
                  value={field.value}
                  optionType="button"
                  buttonStyle="solid"
                  size='large'
                  options={STATUS_OPTION}
                  onChange={(e) => {
                    field.onChange(e)
                    submitRef.current?.click()
                  }}
                />
              )
            }}
          />
          <button ref={submitRef} hidden type='submit' />
        </form>
      </Col>
    </Row>
  )
}

export default React.memo<Props>(FormSearchRoute)
