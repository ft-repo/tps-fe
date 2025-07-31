/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ColumbinaImage from '../components/ColumbinaImage'
import ColumbinaText from '../components/ColumbinaText'

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <ColumbinaImage />
      <ColumbinaText />
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
