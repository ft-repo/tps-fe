/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Button } from 'antd';
import { ContentForm } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface Props {

}

const PermitScreen: React.FC<Props> = (props) => {
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
      <section>
        <h3>บันทึกผลการพิจารณา</h3>
      </section>
      <section className='mt-5'>
        <ContentForm />
      </section>
    </>
  )
}

export default React.memo<Props>(PermitScreen)
