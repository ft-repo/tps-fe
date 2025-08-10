/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui';
import { ModalUpdateVehicle, TableVehicleList, FormSearchVehicleList } from '../components';
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { getVehicleType } from '@/store/slices/master';
import { getVehicleList, getVehicleListByID } from '@/services/entrepreneur/VehicleListService';
import { setVehicleList } from '@/store/slices/entrepreneur';
import { VehicleListByIDResponse } from '@/@types/services/vehicle';

interface Props {

}

export interface OpenDialogProps {
  open: boolean;
  data: VehicleListByIDResponse | null;
}

export const INIT_VEHICLE_MODAL: OpenDialogProps = {
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
  const [open, setOpen] = useState<OpenDialogProps>(INIT_VEHICLE_MODAL)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchAPI = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getVehicleList({
        ...vehicle.overview.search,
        vehicle_type_id: vehicle.overview.search.vehicle_type_id === 'ALL' ? 0 : vehicle.overview.search.vehicle_type_id
      })
      if (response.status === 200) {
        dispatch(setVehicleList({ params: { ...vehicle.overview.search }, data: { ...response.data } }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [vehicle.overview.search, dispatch])

  useEffect(() => {
    dispatch(getVehicleType())
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const searchData = useCallback(async (value: any) => {
    setLoading(true)
    try {
      const response = await getVehicleList({
        ...vehicle.overview.search,
        vehicle_type_id: value === 'ALL' ? 0 : value,
      })
      if (response.status === 200) {
        dispatch(setVehicleList({
          params: {
            ...vehicle.overview.search,
            vehicle_type_id: value
          },
          data: { ...response.data }
        }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [vehicle.overview.search, dispatch])

  const onChangeTable = useCallback(async (page?: number | null | any, pageSize?: number | null | any) => {
    setLoading(true)
    try {
      const response = await getVehicleList({
        ...vehicle.overview.search,
        vehicle_type_id: vehicle.overview.search.vehicle_type_id === 'ALL' ? 0 : vehicle.overview.search.vehicle_type_id,
        page: page ? page : vehicle.overview.search.page,
        limit: pageSize ? pageSize : vehicle.overview.search.limit
      })
      if (response.status === 200) {
        dispatch(setVehicleList({
          params: {
            ...vehicle.overview.search,
            page: page,
            limit: pageSize
          },
          data: { ...response.data }
        }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [vehicle.overview.search, dispatch])

  const openModalWithData = useCallback(async (id: number | string) => {
    try {
      const response = await getVehicleListByID(id)
      if (response.status === 200) {
        setOpen({
          open: true,
          data: response.data
        })
      } else {
        console.log('error')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap'>
        <h3>รายการรถ</h3>
        <Button
          variant='solid'
          size='sm'
          icon={<PlusIcon />}
          onClick={() => navigate('/vehicle-list/create')}
        >
          เพิ่มรายการรถ
        </Button>
      </section>
      <section className='mt-5'>
        <FormSearchVehicleList
          searchData={searchData}
        />
        <TableVehicleList
          data={vehicle.overview.data}
          loading={loading}
          setOpen={setOpen}
          openModalWithData={openModalWithData}
          onChangeTable={onChangeTable}
        />
      </section>
      <ModalUpdateVehicle
        open={open.open}
        data={open.data}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo<Props>(OverviewScreen)
