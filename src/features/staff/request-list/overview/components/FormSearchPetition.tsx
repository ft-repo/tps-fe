/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Col, Input, Radio, Row } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  handleSearch: (value: FieldType) => void;
}

export interface FieldType {
  search: string;
  status_id: string;
}

const STATUS_OPTION = [
  {
    label: 'ตรวจเอกสาร',
    value: '1',
  },
  {
    label: 'ตรวจเส้นทาง',
    value: '2',
  },
  {
    label: 'ตรวจยานพาหนะ',
    value: '3',
  },
  {
    label: 'รอลงนาม',
    value: '4',
  },
  {
    label: 'ออกใบอนุญาต',
    value: '5',
  },
]

const FormSearchPetition: React.FC<Props> = (props) => {
  const { handleSearch } = props

  const form = useForm<FieldType>({
    defaultValues: {
      search: '',
      status_id: '1'
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    handleSearch(value)
  }, [handleSearch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='search'
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  name={field.name}
                  placeholder='พิมพ์เพื่อค้นหา...'
                  className='w-full'
                  size='large'
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
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
                />
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
          <Button
            block
            htmlType='submit'
            type='primary'
            size='large'
          >
            ค้นหา
          </Button>
        </Col>
      </Row>
    </form>
  )
}

export default React.memo<Props>(FormSearchPetition)
