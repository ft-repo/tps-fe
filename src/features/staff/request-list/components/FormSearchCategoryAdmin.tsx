import { FieldType } from '@/@types/entrepreneur/permit-list'
import { Button, Input } from '@/components/ui'
import React, { useCallback } from 'react'
import { useForm, Controller } from "react-hook-form"
import StatusSummary, { StatusItem } from './StatusSumary' // adjust path if needed

interface Props { }

const FormSearchCategoryAdmin: React.FC<Props> = (props) => {
  const form = useForm<FieldType>({
    defaultValues: {
      permit_list: ''
    }
  })

  const { handleSubmit, control } = form

  const onSubmit = useCallback((data: FieldType) => {
    console.log(data)
  }, [])

  const summaryItems: StatusItem[] = [
    { label: 'ตรวจเอกสาร', count: 8 },
    { label: 'ตรวจเส้นทาง', count: 10 },
    { label: 'ตรวจยานพาหนะ', count: 10 },
    { label: 'รอลงนาม', count: 17 },
    { label: 'ออกใบอนุญาต', count: 5 },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className='flex flex-wrap gap-3 text-2xl font-bold text-black'>
          รายการขออนุญาตรถหมวด 2 (4 - 7 เพลา)
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusSummary items={summaryItems} />
        </div>
        <div className="flex items-center gap-3 flex-nowrap">
          <Controller
            name="permit_list"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="พิมพ์เพื่อค้นหา..."
                className="min-w-[190px]"
              />
            )}
          />
          <Button type="submit" variant="solid" className="whitespace-nowrap">
            ค้นหา
          </Button>
        </div>

      </div>
    </form>

  )

}

export default React.memo(FormSearchCategoryAdmin)
