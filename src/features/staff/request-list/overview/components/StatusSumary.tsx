import React from 'react'

export interface StatusItem {
  label: string;
  count: number;
}

interface StatusSummaryProps {
  items: StatusItem[];
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-[#2176AE] text-white rounded-md px-2 py-2 relative"
        >
          <span className="text-xs font-medium">{item.label}</span>
          <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-md font-bold">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StatusSummary
