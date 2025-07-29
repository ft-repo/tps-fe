/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { ContentSearchCategory, ContentSearchOther } from '../components'

const { TabNav, TabList, TabContent } = Tabs

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('tab1')

  return (
    <ContentSearchCategory/>
    
  )
}

export default React.memo<Props>(OverviewScreen)
