/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { ContentSection, TitleSection } from '../components';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionDocument, getPetitionEstimateRoute, getPetitionStatus, getPetitionVehicle } from '@/store/slices/staff';
import PermitForm from '../components/pdf/PermitForm';

interface Props {

}

const OtherScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const dispatch = useAppDispatch()
  const defaultLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getPetitionDocument({ petition_id: String(petitionId) }))
    dispatch(getPetitionEstimateRoute({ petition_id: String(petitionId) }))
    dispatch(getPetitionVehicle({ petition_id: String(petitionId) }))
    dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
  }, [dispatch, petitionId])

  return (
    <Spin spinning={loading || defaultLoading}>
      <section>
        <TitleSection />
      </section>
      <section className='mt-5'>
        <ContentSection />
      </section>
    </Spin>
  )
}

export default React.memo<Props>(OtherScreen)
