import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
	type?: 'full' | 'streamline'
	mode?: 'light' | 'dark'
	imgClass?: string
	logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
	const {
		type = 'full',
		mode = 'light',
		className,
		imgClass = 'w-15 h-15',
		style,
		logoWidth = 'auto',
	} = props

	// console.log(className)
	// console.log(style)
	// console.log(logoWidth)

	return (
		<div
			className={classNames('logo', className)}
			style={{
				...style,
				...{ width: logoWidth },
				paddingTop: '16px',
				paddingBottom: '16px'
			}}
		>
			<div className={`flex flex-col items-center ${type === 'full' ? 'gap-3' : ''}`}>
				<img
					className={imgClass}
					src={`${LOGO_SRC_PATH}logo-TPS.png`}
					alt={`${APP_NAME} ${mode} logo`}
				/>
				<div className={type === 'full' ? 'block text-center' : 'hidden'}>
					<h3 className='text-white text-[1rem] font-bold'>TRUCK PERMISSION SYSTEM (Under Section 61)</h3>
					<p className='text-white text-[0.8rem] opacity-80'>การขออนุญาต/ต่อใบอนุญาตใช้ยานพาหนะบางชนิดบางประเภทเดินบนทางหลวงชนบท</p>
					<p className='text-white text-[0.8rem] opacity-80'>(มาตรา 61)</p>
				</div>
			</div>
		</div>
	)
}

export default Logo
