import React from 'react'

const ConsiderationResult = () => {
  const resultStatus = 'ผ่านการตรวจ'
  const inspectedDate = 'วันที่ตรวจสอบ 22 ก.พ. 64'
  const officer = 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)'
  const remark = '-'

  return (
    <div className="bg-white rounded-md p-6 text-sm text-[#0066cc] space-y-4">
      <h2 className="text-lg font-bold">บันทึกผลการพิจารณา</h2>
      <div>
        <div className="font-bold mb-1">ผลการตรวจสอบ</div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="text-green-500">{resultStatus}</span>
          <span>{inspectedDate}</span>
          <span>{officer}</span>
        </div>
      </div>
      <div>
        <div className="font-bold mb-1">หมายเหตุ</div>
        <p>{remark}</p>
      </div>
    </div>
  )
}

export default ConsiderationResult
