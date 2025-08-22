import { SummaryData, VehicleData } from '@/@types/entrepreneur/route-estimation'
import VehicleSummary from './VehicleSummary'
import CardVehicleDetails from './CardVehicleDetails'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store'

const vehicleDataInitial: VehicleData[] = [
  {
    title: 'รถลากจูง',
    weight: 0,
    plate_no: '',
    image: '',
  },
  {
    title: 'รถกึ่งพ่วง',
    weight: 0,
    plate_no: '',
    image: '',
  },
  {
    title: 'เครื่องจักร',
    weight: 0,
    plate_no: '',
    image: '',
  },
]

const summaryDataInitial: SummaryData[] = [
  {
    title: 'น้ำหนักรถเปล่ารวม',
    description: String(0) + ' กก.',
  },
  {
    title: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา',
    description: String(0) + ' กก.',
  },
  {
    title: 'มิติรถเปล่า',
    description: `กว้าง 0 X ยาว 0 X สูง 0`,
  },
  {
    title: 'มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.)',
    description: `กว้าง 0 X ยาว 0 X สูง 0`,
  },
]

function DetailSection() {
  const { detailForRouteEstimation } = useAppSelector((state) => state.entrepreneur.vehicleList)
  const [vehicleData, setVehicleData] = useState<VehicleData[]>(vehicleDataInitial)
  const [summaryData, setSummaryData] = useState<SummaryData[]>(summaryDataInitial)

  useEffect(() => {
    console.log('detailForRouteEstimation ======> ', detailForRouteEstimation)
  }, [detailForRouteEstimation])

  return (
    <section className="mt-5 grid lg:grid-cols-2 gap-4 lg:h-[25vh]">
      <section className="lg:order-last">
        <VehicleSummary data={summaryData} />
      </section>
      <section>
        <CardVehicleDetails data={vehicleData} />
      </section>
    </section>
  )
}

export default DetailSection
