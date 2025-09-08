import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import { HiOutlineBell } from 'react-icons/hi'
// import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
import NotificationContent, { SidePanelContentProps } from './NotificationContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import type { CommonProps } from '@/@types/common'
import { useEffect } from 'react'
import { getPetitionNotification } from '@/store/slices/staff'
import { Badge } from 'antd'

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
	const dispatch = useAppDispatch()

	const { className, ...rest } = props

	const panelExpand = useAppSelector((state) => state.theme.panelExpand)

	const direction = useAppSelector((state) => state.theme.direction)

	const { authority } = useAppSelector(state => state.auth.user)

	const { notification } = useAppSelector(state => state.staff.petition)

	useEffect(() => {
		if (authority[0] === 'ADMIN') {
			// INIT API RECALL
			dispatch(getPetitionNotification(notification.search))
			// RECALL API EVERY 10 MINUTE
			const interval = setInterval(() => {
				dispatch(getPetitionNotification(notification.search))
			}, 600000);
			// CLEAR INTERVAL
			return () => clearInterval(interval);
		}
	}, [dispatch, notification.search, authority])

	const openPanel = () => {
		dispatch(setPanelExpand(true))
	}

	const closePanel = () => {
		dispatch(setPanelExpand(false))
		const bodyClassList = document.body.classList
		if (bodyClassList.contains('drawer-lock-scroll')) {
			bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
		}
	}

	return (
		<>
			{authority[0] === 'ADMIN' ?
				<Badge count={notification.data.length} offset={[-5, 5]}>
					<div
						className={classNames('text-2xl', className)}
						onClick={openPanel}
						{...rest}
					>
						<HiOutlineBell />
					</div>
				</Badge>
				: null}
			<Drawer
				title="แจ้งเตือน"
				isOpen={panelExpand}
				placement={direction === 'rtl' ? 'left' : 'right'}
				width={375}
				onClose={closePanel}
				onRequestClose={closePanel}
			>
				{/* <SidePanelContent callBackClose={closePanel} /> */}
				<NotificationContent callBackClose={closePanel} />
			</Drawer>
		</>
	)
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel
