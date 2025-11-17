/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

interface Props {

}

const PermitFile: React.FC<Props> = (props) => {
	const { } = props

	return (
		<div className='mx-auto max-w-3xl'>
			<div className="text-right mb-8">
				<p className="font-bold">ม.61_ทช.03</p>
			</div>

			{/* Title Section */}
			<div className="text-center mb-8">
				<h1 className="font-bold mb-0.5">แบบขออนุญาต</h1>
				<h2 className="font-bold mb-0.5">ให้ยานพาหนะเดินบนทางหลวงชนบท</h2>
				<h3 className="mb-0.5">ตามประกาศ ผู้อำนวยการทางหลวงชนบท ม.61 หมวด 2 ข้อ 16(1),16(2),16(3),16(4),16(5)</h3>
			</div>

			{/* Date Section */}
			<div className="mb-6">
				<p className="text-right mb-1">
					<span>เขียนที่</span>
					<span className="inline-block w-64 border-b border-dotted border-black mx-1 text-center">บริษัท มามยก (ประเทศไทย) จำกัด</span>
				</p>
				<p className="text-right">
					<span>วันที่</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">18</span>
					<span>เดือน</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">กรกฎาคม</span>
					<span>พ.ศ.</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">2568</span>
				</p>
			</div>

			{/* Subject Section */}
			<div className="mb-3">
				<div className='flex items-center gap-5'>
					<p className='w-10'><strong>เรื่อง</strong></p>
					<p>ขออนุญาตให้ยานพาหนะเดินบนทางหลวงพิเศษ ทางหลวงแผ่นดิน และทางหลวงสัมปทาน</p>
				</div>
				<div className='flex items-center gap-5'>
					<p className='w-10'><strong>เรียน</strong></p>
					<p>อธิบดีกรมทางหลวงชนบท</p>
				</div>
			</div>

			{/* Applicant Type */}
			<div className="ml-15 mb-1">
				<div className="flex items-baseline mb-0.5">
					<span className="inline-block w-4 h-4 border border-black mr-1.5"></span>
					<span className="w-40 mr-2">บุคคลธรรมดา</span>
					<span className="mr-2">ชื่อ</span>
					<span className="flex-1 border-b border-dotted border-black"></span>
				</div>
				<div className="flex items-baseline">
					<span className="inline-block w-4 h-4 border border-black mr-1.5 relative">
						<span className="absolute inset-0 flex items-center justify-center text-lg leading-none">✓</span>
					</span>
					<span className="w-40 mr-2">นิติบุคคล</span>
					<span className="mr-2">ชื่อ</span>
					<span className="flex-1 border-b border-dotted border-black">&nbsp;</span>
				</div>
			</div>

			{/* PERSONAL INFO */}
			<div className="ml-15 mb-1">
				<span>ข้าพเจ้า (นาย/นาง/นางสาว)</span>
				<span className="inline-block w-[16rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>นามสกุล</span>
				<span className="inline-block w-[12.6rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
			</div>
			<div>
				<div className='mb-1'>
					<span>เจ้าของยานพาหนะหรือตัวแทน เจ้าของยานพาหนะ อยู่บ้านเลขที่</span>
					<span className="inline-block w-44 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>หมู่ที่</span>
					<span className="inline-block w-32 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>ถนน</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>ตรอก/ซอย</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>แขวง/ตำบล</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>เขต/อำเภอ</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>จังหวัด</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>โทรศัพท์</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>นิติบุคคลประเภท</span>
					<span className="inline-block w-68 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>จดทะเบียนเมื่อ</span>
					<span className="inline-block w-68 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>เลขที่ทะเบียน</span>
					<span className="inline-block w-68 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>อยู่เลขที่</span>
					<span className="inline-block w-[9.2rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>หมู่ที่</span>
					<span className="inline-block w-[9.2rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>ถนน</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>ตรอก/ซอย</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>แขวง/ตำบล</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>เขต/อำเภอ</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>จังหวัด</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>โทรศัพท์</span>
					<span className="inline-block w-[11.83rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
			</div>

			{/* Authorization Section */}
			<div className="ml-15 mb-1">
				<span>โดยมอบอำนาจให้ ข้าพเจ้า (นาย/นาง/นางสาว)</span>
				<span className="inline-block w-[10.49rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>นามสกุล</span>
				<span className="inline-block w-[10.49rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
			</div>
			<div>
				<div className='mb-1'>
					<span>อยู่บ้านเลขที่</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>หมู่ที่</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>ถนน</span>
					<span className="inline-block w-[10.3rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>ตรอก/ซอย</span>
					<span className="inline-block w-[10.3rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>แขวง/ตำบล</span>
					<span className="inline-block w-[11.45rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>เขต/อำเภอ</span>
					<span className="inline-block w-[11.45rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>จังหวัด</span>
					<span className="inline-block w-[11.45rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span>โทรศัพท์</span>
					<span className="inline-block w-[43.7rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
			</div>

			{/* Request Section */}
			<div className="ml-15 mb-1">
				<span>ขอยื่นคำขออนุญาตให้ยานพาหนะเดืนบนทางหลวงชนบท ตามประกาศผู้อำนวยการทางหลวงฯ หมวด 2</span>
			</div>
			<div>
				<div className='mb-1'>
					<span>ข้อ</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>ต่ออธิการบดีกรมทางหลวงชนบท เพื่อ (เหตุผลที่ขอ)</span>
					<span className="inline-block w-[18.8rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span className="inline-block w-96 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>โดยยานพาหนะมีลักษณะดังต่อไปนี้</span>
				</div>
			</div>
			<div className="ml-15 mb-1">
				<span>1. ลักษณะ/มาตรฐาน</span>
				<span className="inline-block w-56 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>ประเภท</span>
				<span className="inline-block w-[5.7rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>เลขที่ทะเบียน</span>
				<span className="inline-block w-[5.7rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
			</div>
			<div>
				<div className='mb-1'>
					<span>จังหวัด</span>
					<span className="inline-block w-32 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>สี</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>โดยมีจำนวน</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>เพลา</span>
					<span className='ml-1'>น้ำหนักลงเพลา</span>
					<span className="inline-block w-51 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>กิโลกรัม</span>
					<span className='ml-1'>น้ำหนักรวม</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>กิโลกรัม</span>
				</div>
			</div>
			<div className="ml-15 mb-1">
				<span>2. ลักษณะ/มาตรฐาน</span>
				<span className="inline-block w-56 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>ประเภท</span>
				<span className="inline-block w-[5.7rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				<span>เลขที่ทะเบียน</span>
				<span className="inline-block w-[5.7rem] border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
			</div>
			<div>
				<div className='mb-1'>
					<span>จังหวัด</span>
					<span className="inline-block w-32 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>สี</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>โดยมีจำนวน</span>
					<span className="inline-block w-16 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>เพลา</span>
					<span className='ml-1'>น้ำหนักลงเพลา</span>
					<span className="inline-block w-51 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
				</div>
				<div className='mb-1'>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>-</span>
					<span className="inline-block w-20 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>กิโลกรัม</span>
					<span className='ml-1'>น้ำหนักรวม</span>
					<span className="inline-block w-24 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
					<span>กิโลกรัม</span>
				</div>
			</div>

			{/* REMARK */}
			<div className='mt-5'>
				<p><strong>หมายเหตุ</strong><span className='ml-1'>โปรดระบุข้อมูลยานพาหนะทุกคันที่จะทำการขออนุญาต</span></p>
			</div>

			{/* FOOTER */}
			<div className='mt-1 text-right'>
				<p>/พร้อมนี้..</p>
			</div>
		</div>
	)
}

export default React.memo<Props>(PermitFile)
