import React from 'react'
import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

const CreateStaffTable = () => {

  return (
    <div>
      <Table>
                <THead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>ชื่อ - นามสกุล</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                    </Tr>
                    <Tr>
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                    </Tr>
                    <Tr>
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                    </Tr>
                </TBody>
            </Table>
    </div>
  )
}

export default CreateStaffTable