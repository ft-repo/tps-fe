/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import RouteEstimationScreen from '@/features/entrepreneur/route-estimation/route/screen'
import { RouteProvider } from '@/features/entrepreneur/route-estimation/route/context'

interface Props { }

const RouteIndex: React.FC<Props> = (props) => {
  const { } = props;
  
  return (
    <RouteProvider>
      <RouteEstimationScreen />
    </RouteProvider>
  )
}

export default React.memo<Props>(RouteIndex)
