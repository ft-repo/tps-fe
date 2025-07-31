/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Input from '@/components/ui/Input'

interface Props {

}
const ColumbinaText: React.FC<Props> = (props) => {
  const { } = props
  return (
    <>
    <div className='grid grid-cols-2'>
    <div className='bg-red-400 rounded-lg shadow-x1 min-h-20'/> 
    </div>
    </>

  )
}

      export default React.memo<Props>(ColumbinaText)