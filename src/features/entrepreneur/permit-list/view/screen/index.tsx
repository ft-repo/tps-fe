/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import PDFContent from '../components/PDFContent'
import { useNavigate } from 'react-router-dom'

interface Props {

}

const ViewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()

  return (
    <>
      <section>
        <p
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        >
          &lt; ย้อนกลับ
        </p>
      </section>
      <section className='mt-5'>
        <PDFContent />
      </section>
    </>
  )
}

export default React.memo<Props>(ViewScreen)
