/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { TableData } from '@/@types/entrepreneur/vehicle-list';
import { ConfirmDialog } from '@/components/shared'
import React from 'react'
import { INIT_CONFIRM_DELETE } from '../screen';

interface Props {
  open: boolean;
  id: string | number;
  data: TableData;
  setOpen: ({ open, data, id }: { open: boolean, data: TableData, id: string | number }) => void;
  deleteRecord: (id: string | number) => void;
}

interface ContentProps {
  data: TableData;
}

const Content = (props: ContentProps) => {
  const { data } = props;

  return (
    <div className='block lg:grid grid-cols-3 gap-5'>
      <img
        src='/img/custom/icon/vehicleicon.svg'
        alt='image'
        className='w-full h-full'
      />
      <div className='col-span-2'>
        <div className='flex flex-col gap-3'>
          <p className='text-base'><strong>ประเภท</strong> : {data.vehicle_type_name || '-'}</p>
          <p className='text-base'><strong>ยี่ห้อ</strong> : {data.brand || '-'}</p>
          <p className='text-base'><strong>ป้ายทะเบียน / เลขตัวรถ</strong> : {data.plate_no}</p>
          <p className='text-base'><strong>จังหวัด</strong> : {data.plate_province}</p>
          <p className='text-base'><strong>น้ำหนัก</strong> : {data.weight}</p>
        </div>
      </div>
    </div>
  )
}

const ConfirmDeleteModal: React.FC<Props> = (props) => {
  const { open, id, data, setOpen, deleteRecord } = props

  return (
    <ConfirmDialog
      isOpen={open}
      type='warning'
      title='ต้องการลบข้อมูลหรือไม่'
      cancelText='ยกเลิก'
      confirmText='ลบข้อมูล'
      confirmButtonColor='red-500'
      onClose={() => setOpen(INIT_CONFIRM_DELETE)}
      onCancel={() => setOpen(INIT_CONFIRM_DELETE)}
      onConfirm={() => deleteRecord(id)}
    >
      <Content
        data={data}
      />
    </ConfirmDialog>
  )
}

export default React.memo<Props>(ConfirmDeleteModal)
