import { FieldType } from '@/@types/entrepreneur/permit-list'
import { Button, Input } from '@/components/ui'
import React, { useCallback } from 'react'
import { useForm, Controller } from "react-hook-form"
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface Props {

}

const FormSearchCategory: React.FC<Props> = (props) => {
  const { } = props


  const form = useForm<FieldType>({
    defaultValues: {
      permit_list: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((data: FieldType) => {
    console.log(data)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center gap-3 xl:w-1/3'>
        <Controller
          name='permit_list'
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
        <Button type='submit' variant='solid'>ค้นหา</Button>
        <Button
                  variant='solid'
                  //size='sm'
                  icon={<PlusIcon />}
                  onClick={() => navigate('/vehicle-list/create')}
                >
                  เพิ่มชื่อผู้ใช้งาน
                </Button>
        <></>
      </div>
    </form>
  )
}

export default React.memo<Props>(FormSearchCategory)
