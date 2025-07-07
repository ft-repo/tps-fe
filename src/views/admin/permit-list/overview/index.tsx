import React from 'react'
import OverviewScreen from '@/features/admin/permit-list/overview/screen'

interface Props {

}

const OverviewIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <OverviewScreen />
    </div>
  )
}

export default React.memo<Props>(OverviewIndex)
