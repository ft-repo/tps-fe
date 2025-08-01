/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { ContentSearchCategory, ContentSearchOther } from '../components'

const { TabNav, TabList, TabContent } = Tabs


interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('tab1')

  return (
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
        <TabContent value="tab1">
          <ContentSearchCategory />
        </TabContent>
        <TabContent value="tab2">
          <ContentSearchOther />
        </TabContent>
      </div>
    </Tabs>
  )
}

export default React.memo<Props>(OverviewScreen)
