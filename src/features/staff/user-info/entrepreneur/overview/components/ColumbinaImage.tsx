/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

interface Props {

}

const ColumbinaImage: React.FC<Props> = (props) => {
  const { } = props

  return (
    <figure className='w-56 h-56 overflow-hidden rounded-lg object-cover object-center'>
      <img
        src='https://pbs.twimg.com/media/GwdXxYjbMAAvGSt?format=jpg&name=4096x4096'
        alt='columbina'
        className='w-full h-full'
      />
    </figure>
  )
}

export default React.memo<Props>(ColumbinaImage)
