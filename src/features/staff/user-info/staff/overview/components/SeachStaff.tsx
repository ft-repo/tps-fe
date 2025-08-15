/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Button } from '@/components/ui'
import { Controller, useForm } from 'react-hook-form'
import { Input } from 'antd'

interface Props {
  handleSearch: (value: string) => void;
}

interface FieldType {
  search: string;
}

const SeachStaff: React.FC<Props> = (props) => {
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
      <div className="flex items-center gap-3 xl:w-1/3">
        <Controller
          name="search"
          control={control}
          render={({ field }) => {
            return (
              <Input
                {...field}
                name={field.name}
                placeholder="ค้นหาชื่อผู้ใช้งาน"
                className='w-full'
                size='large'
                style={{
                  fontFamily: 'Noto Sans Thai'
                }}
              />
            )
          }}
        />
        <Button type="submit" variant="solid">
          ค้นหา
        </Button>
      </div>
    </form>
  )
}

export default React.memo<Props>(SeachStaff)
