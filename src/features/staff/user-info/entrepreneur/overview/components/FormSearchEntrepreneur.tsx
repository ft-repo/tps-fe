/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form'
import { SearchUserName } from '@/@types/staff/user-info'

interface Props {
  control: Control<SearchUserName>
  loading: boolean
}

const FormSearch: React.FC<Props> = (props) => {
  const { control, loading } = props

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
              placeholder="พิมพ์เพื่อค้นหา..."
            />
          )
        }}
      />
      <Button type="submit" variant="solid" loading={loading}>
        ค้นหา
      </Button>
    </div>
  )
}

export default React.memo<Props>(FormSearch)
