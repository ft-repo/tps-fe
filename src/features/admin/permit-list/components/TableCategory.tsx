import React from 'react'
import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
import { Tag } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody } = Table

interface Props {

}

const TableCategory: React.FC<Props> = (props) => {
  const { } = props
  const navigation = useNavigate()

  return (
    <div>
      <Table>
        <THead>
          <Tr>
            <Th>เลขที่</Th>
            <Th>รหัสสายทาง</Th>
            <Th>ชื่อสายทาง</Th>
            <Th>วันที่เริ่มต้น</Th>
            <Th>วันที่สิ้นสุด</Th>
            <Th>วันที่ขออนุญาต</Th>
            <Th>ตรวจเอกสาร</Th>
            <Th>ตรวจเส้นทาง</Th>
            <Th>ตรวจยานพาหนะ</Th>
            <Th>รอลงนาม</Th>
            <Th>ออกใบอนุญาต</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr className='cursor-pointer' onClick={() => navigation('/permit-list/view')}>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  )
}

export default React.memo<Props>(TableCategory)
