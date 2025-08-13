/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppSelector } from '@/store';
import { Select } from 'antd';

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
                className='w-full lg:w-1/4'
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
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

export default React.memo<Props>(FormSearchVehicleList)
