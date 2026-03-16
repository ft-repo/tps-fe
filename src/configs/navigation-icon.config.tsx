import {
	HiOutlineColorSwatch,
	HiOutlineDesktopComputer,
	HiOutlineTemplate,
	HiOutlineViewGridAdd,
	// HiOutlineHome,
} from 'react-icons/hi'
import {
	LuMapPin,
	LuListChecks,
	LuTruck,
	LuServer,
} from "react-icons/lu";
import {
	FaRegUser,
	FaListOl,
	FaHistory,
	FaCommentDots,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
	// home: <HiOutlineHome />,
	singleMenu: <HiOutlineViewGridAdd />,
	collapseMenu: <HiOutlineTemplate />,
	groupSingleMenu: <HiOutlineDesktopComputer />,
	groupCollapseMenu: <HiOutlineColorSwatch />,
	// CUSTOM MENUBAR - ADMIN
	route_estimation: <LuMapPin />,
	permit_list: <LuListChecks />,
	vehicle_list: <LuTruck />,
	entrepreneur_info: <LuServer />,
	// CUSTOM MENUBAR - STAFF
	user_info: <FaRegUser />,
	request_list: <FaListOl />,
	request_history: <FaHistory />,
	tracking: <FaMapLocationDot />,
	contact_channel: <FaCommentDots />
}

export default navigationIcon
