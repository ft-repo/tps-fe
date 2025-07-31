/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

interface Props {

}

const ColumbinaText: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h1>Columbina</h1>
      <p>{`Columbina, also known as the Moon Maiden and by her codename "Damselette," is the Third of the Eleven Fatui Harbingers.`}</p>
    </div>
  )
}

export default React.memo<Props>(ColumbinaText)
