/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

interface Props {

}

const serviceHours =
  'เปิดให้บริการวัน จันทร์ ถึง วัน ศุกร์ (ยกเว้นวันหยุดที่ทางราชการกำหนด) ตั้งแต่เวลา 08:30 - 16:00 น. (ไม่มีพักเที่ยง)'

const ContactChannelIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>ช่องทางการติดต่อ</h3>
      {/* Section: ช่องทางการติดต่อ */}
      <p className="my-5 text-center text-base font-medium">ช่องทางการติดต่อ</p>

      <div className="mb-10 px-10 max-[1200px]:px-0 min-[1600px]:w-2/3 min-[1600px]:mx-auto">
        <div className="flex w-full items-stretch max-[1200px]:flex-col max-[1200px]:gap-3">
          {/* การ์ดที่ 1 */}
          <div className="relative z-10 flex-1 rounded-xl p-[25px] pb-10 text-xs leading-relaxed bg-[#C4E7FF] shadow-md">
            <h4 className="mb-3 text-sm font-semibold">สถานที่ให้บริการ</h4>
            <p className="mb-3">แขวงทางหลวงชนบททั้ง 76 จังหวัด ติดต่อด้วยตนเอง ณ หน่วยงาน</p>
            <h4 className="mb-3 mt-[15px] text-sm font-semibold">ระยะเวลาเปิดให้บริการ</h4>
            <p>{serviceHours}</p>
          </div>

          {/* การ์ดที่ 2 */}
          <div className="relative z-20 -ml-4 flex-1 rounded-xl p-[25px] pb-10 text-xs leading-relaxed bg-[#AADDFF] shadow-md max-[1200px]:ml-0">
            <h4 className="mb-3 text-sm font-semibold">สถานที่ให้บริการ</h4>
            <p className="mb-3">สำนักงานทางหลวงชนบทเขตที่ 1 - 18 ติดต่อด้วยตนเอง ณ หน่วยงาน</p>
            <h4 className="mb-3 mt-[15px] text-sm font-semibold">ระยะเวลาเปิดให้บริการ</h4>
            <p>{serviceHours}</p>
          </div>

          {/* การ์ดที่ 3 */}
          <div className="relative z-25 -ml-4 flex-1 rounded-xl p-[25px] pb-10 text-xs leading-relaxed bg-[#83CDFF] shadow-md max-[1200px]:ml-0">
            <h4 className="mb-3 text-sm font-semibold">สถานที่ให้บริการ</h4>
            <p className="mb-3">ศูนย์บริการเบ็ดเสร็จกรมทางหลวงชนบท Rural Roads One Stop Service Center เลขที่ 9 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร ติดต่อด้วยตนเอง ณ หน่วยงาน</p>
            <h4 className="mb-3 mt-[15px] text-sm font-semibold">ระยะเวลาเปิดให้บริการ</h4>
            <p>{serviceHours}</p>
          </div>
        </div>
      </div>

      {/* Section: ช่องทางการร้องเรียน */}
      <p className="my-5 text-center text-base font-medium">ช่องทางการร้องเรียนและแนะนำบริการ</p>

      <div className="mb-10 px-10 max-[1200px]:px-0">
        <div className="flex w-full items-start max-[1200px]:flex-col max-[1200px]:items-stretch max-[1200px]:gap-3">
          {/* ลำดับ 1 */}
          <div className="relative z-10 flex-1 rounded-xl p-[25px] pb-10 text-xs leading-relaxed bg-[#FFECC4] shadow-md">
            <h3 className="mb-3 text-sm font-semibold">ลำดับ 1</h3>
            <p className="mb-3">ผู้บังคับบัญชาหน่วยงานที่ยื่นคำขอรับบริการ</p>
            <p>หมายเหตุ: ร้องเรียนด้วยตนเอง / ไปรษณีย์</p>
          </div>

          {/* ลำดับ 2 */}
          <div className="relative z-20 -ml-4 flex-1 rounded-xl p-[25px] pb-25 text-xs leading-relaxed bg-[#FFE3A7] shadow-md max-[1200px]:ml-0 max-[1200px]:pb-10">
            <h3 className="mb-3 text-sm font-semibold">ลำดับ 2</h3>
            <div className='mb-3'>
              <p>ศูนย์ประสานงานการแก้ไขปัญหาตามข้อร้องเรียนของประชาชนของกรมทางหลวงชนบท</p>
              <p>หมายเลขโทรศัพท์ สายด่วน 1146</p>
              <p>0 2551 5000, 0 2551 5174-5</p>
            </div>
            <p>หมายเหตุ: ร้องเรียนด้วยตนเอง / ไปรษณีย์</p>
          </div>

          {/* ลำดับ 3 */}
          <div className="relative z-30 -ml-4 flex-1 rounded-xl p-[25px] pb-50 text-xs leading-relaxed bg-[#FED57C] shadow-md max-[1200px]:ml-0 max-[1200px]:pb-10">
            <h3 className="mb-3 text-sm font-semibold">ลำดับ 3</h3>
            <p className="mb-3">ศูนย์บริการประชาชน สำนักปลัดสำนักนายกรัฐมนตรี</p>
            <p>
              หมายเหตุ: เลขที่ 1 ถ.พิษณุโลก เขตดุสิต กทม. 10300 / สายด่วน 1111 / www.1111.go.th / ตู้ ปณ.1111 เลขที่ 1 ถ.พิษณุโลก เขตดุสิต กทม. 10300
            </p>
          </div>

          {/* ลำดับ 4 */}
          <div className="relative z-40 -ml-4 flex-1 rounded-xl p-[25px] pb-10 text-xs leading-relaxed bg-[#FFC64A] shadow-md max-[1200px]:ml-0">
            <h3 className="mb-3 text-sm font-semibold">ลำดับ 4</h3>
            <p className="mb-3">ศูนย์รับเรื่องร้องเรียนการทุจริตในภาครัฐ</p>
            <p className="mb-3">
              หมายเหตุ: สำนักงานคณะกรรมการป้องกันและปราบปรามการทุจริตในภาครัฐ (สำนักงาน ป.ป.ท.)
            </p>
            <ul className="mb-3 list-disc pl-[15px]">
              <li>
                99 หมู่ 4 อาคารซอฟต์แวร์ปาร์ค ชั้น 2 ถนนแจ้งวัฒนะ ตำบลคลองเกลือ อำเภอปากเกร็ด จังหวัดนนทบุรี 11120
              </li>
              <li>
                สายด่วน 1206 / โทรศัพท์ 0 2502 6670-80 ต่อ 1900, 1904-7 / โทรสาร 0 2502 6132
              </li>
              <li>
                www.pacc.go.th / www.facebook.com/PACC.GO.TH
              </li>
            </ul>
            <div>
              <p>ศูนย์รับเรื่องร้องเรียนสำหรับนักลงทุนต่างชาติ (The Anti-Corruption Operation Center)</p>
              <p>Tel : +66 92 668 0777</p>
              <p>Line : Fad.pacc</p>
              <p>Facebook : The Anti-Corruption Operation Center</p>
              <p>Email : Fad.pacc@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo<Props>(ContactChannelIndex)
