import React from 'react'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

type DocumentItem = {
  index: number
  name: string
  url?: string // optional for cases where file is not available
}

type Section = {
  title: string
  items: DocumentItem[]
}

const documentSections: Section[] = [
  {
    title: 'เอกสารผู้ขอและคำร้องขออนุญาต',
    items: [
      { index: 1, name: 'สำเนาบัตรประชาชน' },
      { index: 2, name: 'สำเนาหนังสือรับรองนิติบุคคล' },
      { index: 3, name: 'แบบคำร้องอนุญาตให้ยานพาหนะเดินบนทางหลวงชนบท ฯลฯ' },
      { index: 4, name: 'หนังสือมอบอำนาจ พร้อมสำเนาบัตรประชาชนผู้มอบอำนาจ ฯลฯ' },
    ],
  },
  {
    title: 'เอกสารยานพาหนะ',
    items: [
      { index: 1, name: 'สำเนาผู้ถือกรรมสิทธิ์และประวัติรถ' },
      { index: 2, name: 'รูปถ่ายยานพาหนะ' },
      { index: 3, name: 'รูปแบบยานพาหนะโดยแสดงสัดส่วน ฯลฯ' },
      { index: 4, name: 'รูปแบบยานพาหนะโดยแสดงจุดที่บรรทุกน้ำหนัก ฯลฯ' },
      { index: 5, name: 'รูปแบบยานพาหนะโดยแสดงรหัสที่ระบุเฉพาะ' },
    ],
  },
  {
    title: 'เอกสารรายการคำนวณและหนังสือรับรอง',
    items: [
      { index: 1, name: 'รายการคำนวณการใช้งานโครงสร้างตามภาพตัดขวาง' },
      { index: 2, name: 'รายการคำนวณการใช้งานจุดรองรับน้ำหนัก' },
      { index: 3, name: 'หนังสือรับรองของวิศวกร ฯลฯ (รวมไฟล์คำคำนวณ)' },
      { index: 4, name: 'หนังสือรับรองของวิศวกรผู้ตรวจสอบ ฯลฯ (รวมไฟล์คำคำนวณ)' },
      { index: 5, name: 'หนังสือรับรองของวิศวกรผู้ควบคุมงานออกแบบโครงสร้าง (ระบุไม่เกี่ยวข้องได้)' },
      { index: 6, name: 'แผนและรายละเอียดของการก่อสร้าง' },
    ],
  },
]

const DocumentTable = () => {
  return (
    <div className="overflow-x-auto text-sm text-[#0066cc]">
      <table className="w-full border-collapse">
        <thead className="bg-[#1c75bc] text-white text-center">
          <tr>
            <th className="px-4 py-2 w-[50px]">ลำดับ</th>
            <th className="px-4 py-2">รายการ</th>
            <th className="px-4 py-2 w-[80px]">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {documentSections.map((section, sIndex) => (
            <React.Fragment key={sIndex}>
              <tr className="bg-[#b3d9f4] font-bold">
                <td colSpan={3} className="px-4 py-2">{section.title}</td>
              </tr>
              {section.items.map((item) => (
                <tr key={item.index} className="text-center border-b border-[#ccc]">
                  <td className="px-4 py-2">{item.index}</td>
                  <td className="px-4 py-2 text-left">{item.name}</td>
                  <td className="px-4 py-2">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-red-500 hover:underline"
                      >
                        <HiOutlineDocumentDownload size={18} />
                        PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentTable
