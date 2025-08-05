import React, { useState } from 'react'
import { Input, Radio, Button } from '@/components/ui'
import UploadButton from './UploadButton'

const ReviewResultForm = () => {
    const [formData, setFormData] = useState({
        result: '',
        response: '',
        remark: '',
    })

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    const handleReset = () => {
        setFormData({ result: '', response: '', remark: '' })
        setUploadedFile(null)
    }
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    return (
        <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="w-full mx-auto bg-white p-6 "
        >
            <div className="mb-6">
                <label className="block font-medium mb-2">ผลการตรวจสอบ</label>
                <div className="space-y-2 pl-1">
                    <Radio
                        checked={formData.result === 'pass'}
                        onChange={() => handleChange('result', 'pass')}
                    >
                        ผ่านการตรวจสอบ
                    </Radio>
                    <div><Radio
                        checked={formData.result === 'fail'}
                        onChange={() => handleChange('result', 'fail')}
                    >
                        ไม่ผ่านการตรวจสอบ
                    </Radio>'
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">ข้อความตอบกลับ</label>
                <textarea
                    rows={4}
                    value={formData.response}
                    onChange={(e) => handleChange('response', e.target.value)}
                    placeholder="ข้อความตอบกลับ..."
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="text-right mt-2">
                    <UploadButton onFileSelect={(file) => setUploadedFile(file)} />
                    {uploadedFile && (
                        <div className="mt-2 text-sm text-gray-700 text-left">
                            📎 ไฟล์ที่แนบ: <span className="font-medium">{uploadedFile.name}</span>
                        </div>
                    )}
                </div>

            </div>
            <div className="mb-6">
                <label className="block font-medium mb-2">หมายเหตุ</label>
                <textarea
                    rows={6}
                    value={formData.remark}
                    onChange={(e) => handleChange('remark', e.target.value)}
                    placeholder="หมายเหตุ"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>
            <div className="flex justify-center gap-24 mt-8">
                <Button className='px-10' type="reset" variant="solid" color='gray-500'>
                    ล้างข้อมูล
                </Button>
                <Button className='px-10' type="submit" variant="solid" color='green-400'>
                    บันทึก
                </Button>
            </div>
        </form>
    )
}

export default ReviewResultForm
