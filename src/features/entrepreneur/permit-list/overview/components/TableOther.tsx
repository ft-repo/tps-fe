/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps } from 'antd';
import type {
  PetitionExtendedData,
  PetitionExtendedTableData,
} from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { CLIENT_PETITION_EXTENDED_STATUS } from '@/utils/constant';
import dayjs from 'dayjs';

type Row = PetitionExtendedTableData;

interface Props {
  data: PetitionExtendedData;           // ✅ ใช้ Extended
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
}

// ---------- Helpers ----------
type StepId = 1 | 4 | 5 | 6;
const ORDER: StepId[] = [1, 4, 5, 6];

type FlowItem = {
  id: number;
  status_id: number;
  is_approved: boolean | 0 | 1 | '0' | '1' | 'true' | 'false' | 'TRUE' | 'FALSE';
  created_at?: string | null;
  created_date?: string | null;
};

const isTrue = (v: FlowItem['is_approved']) =>
  v === true || v === 1 || v === '1' || v === 'true' || v === 'TRUE';

const getDate = (f?: FlowItem | null) =>
  (f?.created_at ?? f?.created_date ?? null) as string | null;

const latestFlowByStatus = (
  flow: Row['petition_extended_flow'] | undefined,
  statusId: StepId
): FlowItem | null => {
  const items = (flow ?? []).filter(f => f.status_id === statusId);
  if (!items.length) return null;
  return items.reduce((a, b) => {
    const da = getDate(a) ?? '';
    const db = getDate(b) ?? '';
    if (da !== db) return db > da ? b : a;
    return b.id > a.id ? b : a;
  });
};

type StatusKey = keyof typeof CLIENT_PETITION_EXTENDED_STATUS;
type StepStatus = { key: StatusKey; date?: string | null };

const computeStepStatuses = (record: Row): Record<StepId, StepStatus> => {
  const out = {} as Record<StepId, StepStatus>;
  let rejectedTail = false;

  for (const step of ORDER) {
    if (rejectedTail) {
      out[step] = { key: 'REJECTED' };
      continue;
    }
    const latest = latestFlowByStatus(record.petition_extended_flow, step);
    if (!latest) {
      out[step] = { key: 'IN_PROGRESS' };
      continue;
    }
    if (isTrue(latest.is_approved)) {
      out[step] = { key: 'APPROVE', date: getDate(latest) };
    } else {
      out[step] = { key: 'NOT_APPROVE', date: getDate(latest) };
      rejectedTail = true;
    }
  }
  return out;
};

const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 140,
  minHeight: 48,
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  borderRadius: 6,
  padding: '4px 8px',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 1.2,
};

const renderStatusTag = (st: StepStatus) => {
  const cfg = CLIENT_PETITION_EXTENDED_STATUS[st.key];
  const showDate = st.key === 'APPROVE' || st.key === 'NOT_APPROVE';
  const dateText =
    showDate && st.date
      ? (dayjs(st.date).isValid() ? dayjs(st.date).format('DD/MM/YYYY') : st.date)
      : null;

  return (
    <Tag style={{ ...STATUS_TAG_STYLE, backgroundColor: cfg.color }}>
      {cfg.text}
      {dateText ? <span style={{ fontSize: 12 }}>{dateText}</span> : null}
    </Tag>
  );
};

const TableOther: React.FC<Props> = ({ data, loading, handleTableChange }) => {
  const columns: TableProps<Row>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'user_created',
      key: 'user_created.business_details.business_name',
      width: 200,
      align: 'center',
      render: (_v, r) => <p>{r.user_created?.business_details?.business_name ?? '-'}</p>,
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      align: 'center',
      render: (_v, r) => <p>{r.created_at ? dayjs(r.created_at).format('DD/MM/YYYY') : '-'}</p>,
    },

    // {
    //   title: 'ตรวจเอกสาร', key: 'validate_document', width: 150, align: 'center',
    //   render: (_v, r) => renderStatusTag(computeStepStatuses(r)[1])
    // },
    {
      title: 'คณะกรรมการพิจารณา', key: 'committee_conside', width: 170, align: 'center',
      render: (_v, r) => renderStatusTag(computeStepStatuses(r)[4])
    },
    {
      title: 'รอลงนาม', key: 'wait_signed', width: 150, align: 'center',
      render: (_v, r) => renderStatusTag(computeStepStatuses(r)[5])
    },
    {
      title: 'ออกใบอนุญาต', key: 'permit', width: 150, align: 'center',
      render: (_v, r) => renderStatusTag(computeStepStatuses(r)[6])
    },
  ];

  return (
    <Table<Row>                                 
      columns={columns}
      rowKey="id"
      dataSource={(data.data ?? []) as Row[]}    
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: data.page,
        pageSize: data.limit,
        total: Number(data.total) || 0,
        onChange: (page, pageSize) => handleTableChange(page, pageSize),
        showSizeChanger: true,
        position: ['bottomRight'],
        showTotal: (total, range) => {
          const totalPage = (range[1] + 1) - range[0]
          return `ทั้งหมด ${totalPage || total} รายการ`
        },
        locale: { items_per_page: '/ หน้า' },
      }}
      scroll={{ x: 1100 }}
    />
  )
}

export default React.memo<Props>(TableOther)
