import React, { useMemo, useState } from 'react'
import { useRouteEstimationContext } from '../../context'
import { Tabs } from '@/components/ui'
import { DetailResult, TableResult } from '../../components'

const { TabNav, TabList, TabContent } = Tabs

interface Props {

}

const EstimateResult: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser } = useRouteEstimationContext()
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
          <hr className='my-5'/>
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
      <h3>รายการประเมินเส้นทาง</h3>
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
