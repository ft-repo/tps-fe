import { useState, Suspense, lazy, useMemo, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import {
	NAV_MODE_THEMED,
	NAV_MODE_TRANSPARENT,
	DIR_RTL,
} from '@/constants/theme.constant'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import NavToggle from '@/components/shared/NavToggle'
import navigationConfig from '@/configs/navigation.config'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { Button, message, Spin } from 'antd'
import DRRLogo from '@/assets/img/drr-logo.png'
import useAuth from '@/utils/hooks/useAuth'
import { HiOutlineUser } from 'react-icons/hi'
import Avatar from '@/components/ui/Avatar'

const VerticalMenuContent = lazy(
	() => import('@/components/template/VerticalMenuContent'),
)

type MobileNavToggleProps = {
	toggled?: boolean
}

const MobileNavToggle = withHeaderItem<
	MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openDrawer = () => {
		setIsOpen(true)
	}

	const onDrawerClose = () => {
		setIsOpen(false)
	}

	const themeColor = useAppSelector((state) => state.theme.themeColor)
	const primaryColorLevel = useAppSelector(
		(state) => state.theme.primaryColorLevel,
	)
	const navMode = useAppSelector((state) => state.theme.navMode)
	const mode = useAppSelector((state) => state.theme.mode)
	const direction = useAppSelector((state) => state.theme.direction)
	const currentRouteKey = useAppSelector(
		(state) => state.base.common.currentRouteKey,
	)

	const userAuthority = useAppSelector((state) => state.auth.user.authority)

	// USE AUTH
	const { signOut } = useAuth()

	// DATA FROM REDUX STORE
	const { authority, name, details, from_web, m_token } = useAppSelector(state => state.auth.user)
	// const dispatch = useAppDispatch()
	// const navigate = useNavigate()

	// STATE
	const [avatarImage, setAvatarImage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const { smaller } = useResponsive()

	// While the drawer is open, force transparent nav styling regardless of
	// the user's selected theme nav mode; once closed, fall back to it again.
	const effectiveNavMode = isOpen ? NAV_MODE_TRANSPARENT : navMode

	const navColor = () => {
		if (effectiveNavMode === NAV_MODE_THEMED) {
			return `bg-${themeColor}-${primaryColorLevel} side-nav-${effectiveNavMode}`
		}

		if (effectiveNavMode === NAV_MODE_TRANSPARENT) {
			return `side-nav-${mode}`
		}

		return `side-nav-${effectiveNavMode}`
	}

	const extractUrl = useCallback((url: string) => {
		const path = url?.split('/upload')[1];
		return path
	}, []);

	const fetchImage = useCallback(async (imgUrl: string) => {
		setLoading(true)
		try {
			const response = await getUploadAPI(imgUrl)
			if (response.status === 200) {
				const blobFile = new Blob([response.data], { type: response.data.type })
				const url = URL.createObjectURL(blobFile)
				setAvatarImage(url)
			}
		} catch (error) {
			if (error instanceof Error) {
				message.error(error.message)
			} else {
				console.error(error)
			}
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (authority[0] === 'USER') {
			if (extractUrl(details.profile_url)) {
				fetchImage(extractUrl(details.profile_url))
			}
		}
	}, [details, extractUrl, fetchImage, authority])

	const renderTitle = useMemo(() => {
		const AUTHORITY_USER = {
			"ADMIN": "เจ้าหน้าที่กรมทางหลวงชนบท",
			"CLIENT": "ผู้ประกอบการ",
			"USER": "ผู้ใช้งานทั่วไป",
		}
		return (
			<header className='flex flex-col flex-wrap items-center justify-center gap-3'>
				<Spin spinning={loading}>
					{/* <Avatar
						size={64}
						src={authority[0] === 'USER' ? avatarImage : DRRLogo}
						alt='กรมทางหลวงชนบท'
						style={{ backgroundColor: 'transparent' }}
					/> */}
					<Spin spinning={loading}>
						<Avatar
							size={32}
							shape="circle"
							icon={<HiOutlineUser />}
							src={authority[0] === 'USER' ? avatarImage : DRRLogo}
						/>
					</Spin>
				</Spin>
				<section className='text-center'>
					<p className='font-bold'>{name || '-'}</p>
					<p>{AUTHORITY_USER[authority[0] as keyof typeof AUTHORITY_USER] || '-'}</p>
				</section>
			</header>
		)
	}, [avatarImage, name, authority, loading])

	const renderFooter = useMemo(() => {
		return (
			<Button
				block
				type='primary'
				size='large'
				style={{
					fontFamily: 'Noto Sans Thai'
				}}
				onClick={() => {
					if (authority[0] === 'USER' && from_web === false) {
						window.location.href = `https://eservice.drr.go.th/uat/dga/back_to_web?mToken=${m_token}`
					} else {
						signOut()
					}
				}}
			>
				{(authority[0] === 'USER' && from_web === false) ? 'ย้อนกลับ' : 'ออกจากระบบ'}
			</Button>
		)
	}, [signOut, authority, from_web, m_token])

	return (
		<>
			{smaller.md && (
				<>
					<div className="text-2xl" onClick={openDrawer}>
						<MobileNavToggle toggled={isOpen} />
					</div>
					<Drawer
						title={renderTitle}
						footer={renderFooter}
						isOpen={isOpen}
						bodyClass={classNames(navColor(), 'p-0')}
						width={330}
						placement={direction === DIR_RTL ? 'right' : 'left'}
						onClose={onDrawerClose}
						onRequestClose={onDrawerClose}
					>
						<Suspense fallback={<></>}>
							{isOpen && (
								<VerticalMenuContent
									navMode={effectiveNavMode}
									collapsed={false}
									navigationTree={navigationConfig}
									routeKey={currentRouteKey}
									userAuthority={userAuthority as string[]}
									direction={direction}
									onMenuItemClick={onDrawerClose}
								/>
							)}
						</Suspense>
					</Drawer>
				</>
			)}
		</>
	)
}

export default MobileNav
