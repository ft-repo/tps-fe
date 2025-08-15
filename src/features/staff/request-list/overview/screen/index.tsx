/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { ContentPetition, ContentPetitionExtended } from '../components'

interface Props {

}

const RequestListScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'รถหมวด 2 (4 - 7 เพลา)',
      children: <ContentPetition />,
    },
    {
      key: '2',
      label: 'นอกเหนือ (4 - 7 เพลา)',
      children: <ContentPetitionExtended />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(RequestListScreen)
