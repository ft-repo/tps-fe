import React from 'react'

interface Props {

}

const VehicleListIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>index</div>
  )
}

export default React.memo<Props>(VehicleListIndex)
