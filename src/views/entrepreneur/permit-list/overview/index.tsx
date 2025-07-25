/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import PermitListScreen from '@/features/entrepreneur/permit-list/overview/screen'
import { PermitProvider } from '@/features/entrepreneur/permit-list/overview/context'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <PermitProvider>
      <PermitListScreen />
    </PermitProvider>
  )
}

export default React.memo<Props>(OverviewIndex)
