/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Button, Dropdown, MenuProps } from 'antd';
import { AiOutlineDownload } from 'react-icons/ai';
import { AdminPetitionData } from '@/@types/reducer/petition';
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';

// Register Thai font
Font.register({
  family: 'THSarabunNew',
  src: '/fonts/THSarabunNew.ttf', // Place font file in public/fonts/
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'THSarabunNew',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 25,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#2980b9',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#bfbfbf',
    textAlign: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  col1: { width: '15%' },
  col2: { width: '8%' },
  col3: { width: '20%' },
  col4: { width: '8%' },
  col5: { width: '8%' },
  col6: { width: '8%' },
  col7: { width: '7%' },
  col8: { width: '7%' },
  col9: { width: '7%' },
  col10: { width: '6%' },
  col11: { width: '6%' },
});

interface Props {
  data: AdminPetitionData;
}

const ExportFile: React.FC<Props> = (props) => {
  const { data } = props

  const onExportPDF = useCallback(async () => {
    // Create PDF Document component
    const MyDocument = () => (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <Text style={styles.title}>
            รายการสรุปประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา)
          </Text>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text style={styles.headerText}>เลขที่ชื่อบริษัท / ห้าง / ร้าน</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text style={styles.headerText}>รหัสสายทาง</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text style={styles.headerText}>ชื่อสายทาง</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text style={styles.headerText}>วันที่เริ่มต้น</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text style={styles.headerText}>วันที่สิ้นสุด</Text>
              </View>
              <View style={[styles.tableCell, styles.col6]}>
                <Text style={styles.headerText}>วันที่ขออนุญาต</Text>
              </View>
              <View style={[styles.tableCell, styles.col7]}>
                <Text style={styles.headerText}>ตรวจเอกสาร</Text>
              </View>
              <View style={[styles.tableCell, styles.col8]}>
                <Text style={styles.headerText}>ตรวจเส้นทาง</Text>
              </View>
              <View style={[styles.tableCell, styles.col9]}>
                <Text style={styles.headerText}>ตรวจยานพาหนะ</Text>
              </View>
              <View style={[styles.tableCell, styles.col10]}>
                <Text style={styles.headerText}>รอลงนาม</Text>
              </View>
              <View style={[styles.tableCell, styles.col11]}>
                <Text style={styles.headerText}>ออกใบอนุญาต</Text>
              </View>
            </View>

            {/* Table Body */}
            {data.data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, styles.col1]}>
                  <Text>{item.business_name}</Text>
                </View>
                <View style={[styles.tableCell, styles.col2]}>
                  <Text>{item.road_code}</Text>
                </View>
                <View style={[styles.tableCell, styles.col3]}>
                  <Text>{item.road_name}</Text>
                </View>
                <View style={[styles.tableCell, styles.col4]}>
                  <Text>{dayjs(item.start_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.tableCell, styles.col5]}>
                  <Text>{dayjs(item.end_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.tableCell, styles.col6]}>
                  <Text>{dayjs(item.petition_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.tableCell, styles.col7]}>
                  <Text>{item.petition_flow[0].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col8]}>
                  <Text>{item.petition_flow[1].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col9]}>
                  <Text>{item.petition_flow[2].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col10]}>
                  <Text>{item.petition_flow[3].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col11]}>
                  <Text>{item.petition_flow[4].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    // Generate PDF blob
    const blob = await pdf(<MyDocument />).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา).pdf';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(url);
  }, [data.data]);

  const onExport = useCallback(async (type: 'xlsx' | 'csv') => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('PetitionSheet');

    // DECLARE COLUMNS
    sheet.columns = [
      {
        key: 'business_name',
        header: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
        width: 30,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'road_code',
        header: 'รหัสสายทาง',
        width: 12,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'road_name',
        header: 'ชื่อสายทาง',
        width: 80,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'start_date',
        header: 'วันที่เริ่มต้น',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'end_date',
        header: 'วันที่สิ้นสุด',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'petition_date',
        header: 'วันที่ขออนุญาต',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'validate_document',
        header: 'ตรวจเอกสาร',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'validate_route',
        header: 'ตรวจเส้นทาง',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'validate_vehicle',
        header: 'ตรวจยานพาหนะ',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'wait_signed',
        header: 'รอลงนาม',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'permit',
        header: 'ออกใบอนุญาต',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
    ];

    // PUSH DATA
    data.data.forEach(item => {
      sheet.addRow([
        item.business_name,
        item.road_code,
        item.road_name,
        dayjs(item.start_date).format('DD/MM/YYYY'),
        dayjs(item.end_date).format('DD/MM/YYYY'),
        dayjs(item.petition_date).format('DD/MM/YYYY'),
        item.petition_flow[0].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_flow[1].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_flow[2].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_flow[3].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_flow[4].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
      ]);
    });

    let blob: Blob;
    let fileName: string;

    if (type === 'csv') {
      // Manual CSV generation for better Thai character support
      const csvRows: string[] = [];

      // Add headers
      const headers = sheet.columns.map(col => col.header);
      csvRows.push(headers.map(h => `"${h}"`).join(','));

      // Add data rows
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          const values = row.values as any[];
          // Remove the first undefined element that ExcelJS adds
          const rowData = values.slice(1).map(val => {
            const strVal = val?.toString() || '';
            // Escape quotes and wrap in quotes
            return `"${strVal.replace(/"/g, '""')}"`;
          });
          csvRows.push(rowData.join(','));
        }
      });

      const csvContent = '\uFEFF' + csvRows.join('\n'); // Add BOM for Excel UTF-8 support
      blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      fileName = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา).csv';
    } else {
      const buffer = await workbook.xlsx.writeBuffer();
      blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fileName = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา).xlsx';
    }

    // Create download link
    const url = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(url);
  }, [data.data]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'รายการสรุป xlsx',
      onClick: () => onExport('xlsx')
    },
    {
      key: '2',
      label: 'รายการสรุป csv',
      onClick: () => onExport('csv')
    },
    {
      key: '3',
      label: 'รายการสรุป pdf',
      onClick: () => onExportPDF()
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
    >
      <Button
        type="primary"
        icon={<AiOutlineDownload />}
      >
        Export File
      </Button>
    </Dropdown>
  )
}

export default React.memo<Props>(ExportFile)
