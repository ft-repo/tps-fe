/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store';
import { Badge, Button, Col, Input, Row } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  poaName: string | null | undefined;
  handleSearch: (value: FieldType) => void;
}

interface FieldType {
  search: string;
  status_id: string;
}


let timeout: any;

const FormSearchPetitionExtended: React.FC<Props> = (props) => {
  const { poaName, handleSearch } = props
  const { petition_extended_count } = useAppSelector(state => state.staff.petition)
  const submitRef = useRef<HTMLButtonElement>(null)
  const setPoaNameRef = useRef<string | null | undefined>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      search: '',
      status_id: ''
    }
  })

  const { handleSubmit, control, setValue, watch } = form

  const selectedStatusId = watch('status_id')

  // Only set poaName once per unique poaName value
  useEffect(() => {
    if (poaName && poaName !== setPoaNameRef.current) {
      setValue('search', poaName)
      setPoaNameRef.current = poaName
    }
  }, [poaName, setValue])

  useEffect(() => {
    if (watch('search') === poaName) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        submitRef.current?.click()
      }, 700)
    }
  }, [poaName, watch])

  const onSubmit = useCallback((value: FieldType) => {
    handleSearch(value)
  }, [handleSearch])

  const renderButton = useMemo(() => {
    if (!petition_extended_count.length) return

    // const filterArr = petition_count.filter(item => item.status_id !== 1).filter(item => item.status_id !== 2).filter(item => item.status_id !== 3).filter(item => item.status_id !== 7).filter(item => item.status_id !== 8)

    return petition_extended_count.map((item, index) => {
      const isActive = selectedStatusId === String(item.status_id)

      return (
        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={4} xxl={3}>
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
              // type={isActive ? 'primary' : 'default'}
              type='primary'
              size='large'
              style={isActive ? { backgroundColor: '#0958d9', borderColor: '#0958d9' } : { backgroundColor: '#4096ff', borderColor: '#4096ff' }}
              onClick={() => setValue('status_id', String(item.status_id))}
            >
              {item.status_name}
            </Button>
          </Badge>
        </Col>
      )
    })
  }, [petition_extended_count, setValue, selectedStatusId])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
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
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={3}>
          <Button
            block
            htmlType='submit'
            // type={selectedStatusId === '' ? 'primary' : 'default'}
            type='primary'
            size='large'
            style={selectedStatusId === '' ? { backgroundColor: '#0958d9', borderColor: '#0958d9' } : { backgroundColor: '#4096ff', borderColor: '#4096ff' }}
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

export default React.memo<Props>(FormSearchPetitionExtended)
