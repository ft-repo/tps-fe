/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { PDFViewer } from '../../overview/components'

interface Props {

}

const PDFContent: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <PDFViewer />
    </div>
  )
}

export default React.memo<Props>(PDFContent)
