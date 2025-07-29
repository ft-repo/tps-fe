import React from 'react'
import RequestListScreen from '@/features/staff/request-list/screen/index'
import { PermitProvider } from '@/features/entrepreneur/permit-list/overview/context'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
   
      <RequestListScreen />
    
  )
}

export default React.memo<Props>(OverviewIndex)
