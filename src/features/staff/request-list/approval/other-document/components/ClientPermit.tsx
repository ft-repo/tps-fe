import React from 'react'

const clientData = {
  companyName: 'ห้างหุ้นส่วนจำกัด ซูบีออร์เนทช์ (ประเทศไทย) จำกัด',
  entityType: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
  companyAddress:
    'บ้านเลขที่ 99/1 หมู่ที่ 5 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
  registrationDate: '01 ม.ค. 60',
  taxId: '0105557001234',
  phone: '02-123-4567',
  authorizedPerson: 'นายอภิชาติ พงษ์ศิริเกษมชัย',
  authorizedAddress:
    'บ้านเลขที่ 99/1 หมู่ที่ 5 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
  proxyName: '-',
  proxyAddress: '-',
  proxyPhone: '-',
}

const ClientPermit = () => {
  return (
    <div className="text-sm text-[#0066cc] space-y-2">
      <h2 className="text-base font-bold">ข้อมูลผู้ประสงค์ขออนุญาต</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
        <LabelValue label="ชื่อบริษัท / ห้าง / ร้าน" value={clientData.companyName} />
        <LabelValue label="ประเภทนิติบุคคล" value={clientData.entityType} />
        <LabelValue label="ที่อยู่บริษัท" value={clientData.companyAddress} />
        <LabelValue label="วันที่จดทะเบียน" value={clientData.registrationDate} />
        <LabelValue label="เลขทะเบียนนิติบุคคล" value={clientData.taxId} />
        <LabelValue label="เบอร์โทรศัพท์" value={clientData.phone} />
        <LabelValue label="ผู้มีอำนาจ / ผู้แทนนิติบุคคล" value={clientData.authorizedPerson} />
        <LabelValue label="ที่อยู่" value={clientData.authorizedAddress} />
        <LabelValue label="ผู้ได้รับมอบอำนาจ" value={clientData.proxyName} />
        <LabelValue label="ที่อยู่" value={clientData.proxyAddress} />
        <LabelValue label="เบอร์โทรศัพท์" value={clientData.proxyPhone} />
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

export default ClientPermit
