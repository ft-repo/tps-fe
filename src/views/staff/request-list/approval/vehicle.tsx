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
  companyName: "รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร",
  legalEntityType: "12",
  companyAddress: "27,900",
  companyRegistrationNo: "57,000",
  companyPhone: "กว้าง 3.50 X ยาว 9.00 X สูง 4.30",
  contactPerson: "กว้าง 3.50 X ยาว 9.00 X สูง 4.96",
};

const contactData02: ContactData02 = {
  companyName: "22 - 1144 สระบุรี",
  legalEntityType: "15,000",
  companyAddress: "5000 : 5000 : 5000",
};

const contactData03: ContactData03 = {
  companyName: "83 - 9120 สระบุรี",
  legalEntityType: "28,000",
  companyAddress: "7000 : 7000 : 7000 : 7000",
};

const contactData04: ContactData04 = {
  companyName: "68 - 1181 สระบุรี",
  legalEntityType: "35,800",
};

// Component สำหรับแสดงหมวดหมู่สินค้าแต่ละอัน
const CategoryCard = ({ title, imageUrl, altText }) => {
  // สไตล์สำหรับ CategoryCard
  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    // กำหนดความสูงคงที่สำหรับ Card เพื่อให้ขนาดเท่ากันหมด
    height: '280px', // ปรับความสูงตามความเหมาะสมกับพื้นที่
  };

  // สไตล์สำหรับส่วนรูปภาพ/Data not found
  const imageContainerStyle = {
    width: '100%',
    height: '180px', // กำหนดความสูงคงที่สำหรับส่วนรูปภาพ
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: imageUrl ? 'transparent' : '#f0f0f0', // เปลี่ยนพื้นหลังเมื่อไม่มีรูปภาพ
    overflow: 'hidden', // ซ่อนส่วนเกินของรูปภาพ
  };

  // สไตล์สำหรับรูปภาพ
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // ครอบคลุมพื้นที่และตัดส่วนเกิน
  };

  // สไตล์สำหรับ "Data not found"
  const dataNotFoundStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // ให้เต็มพื้นที่
    height: '100%', // ให้เต็มพื้นที่
    color: '#666',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  };

  // สไตล์สำหรับไอคอน
  const iconStyle = {
    fontSize: '48px',
    marginBottom: '10px',
  };

  // สไตล์สำหรับชื่อหมวดหมู่
  const titleStyle = {
    padding: '15px',
    fontSize: '1.0em', // ปรับขนาดฟอนต์เล็กน้อย
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    borderTop: '1px solid #e0e0e0',
    color: '#333',
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        {/* ถ้ามี imageUrl ให้แสดงรูปภาพ มิฉะนั้นให้แสดงข้อความ "Data not found" */}
        {imageUrl ? (
          <img src={imageUrl} alt={altText} style={imgStyle} />
        ) : (
          <div style={dataNotFoundStyle}>
            {/* ต้องมั่นใจว่า Material Icons พร้อมใช้งานในโปรเจกต์ของคุณ */}
            <span className="material-icons-outlined" style={iconStyle}>
              description
            </span>
            <p>Data not found</p>
          </div>
        )}
      </div>
      <div style={titleStyle}>{title}</div>
    </div>
  );
};

// ข้อมูลจำลองสำหรับหมวดหมู่ (สามารถดึงมาจาก API ได้ในกรณีจริง)
const categories = [
  {
    id: 1,
    title: 'รถลากจูง',
    imageUrl: 'http://googleusercontent.com/file_content/0', // URL รูปภาพรถลากจูง
    altText: 'รถลากจูง HINO'
  },
  {
    id: 2,
    title: 'รถพ่วง',
    imageUrl: 'https://via.placeholder.com/300x200?text=Trailer', // แทนที่ด้วย URL รูปภาพรถพ่วงจริง
    altText: 'รถพ่วง'
  },
  {
    id: 3,
    title: 'เครื่องจักร',
    imageUrl: 'https://via.placeholder.com/300x200?text=Machinery', // แทนที่ด้วย URL รูปภาพเครื่องจักรจริง
    altText: 'เครื่องจักรกลหนัก'
  },
  {
    id: 4,
    title: 'รูปแบบที่แสดงถึง รถลากจูง', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'รถลากจูง - ไม่มีข้อมูล'
  },
  {
    id: 5,
    title: 'รูปแบบที่แสดงถึง รถพ่วง', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'รถพ่วง - ไม่มีข้อมูล'
  },
  {
    id: 6,
    title: 'รูปแบบที่แสดงถึง สินค้า / เครื่องจักร', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'สินค้า / เครื่องจักร - ไม่มีข้อมูล'
  },
  {
    id: 7,
    title: 'รถลากจูง',
    imageUrl: 'http://googleusercontent.com/file_content/0', // URL รูปภาพรถลากจูง
    altText: 'รถลากจูง HINO'
  },
  {
    id: 8,
    title: 'รถพ่วง',
    imageUrl: 'https://via.placeholder.com/300x200?text=Trailer', // แทนที่ด้วย URL รูปภาพรถพ่วงจริง
    altText: 'รถพ่วง'
  },
  {
    id: 9,
    title: 'เครื่องจักร',
    imageUrl: 'https://via.placeholder.com/300x200?text=Machinery', // แทนที่ด้วย URL รูปภาพเครื่องจักรจริง
    altText: 'เครื่องจักรกลหนัก'
  },
  {
    id: 10,
    title: 'รูปแบบที่แสดงถึง รถลากจูง', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'รถลากจูง - ไม่มีข้อมูล'
  },
  {
    id: 11,
    title: 'รูปแบบที่แสดงถึง รถพ่วง', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'รถพ่วง - ไม่มีข้อมูล'
  },
  {
    id: 12,
    title: 'รูปแบบที่แสดงถึง สินค้า / เครื่องจักร', // ชื่อหมวดหมู่ตามรูปภาพ
    imageUrl: null, // ไม่มีรูปภาพสำหรับหมวดหมู่นี้
    altText: 'สินค้า / เครื่องจักร - ไม่มีข้อมูล'
  },
];

// Component หลักสำหรับส่วนแสดงหมวดหมู่ทั้งหมด
const CategorySection = () => {
  // สไตล์สำหรับ container หลัก
  const containerStyle = {
    display: 'grid', // ใช้ CSS Grid เพื่อจัดวาง Card
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 คอลัมน์ ขนาดเท่าๆ กัน
    gap: '20px', // ระยะห่างระหว่าง Card
    padding: '20px 0px 20px 20px',
    // maxWidth: '100%', // ให้เต็มพื้นที่ของ parent div
    margin: '0', // ไม่ต้องจัดกึ่งกลาง เพราะ parent เป็นตัวควบคุมอยู่แล้ว
  };

  return (
    <div style={containerStyle}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id} // key สำหรับการ Render List ใน React
          title={category.title}
          imageUrl={category.imageUrl}
          altText={category.altText}
        />
      ))}
    </div>
  );
};

// การกำหนด Props สำหรับ Component (ตอนนี้ยังไม่มี Props ที่รับเข้ามา)
interface Props { }

// Component หลัก
const ApprovalVehicleIndex: React.FC<Props> = (props) => {

  // State สำหรับการเลือกสถานะการตรวจสอบ (ผ่าน/ไม่ผ่าน)
  const [approvalStatus, setApprovalStatus] = useState<string>('approved');

  const [signStatus, setSignStatus] = useState<string>('approved');

  // State สำหรับข้อความคอมเมนต์
  const [comment, setComment] = useState<string>('');

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ Radio Button
  const handleApprovalStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApprovalStatus(event.target.value);
  };

  const handleSignStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignStatus(event.target.value);
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ Textarea
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Helper สำหรับ Map keys ของ contactData ไปเป็นชื่อภาษาไทยที่แสดงผล
  const getContactLabel = (key: keyof ContactData) => {
    switch (key) {
      case 'companyName': return 'ประเภทจับคู่';
      case 'legalEntityType': return 'รัศมีเลี้ยว';
      case 'companyAddress': return 'น้ำหนักรถเปล่า (กิโลกรัม)';
      case 'companyRegistrationNo': return 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา\n(กิโลกรัม)';
      case 'companyPhone': return 'มิติรถเปล่า (เมตร)';
      case 'contactPerson': return 'มิติรถเปล่ารวมสินค้า\nเครื่องจักร (เมตร)';
      default: return key;
    }
  };

  const getContactLabel02 = (key: keyof ContactData02) => {
    switch (key) {
      case 'companyName': return 'เลขทะเบียน / เลขตัวรถ';
      case 'legalEntityType': return 'น้ำหนัก (กิโลกรัม)';
      case 'companyAddress': return 'น้ำหนักลงเพลา (กิโลกรัม)';
      default: return key;
    }
  };

  const getContactLabel03 = (key: keyof ContactData03) => {
    switch (key) {
      case 'companyName': return 'เลขทะเบียน / เลขตัวรถ';
      case 'legalEntityType': return 'น้ำหนัก (กิโลกรัม)';
      case 'companyAddress': return 'น้ำหนักลงเพลา (กิโลกรัม)';
      default: return key;
    }
  };

  const getContactLabel04 = (key: keyof ContactData04) => {
    switch (key) {
      case 'companyName': return 'เลขทะเบียน / เลขตัวรถ';
      case 'legalEntityType': return 'น้ำหนัก (กิโลกรัม)';
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
            {/* ส่วน "ข้อมูลยานพาหนะ (รถคู่ที่ 1)" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
              marginBottom: '15px',
              paddingBottom: '5px',
              // ไม่มี borderBottom เหมือนภาพแรก
            }}>ข้อมูลยานพาหนะ (รถคู่ที่ 1)</div>
            {Object.entries(contactData).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  marginBottom: '2px',
                  width: '200px', // กำหนดความกว้างขั้นต่ำสำหรับ Label
                  flexShrink: 0, // ไม่ให้หด
                  whiteSpace: 'pre-line',
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

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลยานพาหนะ (รถคู่ที่ 2)" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
              paddingBottom: '5px',
              // ไม่มี borderBottom เหมือนภาพแรก
            }}>ข้อมูลรถลากจูง</div>
            {Object.entries(contactData02).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  marginBottom: '2px',
                  width: '200px', // กำหนดความกว้างขั้นต่ำสำหรับ Label
                  flexShrink: 0, // ไม่ให้หด
                  whiteSpace: 'pre-line',
                }}>
                  {getContactLabel02(key as keyof ContactData02)}
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

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลยานพาหนะ (รถคู่ที่ 3)" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
              paddingBottom: '5px',
              // ไม่มี borderBottom เหมือนภาพแรก
            }}>ข้อมูลรถกึ่งพ่วง 4 เพลา 8</div>
            {Object.entries(contactData03).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  marginBottom: '2px',
                  width: '200px', // กำหนดความกว้างขั้นต่ำสำหรับ Label
                  flexShrink: 0, // ไม่ให้หด
                  whiteSpace: 'pre-line',
                }}>
                  {getContactLabel03(key as keyof ContactData03)}
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

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลเครื่องจักร" */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
              paddingBottom: '5px',
              // ไม่มี borderBottom เหมือนภาพแรก
            }}>ข้อมูลเครื่องจักร</div>
            {Object.entries(contactData04).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                <div style={{
                  fontSize: '13px',
                  color: '#1F74AA', // เปลี่ยนสีเป็นสีฟ้าตามภาพที่สอง
                  marginBottom: '2px',
                  width: '200px', // กำหนดความกว้างขั้นต่ำสำหรับ Label
                  flexShrink: 0, // ไม่ให้หด
                  whiteSpace: 'pre-line',
                }}>
                  {getContactLabel04(key as keyof ContactData04)}
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

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                color: '#1F74AA'
              }}>
                <input
                  type="radio"
                  name="signStatusGroup"
                  value="signed"
                  checked={signStatus === 'signed'}
                  onChange={handleSignStatusChange}
                  style={{ marginRight: '5px', marginBottom: '10px' }}
                />
                มีเอกสารลงนาม
              </label>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                color: '#1F74AA'
              }}>
                <input
                  type="radio"
                  name="signStatusGroup"
                  value="unsigned"
                  checked={signStatus === 'unsigned'}
                  onChange={handleSignStatusChange}
                  style={{ marginRight: '5px' }}
                />
                ไม่มีเอกสารลงนาม
              </label>
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
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            width: '65%',
            marginRight: '20px',
            overflowY: 'auto', // เพิ่ม scrollbar ถ้าเนื้อหาเกิน
          }}>
            <CategorySection />
          </div>
        </div>
      </div>
    </div>
  );
}

// ใช้ React.memo เพื่อป้องกันการ re-render โดยไม่จำเป็น หาก props ไม่ได้เปลี่ยน
export default React.memo<Props>(ApprovalVehicleIndex);