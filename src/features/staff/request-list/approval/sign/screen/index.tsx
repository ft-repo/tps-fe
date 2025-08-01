import React, { useState } from 'react'
import SignFormImport from '../components/SignFormImport'
import PDFViewer from '../components/PDFviewer'

const ApprovalSignPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState('')

  return (
    <div className="flex w-full h-screen p-6 gap-6">
      <div className="w-[35%] min-w-[300px] bg-white p-6">
        <SignFormImport
          file={file}
          setFile={setFile}
          note={note}
          setNote={setNote}
        />
      </div>
      <div className="flex-1 border-8 border-blue-500 rounded overflow-hidden">
        <PDFViewer file={file} />
      </div>
    </div>
  )
}

export default ApprovalSignPage
