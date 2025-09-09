/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Table, type TableProps } from 'antd';
import { PetitionTableData } from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { APPROVAL_STATUS } from '@/utils/constant';
import ConfirmModal from './ConfirmPermitModal';
import { useAppDispatch, useAppSelector } from '@/store';
import { getStaffPetitionData } from '@/store/slices/staff/staffPetitionSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TableCatagoryAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.staffPetition.loading);
  const data = useAppSelector((state) => state.staffPetition.petition.overview.data);

  useEffect(() => {
    dispatch(getStaffPetitionData({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleTableChange = (page: number, limit: number) => {
    dispatch(getStaffPetitionData({ page, limit }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PetitionTableData | null>(null);

  const handleTagClick = (record: PetitionTableData, type: 'DOCUMENT' | 'ROUTE' | 'VEHICLE' | 'SIGN' | 'PERMIT') => {
    setSelectedRow(record);
    if (type === 'PERMIT') {
      setModalOpen(true);
    } else {
      const routeMap = {
        DOCUMENT: '/request-list/approval/document',
        ROUTE: '/request-list/approval/route',
        VEHICLE: '/request-list/approval/vehicle',
        SIGN: '/request-list/approval/sign',
      };
      navigate(routeMap[type]);
    }
  };

  const columns: TableProps<PetitionTableData>['columns'] = [
    {
      title: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 500,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'รหัสสายทาง',
      dataIndex: 'road_code',
      key: 'road_code',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'ชื่อสายทาง',
      dataIndex: 'road_name',
      key: 'road_name',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'วันที่เริ่มต้น',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'วันที่สิ้นสุด',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'petition_date',
      key: 'petition_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'ตรวจเอกสาร',
      key: 'validate_document',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_flow, 1);
        const key: ApprovalKey = toApprovalKey(latest);
        return <Tag className={APPROVAL_STATUS[key].className} onClick={() => handleTagClick(record, 'DOCUMENT')}>{APPROVAL_STATUS[key].text}</Tag>;
      }
    },
    {
      title: 'ตรวจเส้นทาง',
      key: 'validate_route',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_flow, 2);
        const key: ApprovalKey = toApprovalKey(latest);
        return <Tag className={APPROVAL_STATUS[key].className} onClick={() => handleTagClick(record, 'ROUTE')}>{APPROVAL_STATUS[key].text}</Tag>;
      }
    },
    {
      title: 'ตรวจยานพาหนะ',
      key: 'validate_vehicle',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_flow, 3);
        const key: ApprovalKey = toApprovalKey(latest);
        return <Tag className={APPROVAL_STATUS[key].className} onClick={() => handleTagClick(record, 'VEHICLE')}>{APPROVAL_STATUS[key].text}</Tag>;
      }
    },
    {
      title: 'รอลงนาม',
      key: 'wait_signed',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_flow, 5);
        const key: ApprovalKey = toApprovalKey(latest);
        return <Tag className={APPROVAL_STATUS[key].className} onClick={() => handleTagClick(record, 'SIGN')}>{APPROVAL_STATUS[key].text}</Tag>;
      }
    },
    {
      title: 'ออกใบอนุญาต',
      key: 'permit',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest6 = latestFlowByStatus(record.petition_flow, 6);
        const key: ApprovalKey = latest6
          ? toApprovalKey(latest6)
          : (toApprovalKey(latestFlowByStatus(record.petition_flow, 5)) === 'APPROVED' ? 'APPROVED' : 'WAIT_APPROVAL');
        return <Tag className={APPROVAL_STATUS[key].className} onClick={() => handleTagClick(record, 'PERMIT')}>{APPROVAL_STATUS[key].text}</Tag>;
      }
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey="petition_id"
        dataSource={data?.data ?? []}
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: data?.page ?? 1,
          pageSize: data?.limit ?? 10,
          total: Number(data?.total ?? 0),
          onChange: handleTableChange,
          showSizeChanger: true,
          position: ['bottomRight'],
          showTotal: (total, range) => `ทั้งหมด ${(range[1] + 1) - range[0] || total} รายการ`,
          locale: { items_per_page: "/ หน้า" }
        }}
        scroll={{ x: 1000 }}
      />

      <ConfirmModal
        open={modalOpen}
        data={selectedRow}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedRow) {
            console.log("อนุมัติใบอนุญาตสำหรับ", selectedRow.petition_no);
          }
          setModalOpen(false);
        }}
      />
    </>
  );
};

// ---------- Helpers ----------
type FlowItem = {
  message_id: number;
  status_id: number;
  is_approved: boolean;
};

const latestFlowByStatus = (
  flow: FlowItem[] | undefined,
  statusId: number
): FlowItem | null => {
  const items = (flow ?? []).filter(f => f.status_id === statusId);
  if (items.length === 0) return null;
  return items.reduce((acc, cur) => cur.message_id > acc.message_id ? cur : acc);
};

type ApprovalKey = keyof typeof APPROVAL_STATUS;

const toApprovalKey = (flowItem: FlowItem | null): ApprovalKey => {
  if (!flowItem) return 'WAIT_APPROVAL';
  return flowItem.is_approved ? 'APPROVED' : 'REJECTED';
};

export default React.memo(TableCatagoryAdmin);
