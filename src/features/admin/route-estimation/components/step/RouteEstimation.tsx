import React, { useCallback, useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { TemplateForm } from '../../components'
import { useForm, useFieldArray } from "react-hook-form";
import { HiX } from 'react-icons/hi';
import { Button, Notification, toast } from '@/components/ui';
import { useRouteEstimationContext } from '../../context';
import { FormValue } from '@/@types/admin/route-estimation';
import { initFormValue } from '../mock';

const { TabNav, TabList, TabContent } = Tabs

interface Props { }

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props;
  const [tabKey, setTabKey] = useState<string>('tab0')
  const { setStep, setDataParser } = useRouteEstimationContext()
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      form_template: [initFormValue]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "form_template"
  });

  const onSubmit = useCallback((data: FormValue) => {
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
        <TabList>
          {fields.map((item, index) => {
            return (
              <TabNav key={index} value={`tab` + index}>
                รถคู่ที่ {index + 1}
                {index != 0 ?
                  <HiX className="ml-1 rtl:mr-1 cursor-pointer" onClick={() => remove(index)} />
                  : null}
              </TabNav>
            )
          })}
          {fields.length < 4 ?
            <TabNav value={tabKey}>
              <button
                type='button'
                onClick={() => append(initFormValue)}
              >
                เพิ่มรถคู่
              </button>
            </TabNav>
            : null}
        </TabList>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, index) => {
              return (
                <TabContent key={item.id} value={`tab${index}`} >
                  <TemplateForm
                    formItem={item}
                    formIndex={index}
                    control={control}
                  />
                </TabContent>
              )
            })}
            <section className='mt-5'>
              <div className='flex items-center gap-5'>
                <Button type='button'>ล้างข้อมูล</Button>
                <Button type='submit' variant='solid'>ประเมินเส้นทาง</Button>
              </div>
            </section>
          </form>
        </div>
      </Tabs >
    </>
  )
}

export default React.memo<Props>(RouteEstimation)
