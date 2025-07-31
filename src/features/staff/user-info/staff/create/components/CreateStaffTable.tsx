/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

interface Props { }

const CreateStaffTable: React.FC<Props> = (props) => {
	const { } = props;

	return (
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
	)
}

export default React.memo<Props>(CreateStaffTable)