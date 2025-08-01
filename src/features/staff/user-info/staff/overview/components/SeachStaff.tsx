/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Button, Input } from '@/components/ui'
import { Controller, useForm } from 'react-hook-form';
import { SearchUserName } from '@/@types/staff/user-info';


interface Props { }

const SeachStaff: React.FC<Props> = (props) => {
  const { } = props;

  const form = useForm<SearchUserName>({
    defaultValues: {
      username: ''
    }
  })

  const { control, handleSubmit } = form

  const onSubmit = useCallback((value: SearchUserName) => {
    console.log(value)
  }, [])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center gap-3 xl:w-1/3'>
        <Controller
          name='username'
          control={control}
          render={({ field }) => {
            return (
              <Input
                {...field}
                name={field.name}
                placeholder="ค้นหาชื่อผู้ใช้งาน"
              />
            )
          }}
        />
        <Button
          type='submit'
          variant='solid'
        >
          ค้นหา
        </Button>
      </div>
    </form>
  )
}

export default React.memo<Props>(SeachStaff)