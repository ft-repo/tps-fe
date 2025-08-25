import { FC, memo, useMemo } from 'react'
import { EstimateResult, RouteEstimation } from '../components'
import { usePublicRouteContext } from '../context'

const RouteEstimationScreen: FC = () => {
  const { step } = usePublicRouteContext()

  const renderFormStep = useMemo(() => {
    switch (step) {
      case 1:
        return <RouteEstimation />
      case 2:
        return <EstimateResult />
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

export default memo<Props>(RouteEstimationScreen)
