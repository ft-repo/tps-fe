import React from 'react'

const vehicleData = {
  owner: 'ห้างหุ้นส่วนจำกัด ซูบีออร์เนทช์ (ประเทศไทย) จำกัด',
  type: 'รถลากจูง + รถกึ่งพ่วง',
  registrationNumber: '22 - 1144',
  province: 'สระบุรี',
  color: 'น้ำเงิน',
  axleCount: '4',
  totalWeight: '36,200',
  axleWeights: '9000 : 9000 : 9000 : 9200',
}

const VehicleDetail = () => {
  return (
    <div className="text-sm text-[#0066cc] space-y-2">
      <h2 className="text-base font-bold">ข้อมูลยานพาหนะ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
        <LabelValue label="ลักษณะ / มาตรฐาน" value={vehicleData.owner} />
        <LabelValue label="ประเภท" value={vehicleData.type} />
        <LabelValue label="เลขทะเบียน" value={vehicleData.registrationNumber} />
        <LabelValue label="จังหวัด" value={vehicleData.province} />
        <LabelValue label="สี" value={vehicleData.color} />
        <LabelValue label="จำนวนเพลา" value={vehicleData.axleCount} />
        <LabelValue label="น้ำหนักรวม (กิโลกรัม)" value={vehicleData.totalWeight} />
        <LabelValue label="น้ำหนักแต่ละเพลา (กิโลกรัม)" value={vehicleData.axleWeights} />
      </div>
    </div>
  )
}

const LabelValue = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="font-medium">{label}</span>
    <span>{value}</span>
  </div>
)

export default VehicleDetail
