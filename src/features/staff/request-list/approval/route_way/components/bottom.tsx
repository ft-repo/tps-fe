import React from 'react';

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

const Bottom = () => {
    return (
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
                overflow: 'hidden',
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
    );
}

export default Bottom;