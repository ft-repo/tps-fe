/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <>
      <ExecutiveDataScreen/>
    </>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
