/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Card } from 'antd'
import { VehicleDetail } from '../components'

interface Props {
}

const ContentDetail: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')

  const items = [
    {
      key: '1',
      tab: 'รถคู่ที่ 1',
    },
    {
      key: '2',
      tab: 'รถคู่ที่ 2',
    },
  ];

  // const items: TabsProps['items'] = [
  //   {
  //     key: '1',
  //     label: 'รถคู่ที่ 1',
  //     children: <VehicleDetail />,
  //   },
  //   {
  //     key: '2',
  //     label: 'รถคู่ที่ 2',
  //     children: <VehicleDetail />,
  //   },
  // ];

  const contentList: Record<string, React.ReactNode> = {
    '1': <VehicleDetail />,
    '2': <VehicleDetail />,
  };

  return (
    <>
      <Card
        tabList={items}
        activeTabKey={tabKey}
        onTabChange={(tabKey) => setTabKey(tabKey)}
      >
        {contentList[tabKey]}
      </Card>
      {/* <Tabs
        defaultActiveKey={tabKey}
        items={items}
        onChange={(tabKey) => setTabKey(tabKey)}
      /> */}
    </>
  )
}

export default React.memo<Props>(ContentDetail)
