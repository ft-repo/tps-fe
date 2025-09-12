// EvaluationScreen.tsx
import React, { useEffect, useRef } from 'react'
import { TitleSection, ContentSection } from '../components'
import { Button, Spin } from 'antd'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionExtendedDetail } from '@/store/slices/staff'
import { useReactToPrint } from 'react-to-print'

const EvaluationScreen: React.FC = () => {
	const [params] = useSearchParams()
	const petitionId = params.get('petition_id')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const defaultLoading = useAppSelector(state => state.layout.loading)
	const { loading } = useAppSelector(state => state.staff.petition)

	useEffect(() => {
		dispatch(getPetitionExtendedDetail(String(petitionId)))
	}, [dispatch, petitionId])

	// ⬇️ องค์ประกอบที่จะ print/export
	const printRef = useRef<HTMLDivElement | null>(null)

	// ⬇️ เวอร์ชันใหม่: ใช้ contentRef แทน content
	const handleExport = useReactToPrint({
		contentRef: printRef,
		documentTitle: `evaluation-${petitionId}`,
		pageStyle: `
@page { size: A4 portrait; margin: 12mm; }
* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
.ant-table-wrapper { overflow: visible !important; }
.ant-table table { width: 100% !important; table-layout: fixed !important; }
`,
	})

	return (
		<Spin spinning={loading || defaultLoading}>
			<section className="no-print">
				<Button type="text" icon={<AiOutlineLeft />} onClick={() => navigate('/request-list/overview?tabKey=2')}>
					ย้อนกลับ
				</Button>
			</section>

			{/* ส่งปุ่ม export ลงไป */}
			<section className="no-print">
				<TitleSection onExport={handleExport} />
			</section>

			{/* โซนที่ต้องการพิมพ์/Export */}
			<section className="mt-5">
				<div ref={printRef} className="print-wrapper">
					<ContentSection />
				</div>
			</section>
		</Spin>
	)
}

export default React.memo(EvaluationScreen)
