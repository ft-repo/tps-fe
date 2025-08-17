/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React, { useState } from 'react'
import { Tabs, TabsProps } from 'antd';
import { ContentRoute } from '../components';

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'รถคู่ที่ 1',
      children: <ContentRoute />,
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

export default React.memo<Props>(ContentSection)
