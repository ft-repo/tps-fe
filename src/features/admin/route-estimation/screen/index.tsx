import React, { useMemo } from 'react'
import { EstimateResult, RouteEstimation, RequestPermit } from '../components'
import { useRouteContext } from '../context'

interface Props {

}

const RouteEstimationScreen: React.FC<Props> = (props) => {
  const { } = props
  const { step } = useRouteContext()

  const renderFormStep = useMemo(() => {
    switch (step) {
      case 1:
        return <RouteEstimation />
      case 2:
        return <EstimateResult />
      case 3:
        return <RequestPermit />
      default:
        return null
    }
  }, [step])

  return (
    <div>
      {renderFormStep}
    </div>
  )
}

export default React.memo<Props>(RouteEstimationScreen)
