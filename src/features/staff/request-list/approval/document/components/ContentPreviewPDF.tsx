/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import { PDFViewer } from '@/features/entrepreneur/permit-list/overview/components';
import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react'

interface Props {

}

const ContentPreviewPDF: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'หนังสือมอบอำนาจ',
      children: <PDFViewer />,
    },
    {
      key: '2',
      label: 'หนังสือวิศวะเครื่องกล',
      children: <PDFViewer />,
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

export default React.memo<Props>(ContentPreviewPDF)
