import React, { useState } from 'react'
import ReviewResultForm from '../components/FormInput'

const ApprovalEvaluationPage = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">บันทึกผลการพิจารณา</h2>
            <ReviewResultForm/>
        </div>
    )
}

export default ApprovalEvaluationPage