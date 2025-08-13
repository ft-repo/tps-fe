import React, { useState, useEffect } from 'react';

const Right = () => {
  const [activeTab, setActiveTab] = useState('หนังสือมอบอำนาจ');
  const [data, setData] = useState({
    'หนังสือมอบอำนาจ': null,
    'หนังสือวิศวะเครื่องกล': null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      // ในอนาคต ให้เปลี่ยนโค้ดตรงนี้เป็นการเรียก API จริง
      // เช่น const response = await fetch(`your-api-endpoint/${activeTab}`);
      // const result = await response.json();
      
      // ตอนนี้ใช้ setTimeout เพื่อจำลองการเรียก API
      setTimeout(() => {
        // จำลองข้อมูลจาก API
        const mockData = {
          'หนังสือมอบอำนาจ': null, // ใส่ URL รูปภาพจริงที่นี่เมื่อมี API
          'หนังสือวิศวะเครื่องกล': null, // ใส่ URL รูปภาพจริงที่นี่เมื่อมี API
        };
        
        setData(mockData);
        setIsLoading(false);
      }, 1500); // จำลองการโหลด 1.5 วินาที
    };
    
    fetchData();
  }, [activeTab]); // useEffect จะทำงานทุกครั้งที่ activeTab เปลี่ยน

  const isPowerOfAttorneyActive = activeTab === 'หนังสือมอบอำนาจ';
  const imageUrl = data[activeTab];
  const notFoundMessage = isPowerOfAttorneyActive
    ? 'ไม่พบรูปภาพหนังสือมอบอำนาจ'
    : 'ไม่พบรูปภาพหนังสือวิศวะเครื่องกล';

  return (
    <div style={{ width: '65%', marginRight: '20px' }}>
      <div style={{ display: 'flex', position: 'absolute', top: '9.3%', left: '36%', zIndex: 99 }}>
        <div
          onClick={() => handleTabClick('หนังสือมอบอำนาจ')}
          style={{
            width: '200px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: isPowerOfAttorneyActive ? '#1F74AA' : '#5A9BC3',
            color: 'white',
            fontSize: '16px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        >
          หนังสือมอบอำนาจ
        </div>

        <div
          onClick={() => handleTabClick('หนังสือวิศวะเครื่องกล')}
          style={{
            width: '200px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: !isPowerOfAttorneyActive ? '#1F74AA' : '#5A9BC3',
            color: '#ffffff',
            fontSize: '16px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        >
          หนังสือวิศวะเครื่องกล
        </div>
      </div>

      <div
        style={{
          fontFamily: 'Sarabun, sans-serif',
          backgroundColor: '#1F74AA',
          borderTopRightRadius: '25px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          marginTop: '4rem',
        }}
      >
        <div
          style={{
            color: '#333',
            backgroundColor: '#ffffff',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <div style={{ color: '#999', fontSize: '32px' }}>กำลังโหลด...</div>
          ) : error ? (
            <div style={{ color: 'red', fontSize: '24px' }}>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={activeTab}
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ccc',
                padding: '10px',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div style={{ color: '#999', fontSize: '32px' }}>{notFoundMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Right;