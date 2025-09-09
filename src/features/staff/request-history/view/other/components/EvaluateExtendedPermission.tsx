/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React from 'react'
import { } from '.'
import { ResultExtendedPermitDetail } from '../../document/components'

interface Props {

}

const EvaluationExtendedPermission: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h3>เอกสารลงนามและใบอนุญาต</h3>
      <section className='mt-5'>
        <ResultExtendedPermitDetail />
      </section>
    </div>
  )
}

export default React.memo<Props>(EvaluationExtendedPermission)
