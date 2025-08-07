import React, { useState } from 'react'

// ข้อมูลยานพาหนะ (รถคู่ที่ 1)
interface VehicleInfo {
    vehicleType: string;
    turningRadius: string;
    emptyWeight: string;
    axleWeight: string;
    vehicleDimension: string;
    loadedDimension: string;
}

const vehicleInfo: VehicleInfo = {
    vehicleType: "รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร",
    turningRadius: "12",
    emptyWeight: "27,900",
    axleWeight: "57,000",
    vehicleDimension: "กว้าง 3.50 X ยาว 9.00 X สูง 4.30",
    loadedDimension: "กว้าง 3.50 X ยาว 9.00 X สูง 4.96",
};


// ข้อมูลรถลากจูง
interface TractorVehicleInfo {
    registrationNumber: string;
    weight: string;
    axleWeight: string;
}

const tractorVehicleInfo: TractorVehicleInfo = {
    registrationNumber: "22 - 1144 สระบุรี",
    weight: "15,000",
    axleWeight: "5000 : 5000 : 5000",
};

// ข้อมูลรถกึ่งพ่วง 4 เพลา 8
interface SemiTrailerInfo {
    registrationNumber: string;
    weight: string;
    axleWeight: string;
}

const semiTrailerInfo: SemiTrailerInfo = {
    registrationNumber: "83 - 9120 สระบุรี",
    weight: "28,000",
    axleWeight: "7000 : 7000 : 7000 : 7000",
};

// ข้อมูลเครื่องจักร
interface MachineryInfo {
    registrationNumber: string;
    weight: string;
}

const machineryInfo: MachineryInfo = {
    registrationNumber: "68 - 1181 สระบุรี",
    weight: "35,800",
};

const getVehicleLabel = (key: keyof VehicleInfo): string => {
    switch (key) {
        case 'vehicleType': return 'ประเภทจับคู่';
        case 'turningRadius': return 'รัศมีเลี้ยว';
        case 'emptyWeight': return 'น้ำหนักรถเปล่า (กิโลกรัม)';
        case 'axleWeight': return 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา\n(กิโลกรัม)';
        case 'vehicleDimension': return 'มิติรถเปล่า (เมตร)';
        case 'loadedDimension': return 'มิติรถเปล่ารวมสินค้า\nเครื่องจักร (เมตร)';
        default: return key;
    }
};

const getTractorLabel = (key: keyof TractorVehicleInfo): string => {
    switch (key) {
        case 'registrationNumber': return 'เลขทะเบียน / เลขตัวรถ';
        case 'weight': return 'น้ำหนัก (กิโลกรัม)';
        case 'axleWeight': return 'น้ำหนักลงเพลา (กิโลกรัม)';
        default: return key;
    }
};

const getSemiTrailerLabel = (key: keyof SemiTrailerInfo): string => {
    switch (key) {
        case 'registrationNumber': return 'เลขทะเบียน / เลขตัวรถ';
        case 'weight': return 'น้ำหนัก (กิโลกรัม)';
        case 'axleWeight': return 'น้ำหนักลงเพลา (กิโลกรัม)';
        default: return key;
    }
};

const getMachineryLabel = (key: keyof MachineryInfo): string => {
    switch (key) {
        case 'registrationNumber': return 'เลขทะเบียน / เลขตัวรถ';
        case 'weight': return 'น้ำหนัก (กิโลกรัม)';
        default: return key;
    }
};

const Left = () => {
    const [approvalStatus, setApprovalStatus] = useState<string>('approved');
    const [signStatus, setSignStatus] = useState<string>('approved');
    const [comment, setComment] = useState<string>('');

    const handleApprovalStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApprovalStatus(event.target.value);
    };

    const handleSignStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignStatus(event.target.value);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    return (
        <div style={{
            width: '35%',
            padding: '20px',
            backgroundColor: '#fcfcfc',
            flexShrink: 0,
        }}>
            {/* ส่วน "ข้อมูลยานพาหนะ (รถคู่ที่ 1)" */}
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1F74AA',
                marginBottom: '15px',
                paddingBottom: '5px',
            }}>
                ข้อมูลยานพาหนะ(รถคู่ที่ 1)
            </div>
            {
                Object.entries(vehicleInfo).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#1F74AA',
                            marginBottom: '2px',
                            width: '200px',
                            flexShrink: 0,
                            whiteSpace: 'pre-line',
                        }}>
                            {getVehicleLabel(key as keyof VehicleInfo)}
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
                ))
            }

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลรถลากจูง" */}
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1F74AA',
                paddingBottom: '5px',
            }}>
                ข้อมูลรถลากจูง
            </div>
            {
                Object.entries(tractorVehicleInfo).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#1F74AA',
                            marginBottom: '2px',
                            width: '200px',
                            flexShrink: 0,
                            whiteSpace: 'pre-line',
                        }}>
                            {getTractorLabel(key as keyof TractorVehicleInfo)}
                        </div>
                        <div style={{
                            fontSize: '14px',
                            color: '#1F74AA',
                            padding: '5px 0',
                            minHeight: '20px',
                            wordBreak: 'break-word',
                            flexGrow: 1,
                        }}>
                            {value}
                        </div>
                    </div>
                ))
            }

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลรถกึ่งพ่วง 4 เพลา 8" */}
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1F74AA',
                paddingBottom: '5px',
            }}>
                ข้อมูลรถกึ่งพ่วง 4 เพลา 8
            </div>
            {
                Object.entries(semiTrailerInfo).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#1F74AA',
                            marginBottom: '2px',
                            width: '200px',
                            flexShrink: 0,
                            whiteSpace: 'pre-line',
                        }}>
                            {getSemiTrailerLabel(key as keyof SemiTrailerInfo)}
                        </div>
                        <div style={{
                            fontSize: '14px',
                            color: '#1F74AA',
                            padding: '5px 0',
                            minHeight: '20px',
                            wordBreak: 'break-word',
                            flexGrow: 1,
                        }}>
                            {value}
                        </div>
                    </div>
                ))
            }

            <div style={{ marginBottom: '25px', }}></div>

            {/* ส่วน "ข้อมูลเครื่องจักร" */}
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1F74AA',
                paddingBottom: '5px',
            }}>
                ข้อมูลเครื่องจักร
            </div>
            {
                Object.entries(machineryInfo).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'baseline' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#1F74AA',
                            marginBottom: '2px',
                            width: '200px',
                            flexShrink: 0,
                            whiteSpace: 'pre-line',
                        }}>
                            {getMachineryLabel(key as keyof MachineryInfo)}
                        </div>
                        <div style={{
                            fontSize: '14px',
                            color: '#1F74AA',
                            padding: '5px 0',
                            minHeight: '20px',
                            wordBreak: 'break-word',
                            flexGrow: 1,
                        }}>
                            {value}
                        </div>
                    </div>
                ))
            }


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
            <div style={{ position: 'relative', marginBottom: '15px' }}>
                <textarea
                    placeholder="ข้อความตอบกลับ..."
                    value={comment}
                    onChange={handleCommentChange}
                    style={{
                        width: '100%',
                        minHeight: '120px',
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
                    backgroundColor: '#1F74AA',
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
                    backgroundColor: '#a9a9a9',
                    color: 'white',
                }}>ล้างข้อมูล</button>
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
    )
}

export default Left