import React from 'react';
import Top from '../components/top';
import Bottom from '../components/bottom';

const ApprovalRoutePage = () => {
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

                { /* top */ }
                <Top/>

                {/* รายการประเมินเส้นทาง */}
                <Bottom/>
            </div>
        </div>
    );
}

export default ApprovalRoutePage