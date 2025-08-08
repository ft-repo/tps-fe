import React from 'react'
import Left from '../components/left'
import Right from '../components/right'


const ContentArea = () => {
    return (
        <div style={{ display: 'flex', flexGrow: 1 }}>
            {/* ข้อมูลฝั่งซ้าย */}
            <Left/>

            {/* Right */}
            <Right/>
        </div>
    )
}

export default ContentArea