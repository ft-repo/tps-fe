/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { SummaryData } from '@/@types/entrepreneur/route-estimation'

interface Props {
  data: SummaryData[];
}

const VehicleSummary: React.FC<Props> = (props) => {
  const { data } = props

  const renderSummary = useMemo(() => {
    const summaryList = data.map((item: SummaryData, index: number) => {
      return (
        <div
          key={index}
          className='flex items-center flex-wrap gap-3 justify-between'
        >
          <p><strong>{item.title}:</strong></p>
          <p>{item.description}</p>
        </div>
      )
    })

    return summaryList
  }, [data])

  return (
    <div className='bg-gray-200 rounded-md p-3'>
      {renderSummary}
    </div>
  )
}

export default React.memo<Props>(VehicleSummary)
