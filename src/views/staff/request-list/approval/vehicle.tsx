import React from 'react'
import ApprovalVehiclePage from '@/features/staff/request-list/approval/vehicle/screen'

interface Props {

}

const ApprovalVehicleIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <ApprovalVehiclePage/>
  )
}

export default React.memo<Props>(ApprovalVehicleIndex)
