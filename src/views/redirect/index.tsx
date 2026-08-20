import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { useAppSelector } from '@/store'

const REDIRECT_DELAY_MS = 5000

const textGroupVariants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
}

const textLineVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const RedirectIndex = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userName = useAppSelector((state) => state.auth.user.name)

  const destination = location.state?.to || appConfig.authenticatedEntryPath

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(destination, { replace: true })
    }, REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [destination, navigate])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Noto Sans Thai',
        },
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center h-full w-full gap-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1F74AA 0%, #47BAA3 100%)',
        }}
      >
        <motion.img
          src="/img/logo/logo-TPS.png"
          className="w-32 h-32"
          alt="TPS logo"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        />
        <motion.div
          className="text-center text-white"
          initial="hidden"
          animate="visible"
          variants={textGroupVariants}
        >
          <motion.p className="text-2xl" variants={textLineVariants}>สวัสดี,</motion.p>
          <motion.p className="text-3xl font-bold mt-1" variants={textLineVariants}>{userName}</motion.p>
          <motion.p className="text-lg mt-3 opacity-90" variants={textLineVariants}>ยินดีต้อนรับเข้าสู่ระบบ</motion.p>
          <motion.p className="text-base font-semibold mt-2" variants={textLineVariants}>Truck Permission System (Under Section 61)</motion.p>
          <motion.p className="text-sm mt-2 opacity-80" variants={textLineVariants}>การขออนุญาต/ต่อใบอนุญาตใช้ยานพาหนะ</motion.p>
          <motion.p className="text-sm mt-1 opacity-80" variants={textLineVariants}>บางชนิดบางประเภทเดินบนทางหลวงชนบท (มาตรา 61)</motion.p>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/70"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: REDIRECT_DELAY_MS / 1000, ease: 'linear' }}
        />
      </div>
    </ConfigProvider>
  )
}

export default RedirectIndex
