import React from 'react'

import DocumentInvest from '../components/DocumentInvest'
import RouteEstimation from '../components/RouteEstimation'
import RouteEstimationTable from '../components/RouteEstimationTable'
import VehiclePermit from '../components/VehiclePermit'
import SignAndPermit from '../components/SignAndPermit'

const HistoryDocument = () => {
    return (
        <div className="w-full mx-auto px-4 py-6 space-y-12 text-[#0066cc] text-sm">
            <DocumentInvest />
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 w-full">
                    <RouteEstimation />
                </div>
                <div className="md:w-2/3 w-full overflow-x-auto">
                    <RouteEstimationTable />
                </div>
            </div>
            <VehiclePermit />
            <SignAndPermit />

        </div>
    )
}

export default HistoryDocument
