/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { OtherInfo, OtherDocument } from '../components'
import { useOtherContext } from '../context'

interface Props {

}

const OtherScreen: React.FC<Props> = (props) => {
  const { } = props
  const { step } = useOtherContext()

  const renderFormStep = useMemo(() => {
    switch (step) {
      case 1:
        return <OtherInfo />
      case 2:
        return <OtherDocument />
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

export default React.memo<Props>(OtherScreen)
