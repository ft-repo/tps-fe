/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { Col, Radio, Row } from 'antd'
import { Controller, useForm } from 'react-hook-form';

interface Props {

}

export interface FieldType {
  status_id: string;
}

const STATUS_OPTION = [
  {
    label: 'ตารางสรุป',
    value: '1',
  },
  {
    label: 'สะพาน',
    value: '2',
  },
  {
    label: 'โครงสร้าง',
    value: '3',
  },
  {
    label: 'รัศมีเลี้ยว',
    value: '4',
  },
]

const FormSearchRoute: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      status_id: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <Row gutter={[16, 16]} align={'middle'}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <h5>ทางหลวงชนบทหมายเลข อย.3035 - ทางหลวงชนบทหมายเลข รย.2043</h5>
        <p>แยกทางหลวงหมายเลข 35 (กม.ที่ 30+500) - แยกทางหลวงหมายเลข 43 (กม.ที่ 20+100) </p>
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
