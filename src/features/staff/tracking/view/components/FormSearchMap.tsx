/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Badge, Button, Col, Row, Select } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  setDetailClick: (value: boolean) => void;
}

interface FieldType {
  search: string | null;
}

const TEST = [
  {
    label: 'ทดสอบ',
    value: 1
  }
]

const FormSearchMap: React.FC<Props> = (props) => {
  const { setDetailClick } = props

  const form = useForm<FieldType>({
    defaultValues: {
      search: null
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='search'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='โครงการทั้งหมด...'
                    options={TEST}
                    fieldNames={{
                      label: 'label',
                      value: 'value'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='lg:text-right'>
          <Button
            type='primary'
            size='large'
            onClick={() => setDetailClick(false)}
          >
            โครงการ <Badge count={5} />
          </Button>
        </Col>
      </Row>
    </form>
  )
}

export default React.memo<Props>(FormSearchMap)
