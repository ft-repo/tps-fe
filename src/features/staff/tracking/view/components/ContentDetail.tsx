/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Card } from 'antd'
import { VehicleDetail } from '../components'
import { useAppSelector } from '@/store'
import { useViewContext } from '../context'

interface Props {
}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  const { detail } = useAppSelector(state => state.tracking)
  const { sort, setSort } = useViewContext()

  const items = detail.business_detail.estimate.map((item) => {
    return {
      key: String(item.sort + 1),
      tab: `รถคู่ที่ ${item.sort + 1}`
    }
  })

  // Dynamic contentList based on estimate array
  const contentList: Record<string, React.ReactNode> = detail.business_detail.estimate.reduce((acc, item) => {
    acc[String(item.sort + 1)] = <VehicleDetail item={item} index={item.sort + 1} />
    return acc
  }, {} as Record<string, React.ReactNode>)

  return (
    <>
      <Card
        tabList={items}
        activeTabKey={String(sort) || tabKey}
        onTabChange={(tabKey) => {
          setTabKey(tabKey);
          setSort(Number(tabKey))
        }}
      >
        {contentList[String(sort) || tabKey]}
      </Card>
    </>
  )
}

export default React.memo<Props>(ContentDetail)
