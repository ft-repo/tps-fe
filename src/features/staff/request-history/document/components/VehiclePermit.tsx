import React from 'react'

const VehiclePermit = () => {
    return (
        <div className="md:flex md:gap-8">
            <div className="md:w-1/3 space-y-2 mb-6 md:mb-0">
                <div className="font-bold">ข้อมูลยานพาหนะ (รถคันที่ 1)</div>
                <div>ประเภทยานพาหนะ: รถลากจูง + รถกึ่งพ่วง + สินค้า / พืชผัก / เครื่องจักร</div>
                <div>จำนวนล้อทั้งหมด: 12</div>
                <div>น้ำหนักรถลากเปล่า (กิโลกรัม): 27,900</div>
                <div>น้ำหนักรถบรรทุกพร้อมสินค้าทั้งหมด: 57,000</div>
                <div>ขนาด (กว้าง x ยาว x สูง เมตร): 3.50 x 9.00 x 4.30</div>
                <div>ขนาดเมื่อมีโหลดสินค้า: 3.50 x 9.00 x 4.96</div>
                <div>
                    เอกสารขออนุญาตจาก ทช.:{' '}
                    <a href="#" className="underline text-blue-600">
                        เอกสารขออนุญาตพาหนะ.01.pdf
                    </a>
                </div>
                <div className="space-y-2 pt-4">
                <div className="font-bold">ผลการตรวจสอบ</div>
                <div>ผ่านการตรวจ</div>
                <div>วันที่ตรวจสอบ: 22 ก.พ. 64</div>
                <div>เจ้าหน้าที่ตรวจสอบ: นางสาว วรรณิษา ศิริวัฒน์ (เจ้าหน้าที่ส่วนกลาง ทช.)</div>
            </div>
            </div>
            <div className="md:w-2/3 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <img src="/tractor.png" alt="รถลากจูง" className="rounded shadow-md" />
                    <div className="text-center font-semibold">รถลากจูง</div>
                </div>
                <div className="space-y-1">
                    <div className="font-bold">ข้อมูลรถลากจูง</div>
                    <div>ทะเบียน / เขตขนส่ง: 22 - 1144 สระบุรี</div>
                    <div>น้ำหนัก (กิโลกรัม): 15,000</div>
                    <div>น้ำหนักเพลาละ (กิโลกรัม): 5000 : 5000 : 5000</div>
                </div>

                <div className="space-y-2">
                    <img src="/trailer.png" alt="รถกึ่งพ่วง" className="rounded shadow-md" />
                    <div className="text-center font-semibold">รถกึ่งพ่วง</div>
                </div>
                <div className="space-y-1">
                    <div className="font-bold">ข้อมูลรถกึ่งพ่วง 4 เพลาคู่ 8</div>
                    <div>ทะเบียน / เขตขนส่ง: 83 - 9120 สระบุรี</div>
                    <div>น้ำหนัก (กิโลกรัม): 28,000</div>
                    <div>น้ำหนักเพลาละ (กิโลกรัม): 7000 : 7000 : 7000 : 7000</div>
                </div>

                <div className="space-y-2">
                    <img src="/equipment.png" alt="เครื่องจักร" className="rounded shadow-md" />
                    <div className="text-center font-semibold">เครื่องจักร</div>
                </div>
                <div className="space-y-1">
                    <div className="font-bold">ข้อมูลเครื่องจักร</div>
                    <div>ทะเบียน / เขตขนส่ง: 68 - 1181 สระบุรี</div>
                    <div>น้ำหนัก (กิโลกรัม): 35,800</div>
                </div>
            </div>
        </div>

    )
}

export default VehiclePermit
