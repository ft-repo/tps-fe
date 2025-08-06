import React from 'react'

const DocumentInvest = () => {
  const status = 'ผ่านการตรวจ'
  const date = 'วันที่ตรวจสอบ 22 ก.พ. 64'
  const officer = 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)'

  return (
    <div className="text-sm text-[#0066cc] space-y-2">
      <h2 className="text-base font-bold">ผลการตรวจสอบ</h2>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <span className="text-green-500">{status}</span>
        <span>{date}</span>
        <span>{officer}</span>
      </div>
    </div>
  )
}

export default DocumentInvest
