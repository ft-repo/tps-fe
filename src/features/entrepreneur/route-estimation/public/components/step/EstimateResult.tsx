import React, { useMemo, useState } from 'react'
import { usePublicRouteContext } from '../../context'
import { Button, Tabs } from '@/components/ui'
import { DetailResult, TableResult } from '..'

const { TabNav, TabList, TabContent } = Tabs

const EstimateResult: React.FC = () => {
  const { dataParser, setStep } = usePublicRouteContext()
  const [tabKey, setTabKey] = useState<string>('tab0')

  const renderTabList = useMemo(() => {
    if (!dataParser.vehicle.length) return

    const tabArr = dataParser.vehicle.map((item, index) => {
      return (
        <TabNav key={index} value={`tab` + index}>
          รถคู่ที่ {index + 1}
        </TabNav>
      )
    })
    return tabArr
  }, [dataParser])

  const renderTabContent = useMemo(() => {
    if (!dataParser.vehicle.length) return

    const contentArr = dataParser.vehicle.map((item, index) => {
      return (
        <TabContent key={index} value={`tab` + index}>
          <section>
            <DetailResult
              data={item}
              start_point={dataParser.start_point}
              end_point={dataParser.end_point}
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

export default React.memo(EstimateResult)
