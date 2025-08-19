/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Button, Spin } from 'antd';
import { TitleSection, ContentSection } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface Props {

}

const RouteScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const loading = useAppSelector(state => state.layout.loading)

  return (
    <Spin spinning={loading}>
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
        <TitleSection />
        <ContentSection />
      </section>
    </Spin>
  )
}

export default React.memo<Props>(RouteScreen)
