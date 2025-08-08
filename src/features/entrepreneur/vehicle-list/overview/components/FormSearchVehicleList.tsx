/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Select } from '@/components/ui';
import React, { useCallback, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppSelector } from '@/store';

export interface FieldType {
  vehicle_type_id: number | string;
}

interface Props {
  searchData: (value: FieldType) => void;
}

const FormSearchVehicleList: React.FC<Props> = (props) => {
  const { searchData } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const { vehicle_type } = useAppSelector(state => state.master)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type_id: 'ALL'
    }
  })

  const { handleSubmit, control, setValue } = form

  const onSubmit = useCallback((value: any) => {
    searchData(value.vehicle_type_id.value)
  }, [searchData])

  const selectOptions = useMemo(() => {
    return vehicle_type.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }, [vehicle_type])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='vehicle_type_id'
        control={control}
        render={({ field }) => {
          return (
            <fieldset className='mb-5'>
              <Select
                isSearchable
                {...field}
                name={field.name}
                options={[{
                  label: 'ทั้งหมด',
                  value: 'ALL'
                },
                ...selectOptions
                ]}
                placeholder='กรุณาเลือก'
                className='w-full lg:w-1/4'
                onChange={(e: any) => {
                  setValue('vehicle_type_id', e.value)
                  field.onChange(e)
                  // SUBMIT
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
