import React from 'react'

interface Props {
  file: File | null
}

const PDFViewer: React.FC<Props> = ({ file }) => {
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        กรุณาเลือกไฟล์ PDF
      </div>
    )
  }

  const fileURL = URL.createObjectURL(file)

  return (
    <iframe
      src={fileURL}
      title="PDF Preview"
      className="w-full h-full"
    />
  )
}

export default PDFViewer
