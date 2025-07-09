import React from 'react'
import RouteEstimationScreen from '@/features/admin/route-estimation/screen'
import { RouteProvider } from '@/features/admin/route-estimation/context'

interface Props { }

const RouteEstimationIndex: React.FC<Props> = (props) => {
  const { } = props;
  return (
    <RouteProvider>
      <RouteEstimationScreen />
    </RouteProvider>
  )
}

export default React.memo<Props>(RouteEstimationIndex)
