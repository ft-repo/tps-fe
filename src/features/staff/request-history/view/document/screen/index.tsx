/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { ContentSection, TitleSection } from '../components';
// import { AiOutlineLeft } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionExtendedDetail, getPetitionExtendedStatus } from '@/store/slices/staff';

interface Props {

}

const DocumentScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const defaultLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getPetitionExtendedDetail(String(petitionId)))
  }, [dispatch, petitionId])

  useEffect(() => {
    dispatch(getPetitionExtendedStatus({
      petition_exid: String(petitionId)
    }))
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

export default React.memo<Props>(DocumentScreen)
