/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { PetitionResult, EvaluationHistory, PermitExtendedDocument } from '../components'

interface Props {

}

const ContentSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <>
      <section>
        <PetitionResult />
      </section>
      <section className='mt-5'>
        <EvaluationHistory />
      </section>
      <section className='mt-5'>
        <PermitExtendedDocument />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentSection)
