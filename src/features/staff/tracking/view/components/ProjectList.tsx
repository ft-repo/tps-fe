/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { FaCircleExclamation } from "react-icons/fa6";

interface Props {
  setDetailClick: (value: boolean) => void;
}

const ProjectList: React.FC<Props> = (props) => {
  const { setDetailClick } = props

  const arrText = useMemo(() => {
    return [
      'โครงการระบบโลจิสติกส์เพื่อการเคลื่อนย้ายเครื่องจักรกลหนัก',
      'โครงการพัฒนาระบบขนส่งอัจฉริยะเพื่อความปลอดภัยและประสิทธิภาพการเดินทาง',
      'โครงการเชื่อมโยงข้อมูลการขนส่งสินค้าระหว่างหน่วยงาน',
      'โครงการขนส่งสินค้าพลังงานสะอาด',
      'โครงการเพิ่มประสิทธิภาพเส้นทางขนส่งสินค้าโดยใช้ AI',
    ]
  }, [])

  const renderText = useMemo(() => {
    return arrText.map((item, index) => {
      return <p key={index} className='underline cursor-pointer mb-4' onClick={() => setDetailClick(true)}>{item}</p>
    })
  }, [arrText, setDetailClick])

  return (
    <div>
      <h5>ข้อมูลโครงการ</h5>
      <section className='mt-5'>
        {renderText}
      </section>
      <section>
        <div className='bg-[#8D9192] p-3 rounded-md'>
          <div className='flex items-center justify-center gap-3'>
            <FaCircleExclamation fill='#FFFFFF' />
            <p className='text-white'>กรุณาเลือกโครงการเพื่อแสดงรายละเอียด</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default React.memo<Props>(ProjectList)
