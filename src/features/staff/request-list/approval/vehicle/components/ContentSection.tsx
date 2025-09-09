/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { ContentDetail, ContentImage, ContentForm } from '../components'
import { Col, Row } from 'antd'
import { VehicleList } from '@/@types/reducer/petition';
import { useAppSelector } from '@/store';

interface Props {
  index: number;
  item: VehicleList;
}

const ContentSection: React.FC<Props> = (props) => {
  const { index, item } = props
  const { loading } = useAppSelector(state => state.staff.petition)

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
        <section>
          <ContentDetail
            index={index}
            item={item}
          />
        </section>
        <section className='mt-5'>
          {!loading ?
            <ContentForm />
            : null}
        </section>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={14}>
        <ContentImage
          index={index}
          item={item}
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ContentSection)
