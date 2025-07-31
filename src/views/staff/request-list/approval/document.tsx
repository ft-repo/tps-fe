import React, { useState } from 'react';

// กำหนดข้อมูลสมมุติสำหรับส่วน "ข้อมูลผู้ประสานงาน"
interface ContactData {
  companyName: string;
  legalEntityType: string;
  companyAddress: string;
  companyRegistrationNo: string;
  companyPhone: string;
  contactPerson: string;
  contactPersonPhone: string;
  projectName: string;
  permitType: string;
  submissionDate: string;
  expiryDate: string;
  latitude: string;
  longitude: string;
}

const contactData: ContactData = {
  companyName: "ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด",
  legalEntityType: "ห้างหุ้นส่วนสามัญนิติบุคคล",
  companyAddress: "บ้านเลขที่ 99/1 หมู่ที่ 5 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120",
  companyRegistrationNo: "0105557001234",
  companyPhone: "02-123-4567",
  contactPerson: "ชญานิษฐ์ พงศ์เกษมชัย",
  contactPersonPhone: "094-2223344",
  projectName: "โครงการระบบโลจิสติกส์เพื่อการเคลื่อนย้ายเครื่องจักรกลหนัก",
  permitType: "รถหมวด 2 ( 4 - 7 เพลา ) ",
  submissionDate: "01 มี.ค. 64",
  expiryDate: "01 มี.ค. 65",
  latitude: "18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา",
  longitude: "12.6814, 101.2775 จังหวัดระยองง",
};

// กำหนดข้อมูลสมมุติสำหรับส่วน "หนังสือมอบอำนาจ"
interface ApprovalFormData {
  formLocation: string;
  formDate: string;
  authorizerName: string;
  authorizerID: string;
  authorizerAddress: string;
  authorizerPhone: string;
  authorizerCompanyRegDate: string;
  authorizedPersonName: string;
  authorizedPersonID: string;
  authorizedPersonAddress: string;
  authorizedPersonPhone: string;
}

const approvalFormData: ApprovalFormData = {
  formLocation: "บางบ่อ",
  formDate: "01 สิงหาคม 2568", // เปลี่ยนเป็นวันที่จริงที่ต้องการ
  authorizerName: "บริษัท ตัวอย่าง จำกัด", // (ชื่อและประเภทนิติบุคคล)
  authorizerOfficeAddress: "สำนักงานใหญ่ตั้งอยู่เลขที่ 123", // สำนักงานใหญ่ตั้งอยู่เลขที่
  authorizerAlley: "ซอย 1", // ตรอก/ซอย
  authorizerRoad: "ถนนสุขุมวิท", // ถนน
  authorizerMoo: "4", // หมู่ที่
  authorizerSubdistrict: "บางบ่อ", // ตำบล/แขวง
  authorizerDistrict: "บางบ่อ", // อำเภอ/เขต
  authorizerProvince: "สมุทรปราการ", // จังหวัด
  authorizerID: "1234567890123", // เลขที่หนังสือรับรอง
  authorizerCompanyRegDate: "01/01/2560", // วันที่จดทะเบียนบริษัท
  authorizedPersonName: "นายสมชาย ใจดี", // ผู้รับมอบอำนาจ
};

// การกำหนด Props สำหรับ Component (ตอนนี้ยังไม่มี Props ที่รับเข้ามา)
interface Props { }

// Component หลัก
const ApprovalDocumentIndex: React.FC<Props> = (props) => {
  const [day, month, year] = approvalFormData.formDate.split(' ');

  // State สำหรับการเลือกสถานะการตรวจสอบ (ผ่าน/ไม่ผ่าน)
  const [approvalStatus, setApprovalStatus] = useState<string>('approved'); // ค่าเริ่มต้น 'approved'

  // State สำหรับข้อความคอมเมนต์
  const [comment, setComment] = useState<string>('');

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ Radio Button
  const handleApprovalStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApprovalStatus(event.target.value);
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ Textarea
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Helper สำหรับ Map keys ของ contactData ไปเป็นชื่อภาษาไทยที่แสดงผล
  const getContactLabel = (key: keyof ContactData) => {
    switch (key) {
      case 'companyName': return 'ชื่อบริษัท / ห้าง / ร้าน';
      case 'legalEntityType': return 'ประเภทนิติบุคคล';
      case 'companyAddress': return 'ที่อยู่บริษัท';
      case 'companyRegistrationNo': return 'เลขทะเบียนนิติบุคคล';
      case 'companyPhone': return 'เบอร์โทรสำนักงาน';
      case 'contactPerson': return 'ผู้ติดต่อ / ผู้มอบอำนาจ';
      case 'contactPersonPhone': return 'เบอร์โทรศัพท์';
      case 'projectName': return 'ชื่อโครงการ';
      case 'permitType': return 'ประเภทการขออนุญาต';
      case 'submissionDate': return 'วันที่เริ่มต้น';
      case 'expiryDate': return 'วันที่สิ้นสุด';
      case 'latitude': return 'ขนส่งจาก';
      case 'longitude': return 'ไปยัง';
      default: return key;
    }
  };

  return (
    // Container หลักของหน้า (พื้นหลังสีเทาอ่อน)
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#1F74AA',
    }}>
      {/* Panel เอกสาร (พื้นหลังสีขาว มีเงา) */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header ส่วนบนสุด */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '15px 20px 0px 20px',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F74AA', width: '34.6%' }}>
            ตรวจสอบเอกสาร
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            overflow: 'hidden',
            width: '50.4%',
          }}>
            <div style={{
              width: '200px',           // กำหนดความกว้างกล่อง
              height: '60px',           // กำหนดความสูงกล่อง
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#1F74AA', // Active tab
              color: 'white',
              fontSize: '16px',         // เพิ่มขนาดตัวอักษร
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}>
              หนังสือมอบอำนาจ
            </div>

            <div style={{
              width: '200px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#5A9BC3',
              color: '#ffffff',
              fontSize: '16px',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}>
              หนังสือวิศวะเครื่องกล
            </div>
          </div>

          {/* ปุ่ม Export to PDF */}
          <div style={{ width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <button style={{
              backgroundColor: '#1F74AA',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
              Export to PDF
            </button>
          </div>
        </div>

        {/* Content Area (แบ่งเป็น Sidebar ซ้าย และ Main Content ขวา) */}
        <div style={{ display: 'flex', flexGrow: 1 }}>
          {/* Left Sidebar */}
          <div style={{
            width: '35%',
            borderRight: '1px solid #eee',
            padding: '20px',
            backgroundColor: '#fcfcfc',
            flexShrink: 0, // ไม่ให้ Sidebar หด
          }}>
            {/* ส่วน "ข้อมูลผู้ประสานงาน" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
              marginBottom: '15px',
              paddingBottom: '5px',
              // ไม่มี borderBottom เหมือนภาพแรก
            }}>ข้อมูลผู้ประสานงาน</div>
            {Object.entries(contactData).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  marginBottom: '2px',
                  minWidth: '140px', // กำหนดความกว้างขั้นต่ำสำหรับ Label
                  flexShrink: 0, // ไม่ให้หด
                }}>
                  {getContactLabel(key as keyof ContactData)}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  padding: '5px 0',
                  // ไม่มี borderBottom เหมือนภาพแรก
                  minHeight: '20px',
                  wordBreak: 'break-word',
                  flexGrow: 1, // ให้ขยายเต็มพื้นที่ที่เหลือ
                }}>{value}</div>
              </div>
            ))}

            {/* ส่วน "ผลการตรวจสอบ" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA',
              marginTop: '30px',
              marginBottom: '15px',
              paddingBottom: '5px',
            }}>
              ผลการตรวจสอบ
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                color: '#1F74AA'
              }}>
                <input
                  type="radio"
                  name="approvalStatus"
                  value="approved"
                  checked={approvalStatus === 'approved'}
                  onChange={handleApprovalStatusChange}
                  style={{ marginRight: '5px' }}
                />
                ผ่านการตรวจสอบ
              </label>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#1F74AA'
              }}>
                <input
                  type="radio"
                  name="approvalStatus"
                  value="rejected"
                  checked={approvalStatus === 'rejected'}
                  onChange={handleApprovalStatusChange}
                  style={{ marginRight: '5px' }}
                />
                ไม่ผ่านการตรวจสอบ
              </label>
            </div>

            {/* Textarea สำหรับคอมเมนต์ */}
            <div style={{ position: 'relative', marginBottom: '15px' }}> {/* เพิ่ม div ครอบเพื่อตำแหน่งปุ่ม "เพิ่มไฟล์" */}
              <textarea
                placeholder="ข้อความตอบกลับ..." // เปลี่ยน placeholder ตามภาพที่สอง
                value={comment}
                onChange={handleCommentChange}
                style={{
                  width: '100%',
                  minHeight: '120px', // เพิ่มความสูงตามภาพที่สอง
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              ></textarea>
              {/* ปุ่ม "เพิ่มไฟล์" */}
              <button style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: '#1F74AA', // สีฟ้าตามภาพที่สอง
                color: 'white',
                padding: '8px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
              }}>เพิ่มไฟล์</button>
            </div>
            {/* ปุ่มบันทึกข้อมูล */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '40%' }}>
              <button style={{
                padding: '10px 15px',
                border: '0px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                width: '50%',
                backgroundColor: '#a9a9a9', // สีเทาตามภาพที่สอง
                color: 'white', // สีขาวตามภาพที่สอง
              }}>ล้างข้อมูล</button> {/* เปลี่ยนข้อความเป็น "ล้างข้อมูล" ตามภาพที่สอง */}
              <button style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                width: '50%',
                backgroundColor: '#47BAA3',
                color: 'white',
              }}>บันทึก</button>
            </div>
          </div>

          {/* Main Form Content (หนังสือมอบอำนาจ) */}
          <div style={{
            fontFamily: 'Sarabun, sans-serif', // ใช้ฟอนต์ Sarabun (หากติดตั้งในระบบ) หรือ sans-serif ทั่วไป
            backgroundColor: '#1F74AA',
            borderTopLeftRadius: '0px',     // มุมบนซ้าย
            borderTopRightRadius: '25px',    // มุมบนขวา
            borderBottomRightRadius: '0px',  // มุมล่างขวา
            borderBottomLeftRadius: '0px',   // มุมล่างซ้าย            
            width: '65%',
            padding: '2rem',
          }}>
            <div style={{
              fontFamily: 'Sarabun, sans-serif', // ใช้ฟอนต์ Sarabun (หากติดตั้งในระบบ) หรือ sans-serif ทั่วไป
              color: '#333',
              backgroundColor: '#ffffff',
              height: '100vh',
              width: '100%',
            }}>
              {approvalFormData.imageUrl ? (
                <img
                  src={approvalFormData.imageUrl}
                  alt="หนังสือมอบอำนาจ"
                  style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', padding: '10px' }}
                  onError={(e) => {
                    e.target.onerror = null; // ป้องกันลูป onError
                    e.target.style.display = 'none'; // ซ่อนรูป
                    const fallbackText = document.createElement('div');
                    fallbackText.textContent = 'รูปภาพหนังสือมอบอำนาจ';
                    fallbackText.style.color = '#999';
                    fallbackText.style.fontSize = '16px';
                    fallbackText.style.marginTop = '10px';
                    e.target.parentNode.appendChild(fallbackText);
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '32px',
                  paddingTop: '45%',
                }}>
                  ไม่พบรูปภาพหนังสือมอบอำนาจ
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ใช้ React.memo เพื่อป้องกันการ re-render โดยไม่จำเป็น หาก props ไม่ได้เปลี่ยน
export default React.memo<Props>(ApprovalDocumentIndex);