/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { Card } from 'antd'
// import { VEHICLE_DATA } from '../../../mock'
import { VehicleData } from '@/@types/entrepreneur/route-estimation'

interface Props {
  data: VehicleData[]
}

const CardVehicleDetails: React.FC<Props> = (props) => {
  const { data = [] } = props

  const renderCardList = useMemo(() => {
    const vehicleList = data.map((item: VehicleData, index: number) => {
      return (
        // <Card
        //   key={index}
        //   header={!!item.image && (
        //     <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
        //       <img src={item.image} className='w-full h-44 object-cover object-center' alt="card header" />
        //     </div>
        //   )}
        //   headerClass='p-0'
        // >
        //   <h5>{item.title}</h5>
        //   <p>{item.description}</p>
        // </Card>
        <Card
          key={index}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={item.title}
              src={item.image}
            />
          }
        >
          <h5>{item.title}</h5>
          <p>{item.weight} กก.</p>
          <p>{item.plate_no}</p>
        </Card>
      )
    })

    return vehicleList
  }, [data])

  return (
    <div className="block sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderCardList}
    </div>
  )
}

export default React.memo<Props>(CardVehicleDetails)
