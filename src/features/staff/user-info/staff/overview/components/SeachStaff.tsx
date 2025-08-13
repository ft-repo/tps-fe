/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Button, Input } from '@/components/ui'
import { Control, Controller, useForm } from 'react-hook-form'
import { SearchUserName } from '@/@types/staff/user-info'

interface Props {
  control: Control<SearchUserName>
}

const SeachStaff: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div className="flex items-center gap-3 xl:w-1/3">
      <Controller
        name="username"
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
      <Button type="submit" variant="solid">
        ค้นหา
      </Button>
    </div>
  )
}

export default React.memo<Props>(SeachStaff)
