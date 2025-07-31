/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Table from '@/components/ui/Table'
import { FaTrash as DeleteIcon } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Button } from '@/components/ui';

const { Tr, Th, Td, THead, TBody } = Table


interface Props {

}

const TableEntrepreneur: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate();

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Username</Th>
          <Th>ชื่อบริษัท/ห้าง/ร้าน</Th>
          <Th>ประเภทนิติบุคคล</Th>
          <Th>เลขทะเบียนนิติบุคคล</Th>
          <Th>วันที่รับอนุญาต</Th>
          <Th>จัดการ</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr
          onClick={() => navigate('/user-info/entrepreneur/view')}
        >
          <Td>UniverTrans</Td>
          <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
          <Td>ห้างหุ้นส่วนสามัญนิติบุคคล</Td>
          <Td>0105557001234</Td>
          <Td>01 มี.ค 65</Td>
          <Td>
            <Button
              size='xs'
              variant='solid'
              icon={<DeleteIcon />}
              color='red-600'
            />
          </Td>
        </Tr>
        <Tr
          onClick={() => navigate('/user-info/entrepreneur/view')}
        >
          <Td>UniverTrans</Td>
          <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
          <Td>ห้างหุ้นส่วนสามัญนิติบุคคล</Td>
          <Td>0105557001234</Td>
          <Td>01 มี.ค 65</Td>
          <Td>
            <Button
              size='xs'
              variant='solid'
              icon={<DeleteIcon />}
              color='red-600'
            />
          </Td>
        </Tr>
        <Tr
          onClick={() => navigate('/user-info/entrepreneur/view')}
        >
          <Td>UniverTrans</Td>
          <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
          <Td>ห้างหุ้นส่วนสามัญนิติบุคคล</Td>
          <Td>0105557001234</Td>
          <Td>01 มี.ค 65</Td>
          <Td>
            <Button
              size='xs'
              variant='solid'
              icon={<DeleteIcon />}
              color='red-600'
            />
          </Td>
        </Tr>
      </TBody>
    </Table>
  )
}

export default React.memo<Props>(TableEntrepreneur)
