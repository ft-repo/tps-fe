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

// ข้อมูลสำหรับแสดงผลในตารางและปุ่มต่างๆ
const roadInfo = {
  mainTitle: "ทางหลวงชนบทหมายเลข อย.3035 - ทางหลวงชนบทหมายเลข รย.2043",
  subtitle: "แยกทางหลวงหมายเลข 35 (กม.ที่ 30+500) - แยกทางหลวงหมายเลข 43 (กม.ที่ 20+100)",
  summaryButtons: [
    { label: "ตารางสรุป", count: 25, active: true },
    { label: "สะพาน", count: 14 },
    { label: "โครงสร้าง", count: 8 },
    { label: "รัศมีเลี้ยว", count: 3 },
  ],
  tableData: [
    { type: "สะพานทั้งหมด", total: 14, passed: 12, failed: 2 },
    { type: "โครงสร้างทั้งหมด", total: 8, passed: 8, failed: 0 },
    { type: "รัศมีเลี้ยวทั้งหมด", total: 3, passed: 3, failed: 0 },
    { type: "จุดซ่อม / ภัยพิบัติ", total: 0, passed: 0, failed: 0 },
  ],
};

// การกำหนด Props สำหรับ Component (ตอนนี้ยังไม่มี Props ที่รับเข้ามา)
interface Props { }

// Component หลัก
const ApprovalRouteIndex: React.FC<Props> = (props) => {
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
          padding: '15px 20px 15px 20px',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F74AA', width: '85%' }}>
            ตรวจสอบเอกสาร
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
            }}>ข้อมูลเส้นทาง (รถคู่ที่ 1)</div>
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
                  style={{ marginRight: '5px', marginBottom: '10px' }}
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

          {/* Main Form Content (แผนที่) */}
          <div style={{
            fontFamily: 'Sarabun, sans-serif', // ใช้ฟอนต์ Sarabun (หากติดตั้งในระบบ) หรือ sans-serif ทั่วไป
            backgroundColor: '#1F74AA',
            borderRadius: '25px',
            width: '65%',
            height: '100%',
            padding: '2rem',
            marginRight: '20px',
          }}>
            <div style={{
              fontFamily: 'Sarabun, sans-serif', // ใช้ฟอนต์ Sarabun (หากติดตั้งในระบบ) หรือ sans-serif ทั่วไป
              color: '#333',
              backgroundColor: '#ffffff',
              width: '100%',
              height: '100%',
              borderRadius: '25px'
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
                  paddingTop: '20%',
                }}>
                  ไม่พบเส้นทาง
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{
          fontFamily: 'Sarabun, sans-serif',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
        }}>
          <div style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden', // Ensures border-radius applies to child elements
          }}>
            {/* Header Title: รายการประเมินเส้นทาง */}
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '##1C649E',
              padding: '20px 0px 20px 0px',
            }}>
              รายการประเมินเส้นทาง
            </div>

            {/* Main Card Container */}
            <div style={{
              backgroundColor: '#2b77aa', // Dark blue background for the card
              padding: '20px 40px 20px 40px',
              color: 'white',
              position: 'relative',
              borderRadius: '20px',
              zIndex: 1,
            }}>
              {/* Card Header with Title and Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                flexWrap: 'wrap', // Allow wrapping on smaller screens
                gap: '15px', // Spacing between items
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  flexGrow: 1,
                  minWidth: '200px',
                }}>
                  {roadInfo.mainTitle}
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}>
                  {roadInfo.summaryButtons.map((button, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: button.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '5px',
                        padding: '8px 15px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        whiteSpace: 'nowrap',
                        color: 'white',
                      }}
                    >
                      {button.label}
                      {button.count !== undefined && (
                        <span style={{
                          backgroundColor: '#e74c3c', // Red background for count
                          color: 'white',
                          borderRadius: '15%',
                          padding: '2px 7px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          lineHeight: '1',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minWidth: '18px',
                          minHeight: '26px',
                        }}>
                          {button.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Card Subtitle */}
              <div style={{
                fontSize: '13px',
                opacity: 0.9,
                marginBottom: '15px',
                maxWidth: '80%',
              }}>
                {roadInfo.subtitle}
              </div>

              {/* Table Container */}
              <div style={{
                backgroundColor: '#2f81b8', // Slightly lighter blue for table background
                borderRadius: '0 0 8px 8px', // Rounded corners only at the bottom
                overflow: 'hidden', // Essential for border-radius on last row
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'white',
                  fontSize: '14px',
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        backgroundColor: '#FFFFFFCC',
                        fontWeight: 'bold',
                        padding: '12px 20px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color: '#1F74AA',
                      }}>ประเภท</th>
                      <th style={{
                        backgroundColor: '#FFFFFFCC',
                        fontWeight: 'bold',
                        padding: '12px 20px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color: '#1F74AA',
                      }}>รวมทั้งหมด</th>
                      <th style={{
                        backgroundColor: '#FFFFFFCC',
                        fontWeight: 'bold',
                        padding: '12px 20px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color: '#1F74AA',
                      }}>ผ่านได้</th>
                      <th style={{
                        backgroundColor: '#FFFFFFCC',
                        fontWeight: 'bold',
                        padding: '12px 20px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color: '#1F74AA',
                      }}>ผ่านไม่ได้</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadInfo.tableData.map((row, index) => (
                      <tr key={index}>
                        <td style={{
                          padding: '12px 20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: index === roadInfo.tableData.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{row.type}</td>
                        <td style={{
                          padding: '12px 20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: index === roadInfo.tableData.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{row.total}</td>
                        <td style={{
                          padding: '12px 20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: index === roadInfo.tableData.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{row.passed}</td>
                        <td style={{
                          padding: '12px 20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: index === roadInfo.tableData.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}>{row.failed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ใช้ React.memo เพื่อป้องกันการ re-render โดยไม่จำเป็น หาก props ไม่ได้เปลี่ยน
export default React.memo<Props>(ApprovalRouteIndex);