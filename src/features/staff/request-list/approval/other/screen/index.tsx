/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Button, Spin } from 'antd';
import { ContentForm } from '../components';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionExtendedStatus } from '@/store/slices/staff';

interface Props {

}

const PermitScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getPetitionExtendedStatus({ petition_exid: String(petitionId) }))
  }, [dispatch, petitionId])

  return (
    <Spin spinning={loading}>
      <section>
        <Button
          type='text'
          icon={<AiOutlineLeft />}
					onClick={() => navigate('/request-list/overview?tabKey=2')}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section>
        <h3>บันทึกผลการพิจารณา</h3>
      </section>
      <section className='mt-5'>
        {!loading ?
          <ContentForm />
          : null}
      </section>
    </Spin>
  )
}

export default React.memo<Props>(PermitScreen)
