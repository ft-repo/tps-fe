import React, { useState } from 'react';

// กำหนดข้อมูลสมมุติสำหรับส่วน "ข้อมูลเส้นทาง (รถคู่ที่ 1)"
interface RouteData {
    startLocation: string;  // เดิม latitude
    endLocation: string;    // เดิม longitude
}

const routeData: RouteData = {
    startLocation: "18.7883, 98.9853 จังหวัดพระนครศรีอยุธยา",
    endLocation: "12.6814, 101.2775 จังหวัดระยอง",
};


// กำหนดข้อมูลสมมุติสำหรับส่วน "เส้นทาง"
interface RouteImageData {
    mapImageUrl?: string; // เก็บลิงก์ภาพเส้นทาง/แผนที่
}

const routeImageData: RouteImageData = {
    mapImageUrl: "", // ถ้าว่างจะขึ้น "ไม่พบเส้นทาง"
};

const Top = () => {
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

    const getRouteLabel = (key: keyof RouteData) => {
        switch (key) {
            case 'startLocation': return 'ขนส่งจาก';
            case 'endLocation': return 'ไปยัง';
            default: return key;
        }
    };

    return (
        <div style={{ display: 'flex', flexGrow: 1 }}>
            {/* Left Sidebar */}
            <div style={{
                width: '35%',
                padding: '20px',
                backgroundColor: '#fcfcfc',
                flexShrink: 0, // ไม่ให้ Sidebar หด
            }}>
                {/* ส่วน "ข้อมูลเส้นทาง (รถคู่ที่ 1)" */}
                <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1F74AA',
                    marginBottom: '15px',
                    paddingBottom: '5px',
                }}>ข้อมูลเส้นทาง (รถคู่ที่ 1)</div>
                {Object.entries(routeData).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#1F74AA',
                            marginBottom: '2px',
                            minWidth: '140px',
                            flexShrink: 0,
                        }}>
                            {getRouteLabel(key as keyof RouteData)}
                        </div>
                        <div style={{
                            fontSize: '14px',
                            color: '#1F74AA',
                            padding: '5px 0',
                            minHeight: '20px',
                            wordBreak: 'break-word',
                            flexGrow: 1,
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

            {/* Right (แผนที่) */}
            <div style={{
                fontFamily: 'Sarabun, sans-serif',
                backgroundColor: '#1F74AA',
                borderRadius: '25px',
                width: '65%',
                height: '100%',
                padding: '2rem',
                marginRight: '20px',
            }}>
                <div style={{
                    fontFamily: 'Sarabun, sans-serif',
                    color: '#333',
                    backgroundColor: '#ffffff',
                    width: '100%',
                    height: '100%',
                    borderRadius: '25px'
                }}>
                    {routeImageData.mapImageUrl ? (
                        <img
                            src={routeImageData.mapImageUrl}
                            alt="เส้นทาง"
                            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', padding: '10px' }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.style.display = 'none';
                                const fallbackText = document.createElement('div');
                                fallbackText.textContent = 'ไม่พบเส้นทาง';
                                fallbackText.style.color = '#999';
                                fallbackText.style.fontSize = '16px';
                                fallbackText.style.marginTop = '10px';
                                target.parentNode?.appendChild(fallbackText);
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
    );
}

export default Top;