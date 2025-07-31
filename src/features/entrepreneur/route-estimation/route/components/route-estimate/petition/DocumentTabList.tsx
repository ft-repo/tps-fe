/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Tabs from '@/components/ui/Tabs'
import FormPermitDocument from './FormPermitDocument'

const { TabNav, TabList, TabContent } = Tabs

interface Props {

}

const DocumentTabList: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Tabs defaultValue="tab1" variant="pill">
      <TabList>
        <TabNav value="tab1">รถคู่ที่ 1</TabNav>
      </TabList>
      <section className='mt-3'>
      <TabContent value="tab1">
        <FormPermitDocument />
      </TabContent>
      </section>
    </Tabs>
  )
}

export default React.memo<Props>(DocumentTabList)
