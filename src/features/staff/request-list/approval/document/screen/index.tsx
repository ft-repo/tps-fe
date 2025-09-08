/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ContentDetail, ContentForm, ContentPreviewPDF } from '../components'
import { Button, Col, Row, Spin } from 'antd'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionDocument, getPetitionStatus } from '@/store/slices/staff'

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
		dispatch(getPetitionDocument({ petition_id: String(petitionId) }))
		dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
	}, [dispatch, petitionId])

	return (
		<Spin spinning={loading || defaultLoading}>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
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
						<h3>ตรวจสอบเอกสาร</h3>
					</section>
					<section className='mt-5'>
						{!loading ?
							<ContentDetail />
							: null}
					</section>
					<section className='mt-5'>
						{!loading ?
							<ContentForm />
							: null
						}
					</section>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
					{!loading ?
						<ContentPreviewPDF />
						: null}
				</Col>
			</Row>
		</Spin>
	)
}

export default React.memo<Props>(DocumentScreen)
