/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { TemplateForm } from '..'
import { useForm, useFieldArray } from "react-hook-form";
// import { HiX } from 'react-icons/hi';
import { Button, Notification, toast } from '@/components/ui';
import { useRouteContext } from '../../context';
import { FieldType } from '@/@types/entrepreneur/route-estimation';
import { initFormValue } from '../mock';

const { TabNav, TabList, TabContent } = Tabs

interface Props { }

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props;
  const [tabKey, setTabKey] = useState<string>('tab0')
  const { setStep, setDataParser } = useRouteContext()
  const { control, handleSubmit } = useForm<FieldType>({
    defaultValues: {
      form_template: [initFormValue]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "form_template"
  });

  const onSubmit = useCallback((data: FieldType) => {
    toast.push(
      <Notification
        title={'Data submission successful'}
        type={'success'}
        onClose={() => {
          setStep(2)
          setDataParser(data)
        }}
      >
        <p className='break-all'>{JSON.stringify(data)}</p>
      </Notification>
    )
  }, [setDataParser, setStep])

  return (
    <>
      <Tabs
        defaultValue={tabKey}
        variant='pill'
        onChange={(tabKey) => setTabKey(tabKey)}
      >
        <div className='flex items-center justify-between flex-wrap gap-3'>
          <div className='flex items-center gap-1'>
            <TabList>
              {fields.map((item, index) => {
                return (
                  <TabNav key={index} value={`tab` + index}>
                    รถคู่ที่ {index + 1}
                  </TabNav>
                )
              })}
            </TabList>
            {fields.length < 4 ?
              <Button
                type='button'
                size='sm'
                variant='solid'
                onClick={() => append(initFormValue)}
              >
                เพิ่มรถคู่
              </Button>
              : null}
          </div>
          <Button
            variant='solid'
            className='bg-yellow-500 hover:bg-yellow-300 transition duration-300'
            size='sm'
          >
            ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)
          </Button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => {
              return (
                <>
                  <TabContent
                    key={item.id}
                    value={`tab` + index}
                  >
                    <TemplateForm
                      formItem={item}
                      formIndex={index}
                      control={control}
                    />
                    <section className='mt-5'>
                      <div className='flex items-center gap-5 '>
                        <Button
                          type='button'
                          disabled={index === 0 ? true : false}
                          onClick={() => remove(index)}
                        >
                          ลบข้อมูล
                        </Button>
                        <Button type='submit' variant='solid'>ประเมินเส้นทาง</Button>
                      </div>
                    </section>
                  </TabContent>
                </>
              )
            })}
          </form>
        </div>
      </Tabs >
    </>
  )
}

export default React.memo<Props>(RouteEstimation)
