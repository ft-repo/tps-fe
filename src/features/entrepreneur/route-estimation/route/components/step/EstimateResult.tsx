/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useState } from 'react'
import { useRouteContext } from '../../context'
import { Button, Tabs } from '@/components/ui'
import { DetailResult, TableResult } from '..'

const { TabNav, TabList, TabContent } = Tabs

interface Props {

}

const EstimateResult: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser, setStep } = useRouteContext()
  const [tabKey, setTabKey] = useState<string>('tab0')

  const renderTabList = useMemo(() => {
    if (!dataParser.form_template.length) return

    const tabArr = dataParser.form_template.map((item, index) => {
      return (
        <TabNav key={index} value={`tab` + index}>
          รถคู่ที่ {index + 1}
        </TabNav>
      )
    })
    return tabArr
  }, [dataParser])

  const renderTabContent = useMemo(() => {
    if (!dataParser.form_template.length) return

    const contentArr = dataParser.form_template.map((item, index) => {
      return (
        <TabContent key={index} value={`tab` + index}>
          <section>
            <DetailResult
              data={item}
            />
          </section>
          <hr className='my-5' />
          <section>
            <TableResult
              data={item}
            />
          </section>
        </TabContent>
      )
    })

    return contentArr
  }, [dataParser])


  return (
    <div>
      <section className='flex items-center justify-between gap-3 flex-wrap'>
        <h3>รายการประเมินเส้นทาง</h3>
        <div className='flex items-center flex-wrap gap-3'>
          <Button
            variant='default'
            size='sm'
            onClick={() => setStep((prev: number) => prev - 1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            type='button'
            variant='solid'
            size='sm'
            className='bg-yellow-500 hover:bg-yellow-300 transition duration-300'
            onClick={() => setStep(3)}
          >
            ขออนุญาต
          </Button>
        </div>

      </section>
      <section className='mt-5'>
        <Tabs
          value={tabKey}
          variant='pill'
          onChange={(tabKey) => setTabKey(tabKey)}
        >
          <TabList>
            {renderTabList}
          </TabList>
          <div className="p-4">
            {renderTabContent}
          </div>
        </Tabs>
      </section>
    </div>
  )
}

export default React.memo<Props>(EstimateResult)
