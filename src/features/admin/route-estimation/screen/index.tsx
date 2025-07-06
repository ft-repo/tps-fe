import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { TemplateForm } from '../components'

const { TabNav, TabList, TabContent } = Tabs

const RouteEstimationScreen = () => {
  const [tabKey, setTabKey] = useState<string>('tab1')

  return (
    <>
      <Tabs
        defaultValue={tabKey}
        variant='pill'
        onChange={(tabKey) => setTabKey(tabKey)}
      >
        <TabList>
          <TabNav value={tabKey}>รถคู่ที่ 1</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1" >
            <TemplateForm />
          </TabContent>
        </div>
      </Tabs>
    </>
  )
}

export default RouteEstimationScreen
