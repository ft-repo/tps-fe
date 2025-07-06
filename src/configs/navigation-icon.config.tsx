import {
	HiOutlineColorSwatch,
	HiOutlineDesktopComputer,
	HiOutlineTemplate,
	HiOutlineViewGridAdd,
	HiOutlineHome,
} from 'react-icons/hi'
import {
	LuMapPin,
	LuListChecks,
	LuTruck,
	LuServer,
} from "react-icons/lu";
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
	home: <HiOutlineHome />,
	singleMenu: <HiOutlineViewGridAdd />,
	collapseMenu: <HiOutlineTemplate />,
	groupSingleMenu: <HiOutlineDesktopComputer />,
	groupCollapseMenu: <HiOutlineColorSwatch />,
	// CUSTOM MENUBAR
	routeEstimation: <LuMapPin />,
	permitList: <LuListChecks />,
	vehicleList: <LuTruck />,
	executiveData: <LuServer />,
}

export default navigationIcon
