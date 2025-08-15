/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { Table, TableProps } from 'antd';
import { GetLDAPParams, LDAPList } from '@/@types/reducer/user';

interface Props {
	search: GetLDAPParams;
	data: LDAPList[];
	loading: boolean;
	handleTableChange: (page: number, pageSize: number) => void;
	onRowSelection: (key: React.Key[], row: LDAPList[]) => void;
}

const CreateStaffTable: React.FC<Props> = (props) => {
	const { search, data, loading, handleTableChange, onRowSelection } = props;

	console.log(loading)

	const remapData = useMemo(() => {
		if (!data.length) return []
		return data.map((item, index) => {
			return {
				key: index,
				...item
			}
		})
	}, [data])

	const columns: TableProps<LDAPList>['columns'] = [
		{
			title: 'Username',
			dataIndex: 'Username',
			key: 'Username',
			width: 100,
			align: 'center',
			render: (value) => {
				if (value) {
					return value
				}
				return '-'
			}
		},
		{
			title: 'ชื่อ - นามสกุล',
			dataIndex: 'Description',
			key: 'Description',
			width: 300,
			align: 'center',
			render: (value) => {
				if (value) {
					return value
				}
				return '-'
			}
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={remapData || []}
			loading={loading}
			rowSelection={{
				type: 'radio',
				onChange: (key, row) => onRowSelection(key, row)
			}}
			pagination={{
				defaultCurrent: 1,
				defaultPageSize: 10,
				current: search.page,
				pageSize: search.limit,
				total: Number(data.length) || 0,
				onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
				showSizeChanger: true,
				position: ['bottomRight'],
				showTotal: (total, range) => {
					const totalPage = (range[1] + 1) - range[0]
					return `ทั้งหมด ${totalPage || total} รายการ`
				},
				locale: { items_per_page: "/ หน้า" }
			}}
			scroll={{ x: 500 }}
		/>
	)
}

export default React.memo<Props>(CreateStaffTable)