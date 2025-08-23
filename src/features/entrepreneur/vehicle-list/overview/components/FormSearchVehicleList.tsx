/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppSelector } from '@/store';
import { Col, Row, Select } from 'antd';

export interface FieldType {
  vehicle_type_id: number | string | null;
}

interface Props {
  handleSearch: (value: FieldType) => void;
}

const FormSearchVehicleList: React.FC<Props> = (props) => {
  const { handleSearch } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const { vehicle_type } = useAppSelector(state => state.master)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type_id: null
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: any) => {
    handleSearch(value.vehicle_type_id)
  }, [handleSearch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={8}>
          <Controller
            name='vehicle_type_id'
            control={control}
            render={({ field }) => {
              return (
                <fieldset className='mb-5'>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='กรุณาเลือก'
                    options={vehicle_type}
                    fieldNames={{
                      label: 'name',
                      value: 'id'
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                    onChange={(e) => {
                      field.onChange(e)
                      submitRef.current?.click()
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

export default React.memo<Props>(FormSearchVehicleList)
