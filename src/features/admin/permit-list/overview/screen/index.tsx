import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormSearchCategory, FormSearchOther, TableCategory, TableOther } from '../components'

const { TabNav, TabList, TabContent } = Tabs

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('tab1')

  return (
    <div>
      <Tabs
        defaultValue={tabKey}
        variant="pill"
        onChange={(tabKey) => setTabKey(tabKey)}
      >
        <TabList>
          <TabNav value='tab1'>รถหมวด 2 (4 - 7 เพลา)</TabNav>
          <TabNav value="tab2">นอกเหนือ (4 - 7 เพลา)</TabNav>
        </TabList>
        <div className="p-4">
          <section>
            <h3>รายการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>
          </section>
          <section className='mt-5'>
            <TabContent value="tab1">
              <section>
                <FormSearchCategory />
              </section>
              <section className='mt-5'>
                <TableCategory />
              </section>
            </TabContent>
            <TabContent value="tab2">
              <section>
                <FormSearchOther />
              </section>
              <section className='mt-5'>
                <TableOther />
              </section>
            </TabContent>
          </section>
        </div>
      </Tabs>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
