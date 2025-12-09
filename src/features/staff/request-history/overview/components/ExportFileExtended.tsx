/* eslint-disable react-refresh/only-export-components */
import { AdminPetitionExtendedData } from '@/@types/reducer/petition';
import { Button, Dropdown, MenuProps } from 'antd';
import React, { useCallback } from 'react'
import { AiOutlineDownload } from 'react-icons/ai';
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
  // Fixed column widths to match 5 columns
  col1: { width: '35%' }, // เลขที่ชื่อบริษัท / ห้าง / ร้าน
  col2: { width: '15%' }, // วันที่ขออนุญาต
  col3: { width: '20%' }, // คณะกรรมการพิจารณา
  col4: { width: '15%' }, // รอลงนาม
  col5: { width: '15%' }, // ออกใบอนุญาต
});

interface Props {
  data: AdminPetitionExtendedData;
}

const ExportFileExtended: React.FC<Props> = (props) => {
  const { data } = props

  const onExportPDF = useCallback(async () => {
    // Create PDF Document component
    const MyDocument = () => (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <Text style={styles.title}>
            รายการสรุปประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)
          </Text>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCell, styles.col1]}>
                <Text style={styles.headerText}>เลขที่ชื่อบริษัท / ห้าง / ร้าน</Text>
              </View>
              <View style={[styles.tableCell, styles.col2]}>
                <Text style={styles.headerText}>วันที่ขออนุญาต</Text>
              </View>
              <View style={[styles.tableCell, styles.col3]}>
                <Text style={styles.headerText}>คณะกรรมการพิจารณา</Text>
              </View>
              <View style={[styles.tableCell, styles.col4]}>
                <Text style={styles.headerText}>รอลงนาม</Text>
              </View>
              <View style={[styles.tableCell, styles.col5]}>
                <Text style={styles.headerText}>ออกใบอนุญาต</Text>
              </View>
            </View>

            {/* Table Body */}
            {data.data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, styles.col1]}>
                  <Text>{item.user_created.business_details.business_name || item.poa_name}</Text>
                </View>
                <View style={[styles.tableCell, styles.col2]}>
                  <Text>{dayjs(item.created_at).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.tableCell, styles.col3]}>
                  <Text>{item.petition_extended_flow[0].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col4]}>
                  <Text>{item.petition_extended_flow[1].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
                </View>
                <View style={[styles.tableCell, styles.col5]}>
                  <Text>{item.petition_extended_flow[2].is_approved ? 'ผ่าน' : 'ไม่ผ่าน'}</Text>
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
    a.download = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา).pdf';
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
        key: 'company',
        header: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
        width: 30,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'created_at',
        header: 'วันที่ขออนุญาต',
        width: 20,
        outlineLevel: 1,
        alignment: { vertical: 'middle', horizontal: 'center' }
      },
      {
        key: 'validate_judge',
        header: 'คณะกรรมการพิจารณา',
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
        item.user_created.business_details.business_name || item.poa_name,
        dayjs(item.created_at).format('DD/MM/YYYY'),
        item.petition_extended_flow[0].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_extended_flow[1].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
        item.petition_extended_flow[2].is_approved ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ',
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
      fileName = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา).csv';
    } else {
      const buffer = await workbook.xlsx.writeBuffer();
      blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fileName = 'รายการสรุปประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา).xlsx';
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

export default React.memo<Props>(ExportFileExtended)