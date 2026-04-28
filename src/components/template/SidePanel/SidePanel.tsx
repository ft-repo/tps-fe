import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import { HiOutlineBell } from 'react-icons/hi'
// import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
import NotificationContent, { SidePanelContentProps } from './NotificationContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import type { CommonProps } from '@/@types/common'
import { useEffect, useMemo, useState } from 'react'
import { getPetitionNotification } from '@/store/slices/staff'
import { Badge, Dropdown, MenuProps, Tooltip } from 'antd'
import { FaQuestion } from "react-icons/fa6";

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
	const dispatch = useAppDispatch()

	const { className, ...rest } = props

	const panelExpand = useAppSelector((state) => state.theme.panelExpand)

	const direction = useAppSelector((state) => state.theme.direction)

	const { authority } = useAppSelector(state => state.auth.user)

	const { notification } = useAppSelector(state => state.staff.petition)

	const { is_personal } = useAppSelector(state => state.auth.user.details)

	//STATE
	const [cachedTotal, setCachedTotal] = useState<number>(0);
	const [unreadCount, setUnreadCount] = useState<number>(0);

	// Initialize cache from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem('notification_cache');
		if (stored) {
			setCachedTotal(Number(stored));
		}
	}, []);

	// Calculate unread count whenever notification total changes
	useEffect(() => {
		const current = notification.pagination.total || 0;
		const diff = Math.max(0, current - cachedTotal);
		setUnreadCount(diff);
	}, [notification.pagination.total, cachedTotal]);

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

	const handleClick = () => {
		const currentTotal = notification.pagination.total || 0;

		// Cache current total
		setCachedTotal(currentTotal);
		localStorage.setItem('notification_cache', String(currentTotal));

		// Reset unread count since user viewed notifications
		setUnreadCount(0);

		// Open panel (your existing function)
		openPanel();
	};

	const closePanel = () => {
		dispatch(setPanelExpand(false))
		const bodyClassList = document.body.classList
		if (bodyClassList.contains('drawer-lock-scroll')) {
			bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
		}
	}

	// const onClickManual = () => {
	// 	if (authority[0] === 'ADMIN') {
	// 		window.open('/pdf/คู่มือระบบ TPS สำหรับเจ้าหน้าที่.pdf', '_blank')
	// 	} else {
	// 		window.open('/pdf/คู่มือระบบ TPS สำหรับผู้ประกอบการ.pdf', '_blank')
	// 	}
	// }

	const items: MenuProps['items'] = useMemo(() => {
		if (authority[0] === 'ADMIN') {
			return [
				{
					key: '1',
					label: 'คู่มือระบบ TPS สำหรับเจ้าหน้าที่',
					onClick: () => window.open('/pdf/คู่มือระบบ TPS สำหรับเจ้าหน้าที่ V.02.pdf', '_blank')
				},
				{
					key: '2',
					label: 'คู่มือระบบ TPS สำหรับผู้ประกอบการ',
					onClick: () => window.open('/pdf/new-pdf/คู่มือระบบ TPS สำหรับผู้ประกอบการ V.02.pdf', '_blank')
				},
				{
					key: '3',
					label: 'คู่มือระบบ TPS สำหรับบุคคลทั่วไป',
					onClick: () => window.open('/pdf/new-pdf/คู่มือระบบ TPS สำหรับบุคคลทั่วไป V.02.pdf', '_blank')
				},
			]
		} else {
			if (is_personal) {
				return [
					{
						key: '1',
						label: 'คู่มือระบบ TPS สำหรับเจ้าหน้าที่',
						onClick: () => window.open('/pdf/คู่มือระบบ TPS สำหรับเจ้าหน้าที่ V.02.pdf', '_blank')
					},
					{
						key: '2',
						label: 'คู่มือระบบ TPS สำหรับบุคคลทั่วไป',
						onClick: () => window.open('/pdf/new-pdf/คู่มือระบบ TPS สำหรับบุคคลทั่วไป V.02.pdf', '_blank')
					},
				]
			} else {
				return [
					{
						key: '1',
						label: 'คู่มือระบบ TPS สำหรับเจ้าหน้าที่',
						onClick: () => window.open('/pdf/คู่มือระบบ TPS สำหรับเจ้าหน้าที่ V.02.pdf', '_blank')
					},
					{
						key: '2',
						label: 'คู่มือระบบ TPS สำหรับผู้ประกอบการ',
						onClick: () => window.open('/pdf/new-pdf/คู่มือระบบ TPS สำหรับผู้ประกอบการ V.02.pdf', '_blank')
					},
				]
			}

		}
	}, [is_personal, authority])

	// const checkRole = useMemo(() => {
	// 	if (authority[0] !== 'ADMIN') {
	// 		return items.filter(item => item?.key !== '1')
	// 	}

	// 	return items
	// }, [items, authority])

	return (
		<>
			<Tooltip title='คู่มือการใช้งานระบบ'>
				<Dropdown
					menu={{
						items: items
					}}
					trigger={['click']}
				>
					<div
						className={classNames('text-2xl', className)}
						{...rest}
					>
						<FaQuestion />
					</div>
				</Dropdown>
			</Tooltip>
			{authority[0] === 'ADMIN' ?
				<Badge count={unreadCount} offset={[-5, 5]}>
					<div
						className={classNames('text-2xl', className)}
						onClick={handleClick}
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
