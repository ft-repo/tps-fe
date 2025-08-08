import React from 'react'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

const DocumentInvest = () => {
  const status = 'ผ่านการตรวจ'
  const date = 'วันที่ตรวจสอบ 22 ก.พ. 64'
  const officer = 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)'

  const documents = [
    {
      label: 'หนังสือมอบอำนาจ',
      filename: 'หนังสือมอบอำนาจ.pdf',
      url: '#',
    },
    {
      label: 'หนังสือรับรองตัวรถ',
      filename: 'หนังสือรับรองตัวรถ.pdf',
      url: '#',
    },
  ]

  return (
    <div className="text-sm text-[#0066cc] space-y-4">
      <h2 className="text-base font-bold">ผลการตรวจสอบ</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-6">
        <div className="text-green-500">{status}</div>
        <div>{date}</div>
        <div>{officer}</div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{doc.label}</span>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <HiOutlineDocumentDownload />
              <span className="text-[#0066cc]">{doc.filename}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentInvest
