/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
import { Tag } from '@/components/ui'

const { Tr, Th, Td, THead, TBody } = Table

interface Props {

}

const TableOtherAdmin: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <Table>
        <THead>
          <Tr>
            <Th>ชื่อบริษัท / ห้าง / ร้าน</Th>
            <Th>วันที่ขออนุญาต</Th>
            <Th>ตรวจเอกสาร</Th>
            <Th>คณะกรรมการพิจารณา</Th>
            <Th>รอลงนาม</Th>
            <Th>ออกใบอนุญาต</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-blue-500 text-black border-0 rounded">
                ข้อความใหม่
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                รอดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                รอดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-black border-0 rounded">
                รอตรวจสอบ
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-blue-500 text-black border-0 rounded">
                ข้อความใหม่
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                รอดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                รอดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-black border-0 rounded">
                รอตรวจสอบ
              </Tag>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  )
}

export default React.memo<Props>(TableOtherAdmin)
