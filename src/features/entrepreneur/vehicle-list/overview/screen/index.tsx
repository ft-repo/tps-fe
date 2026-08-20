/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TableVehicleList, FormSearchVehicleList, ModalUpdateVehicle, CardListVehicle } from '../components';
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { deleteVehicleAPI, getVehicleByIDAPI } from '@/services/entrepreneur/VehicleListService';
import { getVehicleData, setVehicleList } from '@/store/slices/entrepreneur';
import { VehicleListByIDResponse } from '@/@types/services/vehicle';
import { TableData } from '@/@types/entrepreneur/vehicle-list';
import { FieldType } from '../components/FormSearchVehicleList';
import { Button, message, Modal } from 'antd';
import { VehicleListData } from '@/@types/reducer/vehicle';

interface Props {

}

export interface OpenDialogProps {
  open: boolean;
  data: VehicleListByIDResponse;
  id: string | number;
}

export interface OpenConfirmDialog {
  open: boolean;
  data: TableData;
  id: string | number;
}

export const INIT_VEHICLE_MODAL: OpenDialogProps = {
  id: '',
  open: false,
  data: {
    vehicle_detail: {
      vehicle_type_id: '',
      vehicle_type_name: '',
      plate_no: '',
      plate_province: '',
      brand: '',
      color: '',
      height: '',
      kingpin_distance: '',
      length: '',
      weight: '',
      width: '',
      axis_type_id: null,
      axis_type: {
        id: null,
        name: '',
        max_weight: 0,
        max_carry_weight: 0,
        axis_number: 0
      },
      registration_document_url: ''
    },
    vehicle_owner_documents: {
      owner_document_url: '',
      employment_contact_url: '',
      assignment_contact_url: '',
      buyer_contact_url: ''
    },
    vehicle_pictures: {
      front_rear_url: '',
      side_rear_url: '',
      back_rear_url: ''
    }
  }
}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const loading = useAppSelector(state => state.layout.loading)
  const [open, setOpen] = useState<OpenDialogProps>(INIT_VEHICLE_MODAL)

  const { authority, from_web } = useAppSelector(state => state.auth.user)


  useEffect(() => {
    dispatch(getVehicleData(vehicle.overview.search))
  }, [dispatch, vehicle.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setVehicleList({
        params: {
          ...vehicle.overview.search,
          page,
          limit
        },
        data: { ...vehicle.overview.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, vehicle.overview])

  const handleSearch = useCallback((value: FieldType) => {
    dispatch(setLoading(true))
    try {
      dispatch(setVehicleList({
        params: {
          ...vehicle.overview.search,
          vehicle_type_id: value || 0
        },
        data: { ...vehicle.overview.data }
      }))

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, vehicle.overview])

  const deleteRecord = useCallback(async (id: string | number) => {
    dispatch(setLoading(true))
    try {
      const response = await deleteVehicleAPI(id)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getVehicleData(vehicle.overview.search))
            Modal.destroyAll()
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, vehicle.overview])

  const confirmDeleteRecord = useCallback((id: string | number, data: VehicleListData) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล',
      content: (
        <>
          <p className='text-base'><strong>ประเภท</strong> : {data.vehicle_type_name || '-'}</p>
          {data.vehicle_type_name !== 'เครื่องจักร / สินค้า' && (
            <p className='text-base'><strong>ยี่ห้อ</strong> : {data.brand || '-'}</p>
          )}
          <p className='text-base'><strong>{data.vehicle_type_name === 'เครื่องจักร / สินค้า' ? 'สินค้า' : 'ป้ายทะเบียน / เลขตัวรถ'}</strong> : {data.plate_no}</p>
          {data.vehicle_type_name !== 'เครื่องจักร / สินค้า' && (
            <p className='text-base'><strong>จังหวัด</strong> : {data.plate_province}</p>
          )}
          <p className='text-base'><strong>น้ำหนัก</strong> : {data.weight} กก.</p>
        </>
      ),
      okText: 'ลบข้อมูล',
      cancelText: 'ยกเลิก',
      onOk: () => deleteRecord(id),
      onCancel: () => Modal.destroyAll(),
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        danger: true,
        loading: loading
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        disabled: loading
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      }
    })
  }, [deleteRecord, loading])


  const openDataModal = useCallback(async (id: string | number) => {
    dispatch(setLoading(true))
    try {
      const response = await getVehicleByIDAPI(id)
      if (response.status === 200) {
        setOpen({
          open: true,
          id: id,
          data: { ...response.data }
        })
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

  const renderMobileCard = useMemo(() => {
    if (authority[0] === 'USER' && from_web === false) {
      return (
        <CardListVehicle
          data={vehicle.overview.data}
          loading={vehicle.loading}
          handleTableChange={handleTableChange}
          confirmDelete={confirmDeleteRecord}
          openDataModal={openDataModal}
        />
      )
    }
    return (
      <TableVehicleList
        data={vehicle.overview.data}
        loading={vehicle.loading}
        handleTableChange={handleTableChange}
        confirmDelete={confirmDeleteRecord}
        openDataModal={openDataModal}
      />
    )
  }, [authority, from_web, vehicle.overview.data, vehicle.loading, handleTableChange, confirmDeleteRecord, openDataModal])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap'>
        <h3>รายการรถ</h3>
        <Button
          htmlType='button'
          type='primary'
          // size='large'
          className='w-full lg:w-auto'
          icon={<PlusIcon />}
          onClick={() => navigate('/vehicle-list/create')}
        >
          เพิ่มรายการรถ
        </Button>
        {/* <Button
          variant='solid'
          size='sm'
          icon={<PlusIcon />}
          onClick={() => navigate('/vehicle-list/create')}
        >
          เพิ่มรายการรถ
        </Button> */}
      </section>
      <section className='mt-5'>
        <FormSearchVehicleList
          handleSearch={handleSearch}
        />
        {renderMobileCard}
      </section>
      <ModalUpdateVehicle
        open={open.open}
        data={open.data}
        id={open.id}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo<Props>(OverviewScreen)
