/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Button, Spin } from 'antd';
import { TitleSection, ContentSection } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionEstimateRoute, getPetitionStatus } from '@/store/slices/staff';

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
