import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser, HiLockClosed } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { useCallback, useEffect, useState, type JSX } from 'react'
import { setOpenModal, useAppDispatch, useAppSelector } from '@/store'
import ChangePassword from '../custom/modal/ChangePassword'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { message, Spin } from 'antd'

type DropdownList = {
	label: string
	path: string
	icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
	{
		label: 'เปลี่ยนรหัสผ่าน',
		icon: <HiLockClosed />,
		path: '/password'
	}
]

const _UserDropdown = ({ className }: CommonProps) => {
	const { signOut } = useAuth()
	const dispatch = useAppDispatch()
	const { authority, name, details, from_web, m_token } = useAppSelector(state => state.auth.user)
	const [avatarImage, setAvatarImage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

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

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			{authority[0] === 'USER' ?
				<Spin spinning={loading}>
					<Avatar
						size={32}
						shape="circle"
						icon={<HiOutlineUser />}
						src={avatarImage}
					/>
				</Spin>
				: null}
			<div className="hidden md:block">
				{/* <div className="text-xs capitalize">admin</div> */}
				{/* <div className="font-bold">User01</div> */}
				<div className="font-bold">{name}</div>
			</div>
		</div>
	)

	return (
		<div>
			<Dropdown
				menuStyle={{ minWidth: 240 }}
				renderTitle={UserAvatar}
				placement="bottom-end"
			// disabled={authority[0] === 'USER' && from_web === false}
			>
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						{authority[0] === 'USER' ?
							<Spin spinning={loading}>
								<Avatar
									shape="circle"
									icon={<HiOutlineUser />}
									src={avatarImage}
								/>
							</Spin>
							: null}
						<div>
							{/* <div className="font-bold text-gray-900 dark:text-gray-100">
								User01
							</div> */}
							{/* <div className="text-xs">user01@mail.com</div> */}
							<div className="font-bold text-gray-900 dark:text-gray-100">
								{name}
							</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{authority[0] === 'USER' && from_web === true ?
					dropdownItemList.map((item) => {
						if (item.path === '/password') {
							return (
								<Dropdown.Item
									key={item.label}
									eventKey={item.label}
									className="gap-2"
									onClick={() => dispatch(setOpenModal(true))}
								>
									<span className="text-xl opacity-50">
										{item.icon}
									</span>
									<span>{item.label}</span>
								</Dropdown.Item>
							)
						} else {
							return (
								<Dropdown.Item
									key={item.label}
									eventKey={item.label}
									className="mb-1 px-0"
								>
									<Link
										className="flex h-full w-full px-2"
										to={item.path}
									>
										<span className="flex gap-2 items-center w-full">
											<span className="text-xl opacity-50">
												{item.icon}
											</span>
											<span>{item.label}</span>
										</span>
									</Link>
								</Dropdown.Item>
							)
						}
					})
					: null}
				{/* <Dropdown.Item variant="divider" /> */}
				<Dropdown.Item
					eventKey="Sign Out"
					className="gap-2"
					onClick={() => {
						if (authority[0] === 'USER' && from_web === false) {
							window.location.href = `https://eservice.drr.go.th/dga/back_to_web?mToken=${m_token}`
							signOut()
						} else {
							signOut()
						}
					}}
				>
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>{(authority[0] === 'USER' && from_web === false) ? 'ย้อนกลับ' : 'ออกจากระบบ'}</span>
				</Dropdown.Item>
			</Dropdown>
			<ChangePassword />
		</div>
	)
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
