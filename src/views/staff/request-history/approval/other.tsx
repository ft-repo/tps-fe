/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

interface Props {

}

const OtherIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>index</div>
  )
}

export default React.memo<Props>(OtherIndex)
