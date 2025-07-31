
import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import ContentSearchCategoryAdmin from '../components/ContentSearchCategoryAdmin'
import ContentSearchOtherAdmin from '../components/ContentSearchOtherAdmin'


const { TabNav, TabList, TabContent } = Tabs

interface Props {
}

const RequestListScreen: React.FC<Props> = (props) => {
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
          <TabContent value="tab1">
            <ContentSearchCategoryAdmin />

          </TabContent>
          <TabContent value="tab2">
            <ContentSearchOtherAdmin />
          </TabContent>
        </div>
      </Tabs>
    </div>
  )
}

export default React.memo<Props>(RequestListScreen)