/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { EvaluateDocument, EvaluateRoute, EvaluateVehicle, EvaluatePermission } from '../components'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <>
      <section>
        <EvaluateDocument />
      </section>
      <section className='mt-5'>
        <EvaluateRoute />
      </section>
      <section className='mt-5'>
        <EvaluateVehicle />
      </section>
      <section className='mt-5'>
        <EvaluatePermission />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentSection)
