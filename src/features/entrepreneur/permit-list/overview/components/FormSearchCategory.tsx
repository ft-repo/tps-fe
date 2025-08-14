/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/permit-list'
import { Button } from '@/components/ui'
import { Input } from 'antd'
import React, { useCallback } from 'react'
import { useForm, Controller } from "react-hook-form"

interface Props {
  handleSearch: (value: FieldType) => void;
}

const FormSearchCategory: React.FC<Props> = (props) => {
  const { handleSearch } = props


  const form = useForm<FieldType>({
    defaultValues: {
      search: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((value: any) => {
    handleSearch(value.search)
  }, [handleSearch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center gap-3 xl:w-1/3'>
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
        <Button type='submit' variant='solid'>ค้นหา</Button>
      </div>
    </form>
  )
}

export default React.memo<Props>(FormSearchCategory)
