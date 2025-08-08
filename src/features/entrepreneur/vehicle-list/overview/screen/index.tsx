/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from 'react'
import { Button } from '@/components/ui';
import { ModalUpdateVehicle, TableVehicleList, FormSearchVehicleList } from '../components';
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useGetVehicleListQuery } from '@/store/slices/entrepreneur';

interface Props {
}

export const INIT_VEHICLE_MODAL = { open: false }

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_VEHICLE_MODAL)
  // const [tabKey, setTabKey] = useState<string>('tab1')
  const navigate = useNavigate()

  const { data, isLoading } = useGetVehicleListQuery({ vehicle_type_id: null, page: 1, limit: 10 })

  const searchData = useCallback(() => {
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
        {!isLoading &&
          <TableVehicleList
            data={data}
            loading={isLoading}
            setOpen={setOpen}
          />
        }
      </section>
      <ModalUpdateVehicle
        open={open.open}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo<Props>(OverviewScreen)
