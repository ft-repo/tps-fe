import React from "react";
import Table from '@/components/ui/Table'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';

const { Tr, Th, Td, THead, TBody } = Table

const SeachTable = () => {
    return (
        <div>
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
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                        <Td>Blazblue</Td>
                        <Td>ผู้ดูแลระบบ</Td>
                        <Td>
                            <div className='flex items-center gap-2'>
                                <Button
                                    size='xs'
                                    variant='solid'
                                    icon={<EditIcon />}
                                //onClick={() => setOpen({ open: true })}
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
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                        <Td>Blazblue</Td>
                        <Td>ผู้ดูแลระบบ</Td>
                        <Td>
                            <div className='flex items-center gap-2'>
                                <Button
                                    size='xs'
                                    variant='solid'
                                    icon={<EditIcon />}
                                //onClick={() => setOpen({ open: true })}
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
                        <Td>Bloodedge</Td>
                        <Td>Ragna</Td>
                        <Td>Blazblue</Td>
                        <Td>ผู้ดูแลระบบ</Td>
                        <Td>
                            <div className='flex items-center gap-2'>
                                <Button
                                    size='xs'
                                    variant='solid'
                                    icon={<EditIcon />}
                                //onClick={() => setOpen({ open: true })}
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
        </div>
    )
}

export default SeachTable
