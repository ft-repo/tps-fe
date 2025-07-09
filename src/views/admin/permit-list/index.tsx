import React from 'react'
import PermitListScreen from '@/features/admin/permit-list/screen'
import { PermitProvider } from '@/features/admin/permit-list/context'

interface Props {

}

const PermitListIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <PermitProvider>
      <PermitListScreen />
    </PermitProvider>
  )
}

export default React.memo<Props>(PermitListIndex)
