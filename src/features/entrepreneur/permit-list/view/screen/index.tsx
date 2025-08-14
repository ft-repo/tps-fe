/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import PDFContent from '../components/PDFContent'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { AiOutlineLeft } from "react-icons/ai";

interface Props {

}

const ViewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()

  return (
    <>
      <section>
        <Button
          type='text'
          icon={<AiOutlineLeft />}
          onClick={() => navigate(-1)}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section className='mt-5'>
        <PDFContent />
      </section>
    </>
  )
}

export default React.memo<Props>(ViewScreen)
