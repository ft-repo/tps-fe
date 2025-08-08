import React from 'react'

const RouteEstimation = () => {
    const start = {
        label: 'ขนส่งจาก',
        coords: '18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา',
    }

    const end = {
        label: 'ไปยัง',
        coords: '12.6814, 101.2775 จังหวัดระยอง',
    }

    const status = 'ไม่ผ่านการตรวจ'
    const reason = `สะพานและโครงสร้างไม่สอดคล้องกับขนาดและน้ำหนักของยานพาหนะ ก่อให้เกิดความเสี่ยงในการขับขี่และอาจกระทบต่อการจราจรและโครงสร้างถาวร`
    const date = 'วันที่ตรวจสอบ 22 ก.พ. 64'
    const officer = 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)'

    return (
        <div className="text-sm text-[#0066cc] space-y-6">
            <h2 className="text-base font-bold">ตรวจสอบเส้นทาง</h2>
            <div className="space-y-1">
                <div className="font-bold">ข้อมูลเส้นทาง (รถคันที่ 1)</div>
                <div>{start.label} <span className="font-medium">{start.coords}</span></div>
                <div>{end.label} <span className="font-medium">{end.coords}</span></div>
            </div>
            <div className="w-full aspect-[4/3]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248057.5564421384!2d100.46830079384614!3d13.724544917707366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2z4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4Lij!5e0!3m2!1sth!2sth!4v1754461711791!5m2!1sth!2sth"
                    className="w-full h-full "
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="space-y-2">
                <div className="font-bold">ผลการตรวจสอบ</div>
                <div className="text-red-500">{status}</div>
                <p className="text-[#0066cc]">{reason}</p>
                <div>{date}</div>
                <div>{officer}</div>
            </div>
        </div>
    )
}

export default RouteEstimation
