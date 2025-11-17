/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Card } from 'antd'
import { VehicleDetail } from '../components'
import { useAppSelector } from '@/store'

interface Props {
}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  const { detail } = useAppSelector(state => state.tracking)

  const items = detail.business_detail.estimate.map((item, index) => {
    return {
      key: String(index + 1),
      tab: `รถคู่ที่ ${index + 1}`
    }
  })

  // Dynamic contentList based on estimate array
  const contentList: Record<string, React.ReactNode> = detail.business_detail.estimate.reduce((acc, item, index) => {
    acc[String(index + 1)] = <VehicleDetail item={item} index={index} />
    return acc
  }, {} as Record<string, React.ReactNode>)

  return (
    <>
      <Card
        tabList={items}
        activeTabKey={tabKey}
        onTabChange={(tabKey) => setTabKey(tabKey)}
      >
        {contentList[tabKey]}
      </Card>
    </>
  )
}

export default React.memo<Props>(ContentDetail)
