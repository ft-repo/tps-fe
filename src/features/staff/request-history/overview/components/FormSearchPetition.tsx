/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button } from '@/components/ui';
import { Col, Input, Row } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {

}

interface FieldType {
  search: string;
}

const FormSearchPetition: React.FC<Props> = (props) => {
  const { } = props

  const form = useForm<FieldType>({
    defaultValues: {
      search: '',
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
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
        <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
          <Button
            block
            type='submit'
            variant='solid'
          >
            ค้นหา
          </Button>
        </Col>
      </Row>
    </form>
  )
}

export default React.memo<Props>(FormSearchPetition)
