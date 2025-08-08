/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Select } from '@/components/ui';
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface FieldType {
  vehicle_type_id: number | string;
}

interface Props {
  searchData: (value: FieldType) => void;
}

const FormSearchVehicleList: React.FC<Props> = (props) => {
  const { searchData } = props
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type_id: 'ALL'
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: any) => {
    searchData(value.vehicle_type_id.value)
  }, [searchData])

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
                name={field.name}
                options={[
                  {
                    label: 'ทั้งหมด',
                    value: 'ALL'
                  },
                  {
                    label: 'รถลากจูง',
                    value: 1
                  },
                  {
                    label: 'รถกึ่งพ่วง',
                    value: 2
                  },
                  {
                    label: 'เครื่องจักร',
                    value: 3
                  },
                  {
                    label: 'สินค้า',
                    value: 4
                  },
                ] as any}
                placeholder='กรุณาเลือก'
                className='w-full lg:w-1/4'
                onChange={(e) => {
                  console.log(e)
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
