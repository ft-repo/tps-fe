import React from 'react'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

const documents = [
    {
        label: 'เอกสารลงนาม',
        filename: 'เอกสารลงนามจังหวัดพระนครศรีอยุธยา-ระยอง4.pdf',
        date: 'วันที่ดำเนินการเอกสาร 22 ก.พ. 64',
        officer: 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)',
        url: '#',
    },
    {
        label: 'เอกสารใบอนุญาต',
        filename: 'ใบอนุญาต.pdf',
        date: 'วันที่ดำเนินการเอกสาร 22 ก.พ. 64',
        officer: 'นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)',
        url: '#',
    },
]

const SignAndPermit = () => {
    return (
        <div className="text-sm text-[#0066cc] space-y-4">
            <h2 className="text-base font-bold">เอกสารลงนามและใบอนุญาต</h2>
            <div className="font-bold">เอกสารสำคัญ</div>
            <div className="space-y-2">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        <div className="flex items-center gap-2">
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
                        <div>{doc.date}</div>
                        <div>{doc.officer}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SignAndPermit
