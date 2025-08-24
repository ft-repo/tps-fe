import {
  SummaryData,
  VehicleData,
} from '@/@types/entrepreneur/route-estimation'
import VehicleSummary from './VehicleSummary'
import CardVehicleDetails from './CardVehicleDetails'
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '@/store'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'

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
  const { detailForRouteEstimation } = useAppSelector(
    (state) => state.entrepreneur.vehicleList,
  )
  const [vehicleData, setVehicleData] =
    useState<VehicleData[]>(vehicleDataInitial)
  const [summaryData, setSummaryData] =
    useState<SummaryData[]>(summaryDataInitial)

  const getImageUrl = async (url: string) => {
    const fileName = url.split('/').slice(-2).join('/')
    const response = await getUploadAPI(fileName)
    if (response.status === 200 && response.data) {
      const blob = new Blob([response.data], { type: 'image/*' })
      const previewUrl = URL.createObjectURL(blob)
      return previewUrl
    }
    return ''
  }

  const getVehicleData = useCallback(async () => {
    let totalEmptyWeight = 0
    let totalEmptyWeightWithAxle = 0
    let totalVehicleVolume = 0
    let totalVehicleVolumeWithGoods = 0
    const vehicleData: VehicleData[] = []

    if (detailForRouteEstimation.towing_vehicle_detail) {
      vehicleData.push({
        title: 'รถลากจูง',
        weight:
          detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail
            ?.weight,
        plate_no:
          detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail
            ?.plate_no,
        image: await getImageUrl(
          detailForRouteEstimation.towing_vehicle_detail?.vehicle_pictures
            ?.front_rear_url),
      })
      totalEmptyWeight +=
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.weight
      totalEmptyWeightWithAxle +=
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.weight
      totalVehicleVolume +=
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.length *
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.width *
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.height
      totalVehicleVolumeWithGoods +=
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.length *
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.width *
        detailForRouteEstimation.towing_vehicle_detail?.vehicle_detail?.height
    }
    if (detailForRouteEstimation.semi_trailer_vehicle_detail) {
      vehicleData.push({
        title: 'รถกึ่งพ่วง',
        weight:
          detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
            ?.weight,
        plate_no:
          detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
            ?.plate_no,
        image: await getImageUrl(
          detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_pictures
            ?.front_rear_url),
      })
      totalEmptyWeight +=
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.weight
      totalEmptyWeightWithAxle +=
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.weight
      totalVehicleVolume +=
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.length *
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.width *
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.height
      totalVehicleVolumeWithGoods +=
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.length *
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.width *
        detailForRouteEstimation.semi_trailer_vehicle_detail?.vehicle_detail
          ?.height
    }
    if (detailForRouteEstimation.etc_vehicle_detail) {
      vehicleData.push({
        title: 'เครื่องจักร',
        weight:
          detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.weight,
        plate_no:
          detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.plate_no,
        image: await getImageUrl(
          detailForRouteEstimation.etc_vehicle_detail?.vehicle_pictures
            ?.front_rear_url),
      })
      totalEmptyWeight +=
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.weight
      totalEmptyWeightWithAxle +=
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.weight
      totalVehicleVolume +=
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.length *
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.width *
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.height
      totalVehicleVolumeWithGoods +=
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.length *
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.width *
        detailForRouteEstimation.etc_vehicle_detail?.vehicle_detail?.height
    }

    const summaryData: SummaryData[] = [
      {
        title: 'น้ำหนักรถเปล่ารวม',
        description: String(totalEmptyWeight) + ' กก.',
      },
      {
        title: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา',
        description: String(totalEmptyWeightWithAxle) + ' กก.',
      },
      {
        title: 'มิติรถเปล่า',
        description: `กว้าง ${totalVehicleVolume} X ยาว ${totalVehicleVolume} X สูง ${totalVehicleVolume}`,
      },
      {
        title: 'มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.)',
        description: `กว้าง ${totalVehicleVolumeWithGoods} X ยาว ${totalVehicleVolumeWithGoods} X สูง ${totalVehicleVolumeWithGoods}`,
      },
    ]

    setVehicleData(vehicleData)
    setSummaryData(summaryData)
  }, [detailForRouteEstimation])

  useEffect(() => {
    getVehicleData()
  }, [getVehicleData, detailForRouteEstimation])

  return (
    <section className="mt-5">
      <h5>รายละเอียด</h5>
      <section className="mb-3">
        <VehicleSummary data={summaryData} />
      </section>
      <section>
        <CardVehicleDetails data={vehicleData} />
      </section>
    </section>
  )
}

export default DetailSection
