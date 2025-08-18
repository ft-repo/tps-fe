/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Button } from 'antd';
import { ContentSection } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface Props {

}

const DocumentScreen: React.FC<Props> = (props) => {
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
        <ContentSection />
      </section>
    </>
  )
}

export default React.memo<Props>(DocumentScreen)
