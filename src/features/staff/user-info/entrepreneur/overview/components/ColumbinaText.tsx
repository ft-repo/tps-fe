/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Table from '@/components/ui/Table'
const { Tr, Th, Td, THead, TBody } = Table
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router";


interface Props {

}

const ColumbinaText: React.FC<Props> = (props) => {
  const { } = props
  let navigate = useNavigate();
  return (
    <div>
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
            <Td><HiOutlineTrash /></Td>
          </Tr>
          <Tr
            onClick={() => navigate('/user-info/entrepreneur/view')}
          >
            <Td>UniverTrans</Td>
            <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
            <Td>ห้างหุ้นส่วนสามัญนิติบุคคล</Td>
            <Td>0105557001234</Td>
            <Td>01 มี.ค 65</Td>
            <Td><HiOutlineTrash /></Td>
          </Tr>
          <Tr
            onClick={() => navigate('/user-info/entrepreneur/view')}
          >
            <Td>UniverTrans</Td>
            <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
            <Td>ห้างหุ้นส่วนสามัญนิติบุคคล</Td>
            <Td>0105557001234</Td>
            <Td>01 มี.ค 65</Td>
            <Td><HiOutlineTrash /></Td>
          </Tr>
        </TBody>
      </Table>
      < Table />
    </div>
  )
}

export default React.memo<Props>(ColumbinaText)
