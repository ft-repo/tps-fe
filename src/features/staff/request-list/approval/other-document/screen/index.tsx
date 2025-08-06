import React from 'react'
import ClientPermit from '../components/ClientPermit'
import VehicleDetail from '../components/VehicleDetail'
import Detail from '../components/Detail'
import DocumentTable from '../components/DocumentTable'

const OtherDocument = () => {
    return (
        <div className="w-full mx-auto px-4 py-6 space-y-10 text-[#0066cc]">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">ตรวจสอบเอกสาร</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Export to PDF
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
                <ClientPermit />
                <VehicleDetail />
            </div>
            <Detail />
            <div className="w-full flex justify-center">
                <div className="w-full max-w-4xl">
                    <DocumentTable />
                </div>
            </div>


        </div>
    )
}

export default OtherDocument
