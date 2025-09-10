/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import {
  ContentSearchCategory as ContentPetition,
  ContentSearchOther as ContentPetitionExtended
} from '../components'
import { Tabs, TabsProps } from 'antd'
import { useSearchParams } from 'react-router-dom'

interface Props {
}

const PermitListScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  // RETURN TAB
  const [params] = useSearchParams()
  const returnTab = params.get('tabKey')

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
      defaultActiveKey={returnTab ? returnTab : tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(PermitListScreen)
