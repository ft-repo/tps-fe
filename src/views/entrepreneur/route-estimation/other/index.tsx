/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import OtherScreen from '@/features/entrepreneur/route-estimation/other/screen'
import { OtherProvider } from '@/features/entrepreneur/route-estimation/other/context'

interface Props {

}

const OtherIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <OtherProvider>
      <OtherScreen />
    </OtherProvider>
  )
}

export default React.memo<Props>(OtherIndex)
