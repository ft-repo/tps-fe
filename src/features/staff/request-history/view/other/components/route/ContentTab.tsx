/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Tabs, type TabsProps } from 'antd'
import { RouteContent } from '../../components'
import { useAppSelector } from '@/store'

interface Props {

}

const ContentTab: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  const { petition } = useAppSelector(state => state.staff.petition)
  const route = petition.detail.estimate.route

  const items: TabsProps['items'] = route.estimate?.map((item, index) => {
    return {
      key: String(index + 1),
      label: `รถคู่ที่ ${index + 1}`,
      children: <RouteContent index={index} item={item} />
    }
  })

  return (
    <Tabs
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(ContentTab)
