import React from 'react';

// Component สำหรับแสดงหมวดหมู่สินค้าแต่ละอัน
const CategoryCard = ({
    title,
    imageUrl,
    altText,
}: {
    title: string;
    imageUrl: string | null;
    altText: string;
}) => {
    const cardStyle: React.CSSProperties = {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        height: '280px',
    };

    const imageContainerStyle: React.CSSProperties = {
        width: '100%',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: imageUrl ? 'transparent' : '#f0f0f0',
        overflow: 'hidden',
    };

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const dataNotFoundStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: '#666',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    };

    const iconStyle: React.CSSProperties = {
        fontSize: '48px',
        marginBottom: '10px',
    };

    const titleStyle: React.CSSProperties = {
        padding: '15px',
        fontSize: '1.0em',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
        borderTop: '1px solid #e0e0e0',
        color: '#333',
    };

    return (
        <div style={cardStyle}>
            <div style={imageContainerStyle}>
                {imageUrl ? (
                    <img src={imageUrl} alt={altText} style={imgStyle} />
                ) : (
                    <div style={dataNotFoundStyle}>
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
        imageUrl: 'http://googleusercontent.com/file_content/0',
        altText: 'รถลากจูง HINO',
    },
    {
        id: 2,
        title: 'รถพ่วง',
        imageUrl: 'https://via.placeholder.com/300x200?text=Trailer',
        altText: 'รถพ่วง',
    },
    {
        id: 3,
        title: 'เครื่องจักร',
        imageUrl: 'https://via.placeholder.com/300x200?text=Machinery',
        altText: 'เครื่องจักรกลหนัก',
    },
    {
        id: 4,
        title: 'รูปแบบที่แสดงถึง รถลากจูง',
        imageUrl: null,
        altText: 'รถลากจูง - ไม่มีข้อมูล',
    },
    {
        id: 5,
        title: 'รูปแบบที่แสดงถึง รถพ่วง',
        imageUrl: null,
        altText: 'รถพ่วง - ไม่มีข้อมูล',
    },
    {
        id: 6,
        title: 'รูปแบบที่แสดงถึง สินค้า / เครื่องจักร',
        imageUrl: null,
        altText: 'สินค้า / เครื่องจักร - ไม่มีข้อมูล',
    },
    {
        id: 7,
        title: 'รถลากจูง',
        imageUrl: 'http://googleusercontent.com/file_content/0',
        altText: 'รถลากจูง HINO',
    },
    {
        id: 8,
        title: 'รถพ่วง',
        imageUrl: 'https://via.placeholder.com/300x200?text=Trailer',
        altText: 'รถพ่วง',
    },
    {
        id: 9,
        title: 'เครื่องจักร',
        imageUrl: 'https://via.placeholder.com/300x200?text=Machinery',
        altText: 'เครื่องจักรกลหนัก',
    },
    {
        id: 10,
        title: 'รูปแบบที่แสดงถึง รถลากจูง',
        imageUrl: null,
        altText: 'รถลากจูง - ไม่มีข้อมูล',
    },
    {
        id: 11,
        title: 'รูปแบบที่แสดงถึง รถพ่วง',
        imageUrl: null,
        altText: 'รถพ่วง - ไม่มีข้อมูล',
    },
    {
        id: 12,
        title: 'รูปแบบที่แสดงถึง สินค้า / เครื่องจักร',
        imageUrl: null,
        altText: 'สินค้า / เครื่องจักร - ไม่มีข้อมูล',
    },
];

// Component หลักสำหรับส่วนแสดงหมวดหมู่ทั้งหมด
const CategorySection = () => {
    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px 0px 20px 20px',
        margin: '0',
    };

    return (
        <div style={containerStyle}>
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    title={category.title}
                    imageUrl={category.imageUrl}
                    altText={category.altText}
                />
            ))}
        </div>
    );
};

const Right = () => {
    return (
        <div
            style={{
                fontFamily: 'Sarabun, sans-serif',
                backgroundColor: '#ffffff',
                borderTopRightRadius: '25px',
                borderBottomRightRadius: '0px',
                width: '65%',
                marginRight: '20px',
                overflowY: 'auto',
            }}
        >
            <CategorySection />
        </div>
    );
};

export default Right;