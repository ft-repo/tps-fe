/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Col, Input, Row, Button } from 'antd'

interface Props {
  handleSearch: (value: string) => void;
}

interface FieldType {
  search: string;
}

const FormSearch: React.FC<Props> = (props) => {
  const { handleSearch } = props

  const form = useForm<FieldType>({
    defaultValues: {
      search: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    handleSearch(value.search)
  }, [handleSearch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={20} md={20} lg={20} xl={12} xxl={8}>
          <Controller
            name="search"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  name={field.name}
                  placeholder="พิมพ์เพื่อค้นหา..."
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
        <Col xs={24} sm={4} md={4} lg={4} xl={3} xxl={2}>
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

export default React.memo<Props>(FormSearch)
