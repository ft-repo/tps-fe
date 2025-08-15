import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { PetitionTableData } from '@/@types/reducer/petition'

interface ConfirmModalProps {
  open: boolean;
  data: PetitionTableData | null;
  onClose: () => void;
  onConfirm: () => void;
}

interface TableData {
    no: string;
    road_code: string;
    road_name: string;
    start_date: string;
    end_date: string;
    permit_date: string;
    validate_document: any;
    validate_route: any;
    validate_vehicle: any;
    wait_signed: any;
    permit: any;
}

// interface ConfirmModalProps {
//     open: boolean;
//     onClose: () => void;
//     onConfirm: () => void;
//     // data: TableData | null;
// }

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm }) => {
    const navigate = useNavigate();

    if (!open) return null;

    const handleConfirm = () => {
        onConfirm(); 
        navigate('/request-list/approval/sign'); 
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    &times;
                </button>

                <div className="text-blue-800 text-lg font-semibold mb-4">
                    ต้องการยืนยันการออกใบอนุญาตหรือไม่?
                </div>

                <img
                    src="/img/modal/modal1.png"
                    alt="Confirm"
                    className="w-24 h-24 mx-auto mb-4"
                />

                <div className="text-gray-600 text-sm mb-6">
                    หากเลือกยืนยันแล้ว จะไม่สามารถเลือกซ้ำได้ และจะแจ้งผลการอนุมัติให้กับผู้ขอใบอนุญาตทันที
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                    >
                        ไม่อนุมัติ
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                    >
                        อนุมัติ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
