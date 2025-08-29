import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser, HiLockClosed } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import type { JSX } from 'react'
import { setOpenModal, useAppDispatch, useAppSelector } from '@/store'
import ChangePassword from '../custom/modal/ChangePassword'

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
	const { authority, details, id, name, userName } = useAppSelector(state => state.auth.user)

	console.log(authority)
	console.log(details)
	console.log(id)
	console.log(name)
	console.log(userName)

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
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
			>
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" icon={<HiOutlineUser />} />
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
				{authority[0] === 'USER' ?
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
					onClick={signOut}
				>
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>Sign Out</span>
				</Dropdown.Item>
			</Dropdown>
			<ChangePassword />
		</div>
	)
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
