/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React from 'react'
import { ContentVehicleTab } from '../components'

interface Props {

}

const EvaluationVehicle: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h3>ตรวจสอบยานพาหนะ</h3>
      <section>
        <ContentVehicleTab />
      </section>
    </div>
  )
}

export default React.memo<Props>(EvaluationVehicle)
