/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store';
import { Badge, Button, Col, Input, Row } from 'antd';
import React, { useCallback, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  handleSearch: (value: FieldType) => void;
}

export interface FieldType {
  search: string;
  status_id: string;
}

let timeout: any;

const FormSearchPetition: React.FC<Props> = (props) => {
  const { handleSearch } = props
  const { petition_count } = useAppSelector(state => state.staff.petition)
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      search: '',
      status_id: ''
    }
  })

  const { handleSubmit, control, setValue } = form

  const onSubmit = useCallback((value: FieldType) => {
    handleSearch(value)
  }, [handleSearch])

  const renderButton = useMemo(() => {
    if (!petition_count.length) return

    const filterArr = petition_count.filter(item => item.status_id !== 4).filter(item => item.status_id !== 7)

    return filterArr.map((item, index) => {
      return (
        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={4} xxl={2}>
          <Badge
            count={item.count}
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
              onClick={() => setValue('status_id', String(item.status_id))}
            >
              {item.status_name}
            </Button>
          </Badge>
        </Col>
      )
    })
  }, [petition_count, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
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
                  onChange={(e) => {
                    field.onChange(e)

                    if (timeout) clearTimeout(timeout)
                    timeout = setTimeout(() => {
                      submitRef.current?.click()
                    }, 700)
                  }}
                />
              )
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={2}>
          <Button
            block
            htmlType='submit'
            type='primary'
            size='large'
            onClick={() => setValue('status_id', '')}
          >
            ทั้งหมด
          </Button>
        </Col>
        {renderButton}
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

export default React.memo<Props>(FormSearchPetition)
