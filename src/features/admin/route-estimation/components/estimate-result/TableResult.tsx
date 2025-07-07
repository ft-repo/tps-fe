import React from 'react'
import { FieldArray } from '@/@types/admin/route-estimation'
import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

interface Props {
  data: FieldArray;
}

const TableResult: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <div>
      <h3>ทางหลวงชนบทหมายเลข อย.2008 - ทางหลวงชนบทหมายเลข ชพ.2016</h3>
      <p>แยกทางหลวงหมายเลข 08 (กม.ที่ 20+500) - แยกทางหลวงหมายเลข 16 (กม.ที่ 20+100)</p>
      <Table>
        <THead>
          <Tr>
            <Th>Company</Th>
            <Th>Contact</Th>
            <Th>Country</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
          </Tr>
          <Tr>
            <Td>Centro comercial Moctezuma</Td>
            <Td>Francisco Chang</Td>
            <Td>Mexico</Td>
          </Tr>
          <Tr>
            <Td>Ernst Handel</Td>
            <Td>Roland Mendel</Td>
            <Td>Austria</Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  )
}

export default React.memo<Props>(TableResult)
