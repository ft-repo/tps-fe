/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Button, Col, Row, Spin } from 'antd';
import { TitleSection, ContentSection, ContentRouteList } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionEstimateRoute, getPetitionStatus } from '@/store/slices/staff';
import { useRouteContext } from '../context';
import MapRouteEstimation from '@/features/entrepreneur/route-estimation/route/components/route-estimate/initial/MapRouteEstimation';

interface Props {

}

const RouteScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const defaultLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.petition)
  const { index, item } = useRouteContext()

  useEffect(() => {
    dispatch(getPetitionEstimateRoute({ petition_id: String(petitionId) }))
    dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
  }, [dispatch, petitionId])

  return (
    <Spin spinning={loading || defaultLoading}>
      <section>
        <Button
          type='text'
          icon={<AiOutlineLeft />}
          onClick={() => navigate('/request-list/overview')}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section>
        <TitleSection />
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <ContentSection />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[75vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <MapRouteEstimation
                firstPoint={null}
                secondPoint={null}
              />
            </div>
          </Col>
        </Row>
      </section>
      <hr className='my-5' />
      <section>
        <h3>รายการประเมินเส้นทาง</h3>
        <section className='mt-3'>
          <ContentRouteList
            index={index}
            item={item}
          />
        </section>
      </section>
    </Spin>
  )
}

export default React.memo<Props>(RouteScreen)
