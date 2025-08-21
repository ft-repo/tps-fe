/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React from 'react'
import { ContentTab } from '../components'

interface Props {

}

const EvaluationRoute: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h3>ตรวจสอบเส้นทาง</h3>
      <section>
        <ContentTab />
      </section>
    </div>
  )
}

export default React.memo<Props>(EvaluationRoute)
