/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Modal, Table, TableProps } from 'antd'
import { INIT_MODAL } from './ContentSearchCategory';
import { useAppSelector } from '@/store';

interface Props {
  open: boolean;
  data: RoadInfo[];
  info: PetitionInfo;
  setOpen: ({ open, data, info }: { open: boolean, data: RoadInfo[], info: PetitionInfo }) => void;
}

interface ContentProps {
  data: RoadInfo[];
}

export interface PetitionInfo {
  petition_no: string;
  petition_date: string;
}

export interface RoadInfo {
  route_name: string;
  road_code: string;
}


const Content = (props: ContentProps) => {
  const { data } = props
  const { loading } = useAppSelector(state => state.layout)

  // console.log(data)

  const columns: TableProps<RoadInfo>['columns'] = [
    {
      title: 'เลขที่',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
      render: (value, record, index) => {
        return index + 1
      },
    },
    {
      title: 'รหัสสายทาง',
      dataIndex: 'road_code',
      key: 'road_code',
      width: 50,
      align: 'center',
      render: (value) => {
        if (value) {
          return value
        }
        return '-'
      }
    },
    {
      title: 'ชื่อสายทาง',
      dataIndex: 'route_name',
      key: 'route_name',
      width: 200,
      // align: 'center'
      render: (value) => {
        if (value) {
          return value
        }
        return '-'
      }
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 500 }}
    />
  )
}

const ModalRuralRoadDetails: React.FC<Props> = (props) => {
  const { open, data, info, setOpen } = props

  return (
    <Modal
      destroyOnHidden
      width={800}
      open={open}
      title={(
        <div>
          <h5>เลขที่ {info.petition_no}</h5>
          <p className='font-normal'>วันที่ขออนุญาต {info.petition_date}</p>
        </div>
      )}
      style={{
        fontFamily: 'Noto Sans Thai'
      }}
      footer={false}
      onCancel={() => setOpen(INIT_MODAL)}
    >
      <Content
        data={data}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalRuralRoadDetails)
