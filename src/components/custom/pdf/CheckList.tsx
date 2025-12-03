/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface Props {

}

const CheckList: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Document>
      <Page size="A4">
        <div className='mx-auto max-w-3xl'>
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="font-bold mb-0.5">พร้อมนี้ได้แนบหลักฐานและเอกสารเพื่อประกอบการพิจารณาตามหลักเกณฑ์ที่กำหนดดังนี้</h1>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>สำเนาบัตรประชาชน</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>สำเนาหนังสือรับรองนิติบุคคล</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>แบบคำขออนุญาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>หนังสือมอบอำนาจพร้อมตราประทับของผู้มีอำนาจลงนามแทนบริษัทหรือห้างหุ้นส่วน</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>สำเนาคู่มือจดทะเบียนและประวัติยานพาหนะที่ขออนุญาต เช่น รถลากจูงรถกึ่งพ่วง พร้อมหลักฐานฉบับจริงต่อเจ้าหน้าที่เพื่อตรวจสอบ</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รูปถ่ายสียานพาหนะ</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รูปแบบยานพาหนะโดบแสดงถึงมิติของรถรวมสิ่งของบรรทุก (กว้าง, ยาว, สูง) น้ำหนักลงเพลา เมื่อมีการบรรทุกสิ่งของแล้ว</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>กรณีที่มีชิ้นส่วนสำเร็จรูปจำนวนมากให้แสดงจำนวนชิ้น ขนาดมิติ และน้ำหนัก พร้อมจำนวนเที่ยวที่ต้องการขนส่ง</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รูปแบบยานพาหนะโดยมีรัศมีวงเลี้ยว</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานที่อยู่ในเส้นทางที่ต้องการขออนุญาต เมื่อมีการบรรทุกน้ำหนักแล้ว</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>หนังสือรับรองของวิศวกรโยธาผู้คำนวนโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยวพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>รูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง (ถ้ามี)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>แผนที่เส้นทางเดินบนทางหลวง (ถ้ามี)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>แผนและระยะเวลาการดำเนินงาน</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-1 w-152'>
              <span>[&nbsp;]</span>
              <p>ที่อยู่และอีเมล์ในการจัดส่งเอกสาร (ถ้ามี)</p>
            </div>
            <div>
              <span>จำนวน</span>
              <span className="inline-block w-12 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
              <span>ชุด</span>
            </div>
          </div>
          <div className='text-right mr-16 mt-8'>
            <div>
              <span>ลงชื่อ</span>
              <span className="inline-block w-52 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>
            </div>
            <div>
              <span className='invisible'>ลงชื่อ</span>
              (<span className="inline-block w-52 border-b border-dotted border-black mx-1 text-center">&nbsp;</span>)
            </div>
            <div>
              <span className='invisible'>ลงชื่อ</span>
              <span className="inline-block w-52 mx-1 text-center">ผู้ขออนุญาต</span>
            </div>
          </div>
        </div>
      </Page>
    </Document>
  )
}

export default React.memo<Props>(CheckList)
