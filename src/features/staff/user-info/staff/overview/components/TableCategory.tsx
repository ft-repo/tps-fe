/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Table from '@/components/ui/Table/Table'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';

const { Tr, Th, Td, THead, TBody } = Table

interface Props {

}

const TableVehicleList: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Username</Th>
          <Th>ชื่อ - นามสกุล</Th>
          <Th>หน่วยงาน</Th>
          <Th>สิทธิ์การเข้าใช้งาน</Th>
          <Th>จัดการ</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>0016</Td>
          <Td>รถลากจูง</Td>
          <Td>ISUZU</Td>
          <Td>56 - 2256</Td>
          <Td>
            <div className='flex items-center gap-2'>
              <Button
                size='xs'
                variant='solid'
                icon={<EditIcon />}
                
              />
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
              />
            </div>
          </Td>
        </Tr>
        <Tr>
          <Td>0016</Td>
          <Td>รถลากจูง</Td>
          <Td>ISUZU</Td>
          <Td>56 - 2256</Td>
          <Td>
            <div className='flex items-center gap-2'>
              <Button
                size='xs'
                variant='solid'
                icon={<EditIcon />}
                
              />
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
              />
            </div>
          </Td>
        </Tr>
        <Tr>
          <Td>0016</Td>
          <Td>รถลากจูง</Td>
          <Td>ISUZU</Td>
          <Td>56 - 2256</Td>
          <Td>
            <div className='flex items-center gap-2'>
              <Button
                size='xs'
                variant='solid'
                icon={<EditIcon />}
                
              />
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
              />
            </div>
          </Td>
        </Tr>
      </TBody>
    </Table>
  )
}

export default React.memo<Props>(TableVehicleList)
