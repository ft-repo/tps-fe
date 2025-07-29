import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-2 h-full">
            <div
                className="bg-no-repeat bg-fixed bg-contain py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-cover-bg.svg')`,
                }}
            >
                <div style={{ position: 'fixed', top: 32, left: 64, zIndex: 10 }}>
                    <img src="/img/logo/logo-dark-full.svg" alt="logo" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="w-full px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
