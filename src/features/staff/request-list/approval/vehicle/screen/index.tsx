/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
/* VehicleScreen.tsx */
import React, { useEffect } from 'react'
import { Button, Spin } from 'antd'
import { ContentTab } from '../components'
import { AiOutlineLeft } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionDocument, getPetitionEstimateRoute, getPetitionStatus, getPetitionVehicle } from '@/store/slices/staff'
// import { useReactToPrint } from 'react-to-print'

interface Props { }

const VehicleScreen: React.FC<Props> = (props) => {
	const { } = props;
	// const [params] = useSearchParams()
	// const petitionId = params.get('petition_id')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const defaultLoading = useAppSelector(s => s.layout.loading)
	const { loading } = useAppSelector(s => s.staff.petition)
	const { state } = useLocation()

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

	// ---------- PRINT ----------
	// const printRef = useRef<HTMLDivElement>(null)

	// const pageStyle = `
	//   @page { size: A4 portrait; margin: 14mm; }
	//   @media print {
	//     html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
	//     .no-print { display: none !important; }
	//     .print-a4, .print-a4 * { break-inside: avoid; page-break-inside: avoid; }
	//     .print-keep { break-inside: avoid; page-break-inside: avoid; }
	//     /* ตารางกระชับตอนพิมพ์ */
	//     .print-a4 .ant-table { font-size: 12px; }
	//     .print-a4 .ant-table-cell { padding: 6px 8px !important; }
	//   }
	// `

	// const handlePrint = useReactToPrint({
	// 	contentRef: printRef,
	// 	documentTitle: 'ตรวจสอบยานพาหนะ',
	// 	pageStyle,
	// })

	return (
		<Spin spinning={loading || defaultLoading}>
			<section className="no-print">
				<Button
					type="text"
					icon={<AiOutlineLeft />}
					onClick={() => navigate('/request-list/overview')}
				>
					ย้อนกลับ
				</Button>
			</section>

			<section className="no-print">
				{/* <TitleSection onExport={handlePrint} /> */}
				<h3>ตรวจสอบยานพาหนะ</h3>
			</section>

			{/* <div ref={printRef} className="print-a4"> */}
			<section className="mt-5 print-keep">
				<ContentTab />
			</section>
			{/* </div> */}
		</Spin>
	)
}

export default React.memo(VehicleScreen)
