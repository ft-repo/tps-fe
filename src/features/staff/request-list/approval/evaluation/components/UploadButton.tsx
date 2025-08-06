import React, { useRef } from 'react'
import { Button } from '@/components/ui'
import { HiOutlineUpload } from 'react-icons/hi'

interface UploadButtonProps {
  onFileSelect: (file: File) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        size="sm"
        variant="solid"
        color="blue"
        icon={<HiOutlineUpload />}
        type="button"
        onClick={handleClick}
      >
        เพิ่มไฟล์
      </Button>
    </div>
  )
}

export default UploadButton
