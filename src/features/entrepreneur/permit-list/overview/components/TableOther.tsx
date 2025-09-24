/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Badge, message, Table, type TableProps } from 'antd';
import type {
  PetitionExtendedData,
  PetitionExtendedFlow,
  PetitionExtendedTableData,
} from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { CLIENT_PETITION_STATUS } from '@/utils/constant';
import dayjs from 'dayjs';
import { getPetitionExtendedMessageAPI } from '@/services/entrepreneur/PetitionService';
import { setLoading, useAppDispatch } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';

interface Props {
  data: PetitionExtendedData;           // ✅ ใช้ Extended
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
  openMessageModal: (messageId: number) => void;
}

const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 100,               // ✅ ความกว้างเท่ากันทุกอัน (px หรือ '10rem' ก็ได้)
  minHeight: 48,            // ✅ ความสูงขั้นต่ำพอสำหรับ 2 บรรทัด (มีวันที่/ไม่มีวันที่ก็ไม่กระดิก)
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,                   // เว้นบรรทัดระหว่างข้อความกับวันที่นิดนึง
  borderRadius: 6,
  padding: '4px 8px',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 1.2,
};

const TableOther: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, openMessageModal } = props
  const dispatch = useAppDispatch()

  const renderStatusTag = useCallback((petitionFlow: PetitionExtendedFlow, record: PetitionExtendedTableData) => {
    let text: 'IN_PROGRESS' | 'REJECTED' | 'APPROVE' | 'NOT_APPROVE' = 'IN_PROGRESS'
    if (typeof petitionFlow === 'undefined') {
      const isInProgress = record.petition_extended_flow.some(item => item.is_approved === false) ? 'REJECTED' : 'IN_PROGRESS'
      text = isInProgress
    } else {
      if (petitionFlow?.is_approved) {
        text = 'APPROVE'
      } else {
        text = 'NOT_APPROVE'
      }
    }

    const tagBg = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      '#5A9BC3'
      : CLIENT_PETITION_STATUS[text]?.color // ใช้สีจาก CLIENT_PETITION_STATUS

    const tagText = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      'ข้อความใหม่'
      : CLIENT_PETITION_STATUS[text]?.text

    const tagSubText = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      <Badge count={1} />
      : (text === 'IN_PROGRESS' || text === 'REJECTED') ? null :
        <span style={{ fontSize: 12 }}>{dayjs(petitionFlow?.created_at).format('DD/MM/YYYY')}</span>

    return (
      <figure
        className={
          (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved)
            ? 'cursor-pointer' : 'cursor-auto'
        }
        onClick={() => {
          if (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved) {
            openMessageModal(petitionFlow?.id)
          }
        }}
      >
        <Tag
          style={{
            ...STATUS_TAG_STYLE,
            backgroundColor: tagBg
          }}
        >
          {tagText}
          {tagSubText}
        </Tag>
      </figure>
    );
  }, [openMessageModal])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        window.open(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fetchStatusMessage = useCallback(async (messageId: number) => {
    dispatch(setLoading(true))
    try {
      const response = await getPetitionExtendedMessageAPI({ message_id: messageId })
      if (response.status === 200) {
        showFile(extractUrl(response.data.document_url))
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error('error: ', error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, showFile, extractUrl])

  const columns: TableProps<PetitionExtendedTableData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'user_created',
      key: 'user_created.business_details.business_name',
      width: 200,
      align: 'center',
      render: (item, record, index) => {
        if (record.user_created?.business_details?.business_name) {
          if (data.data.length - 1 === index) {
            return <strong>{record.user_created?.business_details?.business_name}</strong>
          }
          return record.user_created?.business_details?.business_name
        }
        return '-'
      }
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      align: 'center',
      render: (item, record, index) => {
        if (record.created_at) {
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(record.created_at).format('DD/MM/YYYY')}</strong>
          }
          return dayjs(record.created_at).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'คณะกรรมการพิจารณา',
      key: 'committee_conside',
      width: 170,
      align: 'center',
      render: (_v, r) => renderStatusTag(r.petition_extended_flow[0], r)
    },
    {
      title: 'รอลงนาม',
      key: 'wait_signed',
      width: 150,
      align: 'center',
      render: (_v, r) => renderStatusTag(r.petition_extended_flow[1], r)
    },
    {
      title: 'ออกใบอนุญาต',
      key: 'permit',
      width: 150,
      align: 'center',
      render: (_v, r) => renderStatusTag(r.petition_extended_flow[2], r)
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="id"
      dataSource={data.data}
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
      onRow={(record) => {
        return {
          onClick: () => {
            if (record.petition_extended_flow.length === 3 && record.petition_extended_flow[2].status_id === 6) {
              fetchStatusMessage(record.petition_extended_flow[2].id)
            }
            return
          }
        };
      }}
    />
  )
}

export default React.memo<Props>(TableOther)
