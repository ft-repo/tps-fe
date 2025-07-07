import React from 'react'
import RouteEstimationScreen from '@/features/admin/route-estimation/screen'
import { RouteEstimatationProvider } from '@/features/admin/route-estimation/context'

interface Props { }

const RouteEstimationIndex: React.FC<Props> = (props) => {
  const { } = props;
  return (
    <RouteEstimatationProvider>
      <RouteEstimationScreen />
    </RouteEstimatationProvider>
  )
}

export default React.memo<Props>(RouteEstimationIndex)
