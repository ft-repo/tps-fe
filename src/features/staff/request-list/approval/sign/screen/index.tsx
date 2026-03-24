/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, message, Row, Spin } from 'antd';
import { ContentForm, ContentPreviewPDF, FormDownloadTemplate } from '../components'
import { AiOutlineLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getPetitionDocument, getPetitionEstimateRoute, getPetitionStatus, getPetitionVehicle } from '@/store/slices/staff';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';

interface Props {

}

const SignScreen: React.FC<Props> = (props) => {
	const { } = props
	// const [params] = useSearchParams()
	// const petitionId = params.get('petition_id')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { petition_status, loading } = useAppSelector(state => state.staff.petition)
	const [step, setStep] = useState<number>(1)
	// STATE
	const [url, setUrl] = useState<string>('')
	// LOCATION
	const { state } = useLocation()
	const isNotApproved = state?.is_approved !== 'null' ? true : false

	useEffect(() => {
		dispatch(getPetitionDocument({ petition_id: String(state?.petition_id) }))
	}, [dispatch, state?.petition_id])

	useEffect(() => {
		dispatch(getPetitionEstimateRoute({ petition_id: String(state?.petition_id) }))
	}, [dispatch, state?.petition_id])

	useEffect(() => {
		dispatch(getPetitionVehicle({ petition_id: String(state?.petition_id) }))
	}, [dispatch, state?.petition_id])

	useEffect(() => {
		dispatch(getPetitionStatus({ petition_id: String(state?.petition_id) }))
	}, [dispatch, state?.petition_id])

	const extractUrl = useCallback((url: string) => {
		const path = url.split('/upload')[1];
		return path
	}, []);

	const fetchImage = useCallback(async (imgUrl: string) => {
		dispatch(setLoading(true))
		try {
			const response = await getUploadAPI(imgUrl)
			if (response.status === 200) {
				const blobFile = new Blob([response.data], { type: response.data.type })
				const url = URL.createObjectURL(blobFile)
				setUrl(url)
			}
		} catch (error) {
			if (error instanceof Error) {
				message.error(error.message)
			} else {
				console.error(error)
			}
		} finally {
			dispatch(setLoading(false))
		}
	}, [dispatch])

	useEffect(() => {
		if (petition_status[3]?.document_url) {
			if (extractUrl(petition_status[3]?.document_url)) {
				fetchImage(extractUrl(petition_status[3]?.document_url))
			}
		}
	}, [fetchImage, extractUrl, petition_status])

	useEffect(() => {
		if (isNotApproved) {
			setStep(2)
		} else {
			setStep(1)
		}
	}, [isNotApproved])

	const renderFormComponent = useMemo(() => {
		switch (step) {
			case 1:
				return <FormDownloadTemplate setStep={setStep} />
			case 2:
				return (
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
							<section>
								{!loading ?
									<ContentForm
										setUrl={setUrl}
									/>
									: null}
							</section>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
							{!loading ?
								<ContentPreviewPDF
									url={url}
								/>
								: null}
						</Col>
					</Row>
				)
			default:
				return <FormDownloadTemplate setStep={setStep} />
		}

	}, [loading, step, url])

	return (
		<Spin spinning={loading}>
			<section>
				<Button
					type='text'
					icon={<AiOutlineLeft />}
					onClick={() => {
						if (step === 1) {
							navigate('/request-list/overview')
						} else {
							if (isNotApproved) {
								navigate('/request-list/overview')
							} else {
								setStep((prev: number) => prev - 1)
							}
						}
					}}
				>
					ย้อนกลับ
				</Button>
			</section>
			<section>
				<h3>นำเข้าหนังสืออนุญาต</h3>
			</section>
			<section className='mt-5'>
				{renderFormComponent}
			</section>
		</Spin>
	)
}

export default React.memo<Props>(SignScreen)
