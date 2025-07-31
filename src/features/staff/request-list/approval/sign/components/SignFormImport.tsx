import React from 'react'

interface Props {
    file: File | null
    setFile: (file: File | null) => void
    note: string
    setNote: (note: string) => void
}

const SignFormImport: React.FC<Props> = ({ file, setFile, note, setNote }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null
        if (selected?.type === 'application/pdf') {
            setFile(selected)
        } else {
            alert('กรุณาเลือกไฟล์ .pdf เท่านั้น')
            setFile(null)
        }
    }

    const handleReset = () => {
        setFile(null)
        setNote('')
    }

    const handleSubmit = () => {
        if (!file) {
            alert('กรุณาเลือกไฟล์ก่อน')
            return
        }

        console.log('ส่งไฟล์:', file)
        console.log('หมายเหตุ:', note)
    }

    return (
        <>
            <h2 className="text-4xl font-semibold text-blue-800 mb-6">นำเข้าใบอนุญาต</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                    ใบอนุญาต (รองรับไฟล์ .pdf เท่านั้น)
                </label>
                <div className="flex">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="flex-1 border border-blue-400 px-3 py-2 rounded-l text-sm"
                    />
                    <button className="bg-blue-800 text-white px-4 text-sm rounded-r hover:bg-blue-900">
                        เลือก
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 mb-1">หมายเหตุ</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={6}
                    className="w-full border border-blue-400 rounded px-3 py-2 text-sm"
                />
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleReset}
                    className="bg-gray-400 text-white px-10 py-2 rounded hover:bg-gray-500"
                >
                    ล้างข้อมูล
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-teal-500 text-white px-12 py-2 rounded hover:bg-teal-600"
                >
                    บันทึก
                </button>
            </div>
        </>
    )
}

export default SignFormImport
