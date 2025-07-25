/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { Button, Tabs } from '@/components/ui';
import { ModalUpdateVehicle, TableVehicleList } from '../components';
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const { TabNav, TabList, TabContent } = Tabs

interface Props {
}

export const INIT_VEHICLE_MODAL = { open: false }

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_VEHICLE_MODAL)
  const [tabKey, setTabKey] = useState<string>('tab1')
  const navigate = useNavigate()

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
        <Tabs
          defaultValue={tabKey}
          onChange={(tabKey: string) => setTabKey(tabKey)}>
          <TabList>
            <TabNav value="tab1">ทั้งหมด</TabNav>
            <TabNav value="tab2">รถลากจูง</TabNav>
            <TabNav value="tab3">รถกึ่งพ่วง</TabNav>
            <TabNav value="tab4">เครื่องจักร</TabNav>
            <TabNav value="tab5">สินค้า</TabNav>
          </TabList>
          <div className='mt-5'>
            <TabContent value='tab1'>
              <TableVehicleList
                setOpen={setOpen}
              />
            </TabContent>
            <TabContent value='tab2'>
              <TableVehicleList
                setOpen={setOpen}
              />
            </TabContent>
            <TabContent value='tab3'>
              <TableVehicleList
                setOpen={setOpen}
              />
            </TabContent>
            <TabContent value='tab4'>
              <TableVehicleList
                setOpen={setOpen}
              />
            </TabContent>
            <TabContent value='tab5'>
              <TableVehicleList
                setOpen={setOpen}
              />
            </TabContent>
          </div>
        </Tabs>
      </section>
      <ModalUpdateVehicle
        open={open.open}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo<Props>(OverviewScreen)
