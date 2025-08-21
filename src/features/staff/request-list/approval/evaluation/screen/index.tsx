/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { TitleSection, ContentSection } from '../components'
import { Button, Spin } from 'antd'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionExtendedDetail } from '@/store/slices/staff'

interface Props {

}

const EvaluationScreen: React.FC<Props> = (props) => {
	const { } = props
	const [params] = useSearchParams()
	const petitionId = params.get('petition_id')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const defaultLoading = useAppSelector(state => state.layout.loading)
	const { loading } = useAppSelector(state => state.staff.petition)

	useEffect(() => {
		dispatch(getPetitionExtendedDetail(String(petitionId)))
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
			</section>
			<section className='mt-5'>
				<ContentSection />
			</section>
		</Spin>
	)
}

export default React.memo<Props>(EvaluationScreen)
