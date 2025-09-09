/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Button, Spin } from 'antd';
import { ContentSection } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionExtendedDetail, getPetitionExtendedStatus } from '@/store/slices/staff';

interface Props {

}

const DocumentScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const defaultLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getPetitionExtendedDetail(String(petitionId)))
    dispatch(getPetitionExtendedStatus({ petition_exid: String(petitionId) }))
  }, [dispatch, petitionId])

  return (
    <Spin spinning={loading || defaultLoading}>
      <section>
        <Button
          type='text'
          icon={<AiOutlineLeft />}
          onClick={() => navigate('/request-history/overview?tabKey=2')}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section className='mt-5'>
        <ContentSection />
      </section>
    </Spin>
  )
}

export default React.memo<Props>(DocumentScreen)
