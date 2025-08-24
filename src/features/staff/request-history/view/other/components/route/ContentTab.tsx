/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import RouteContent from './RouteContent'

interface Props {

}

const ContentTab: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `รถคู่ที่ 1`,
      children: <RouteContent />
    }
  ]

  return (
    <Tabs
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(ContentTab)
