/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Rect, Svg, PDFViewer } from '@react-pdf/renderer';

Font.register({
  family: 'THSarabunNew',
  src: '/fonts/THSarabunNew.ttf'
})

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "20mm 25mm 20mm 25mm",
    fontSize: "14px",
    fontFamily: "THSarabunNew"
  },
  section: {

  },
  header_section: {
    textAlign: "right"
  },
  date_section: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginBottom: 15,
    gap: 4,
  },
  title_section: {
    textAlign: "center",
  },
  purpose_section: {
    flexDirection: "row"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 5
  },
  checkbox_container: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  underline_custom: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    paddingHorizontal: 4,
    textAlign: "center",
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    minWidth: 80,
    paddingHorizontal: 4,
    textAlign: "center"
  },
  underline_short: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    minWidth: 40,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  underline_long: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    minWidth: 120,
    paddingHorizontal: 4,
    textAlign: "center"
  },
  underline_full: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    flex: 1,
    paddingHorizontal: 4,
  },
  indent: {
    marginLeft: 35
  },
  label: {
    width: 90, // Fixed width for label alignment
  },
});

interface Props {

}

const RenderDoc = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* จ่าหน้า */}
        <View style={styles.header_section}>
          <Text>ม.61_ทช.03</Text>
        </View>
        {/* หัวข้อ */}
        <View style={styles.title_section}>
          <Text>แบบขออนุญาต</Text>
          <Text>ให้ยานพาหนะเดินบนทางหลวงชนบท</Text>
          <Text>ตามประกาศ ผู้อำนวยการทางหลวงชนบท ม.61 หมวด 2 ข้อ 16(1),16(2),16(3),16(4),16(5)</Text>
        </View>
        {/* เขียนที่ */}
        <View style={styles.date_section}>
          <Text>เขียนที่</Text>
          <Text style={styles.underline_long}>มหาวิทยาลัยเกษตรศาสตร์ จ.กทม.</Text>
        </View>
        {/* วันที่ */}
        <View style={styles.date_section}>
          <Text>วันที่</Text>
          <Text style={styles.underline_short}>19</Text>
          <Text>เดือน</Text>
          <Text style={styles.underline_short}>กรกฎาคม</Text>
          <Text>พ.ศ.</Text>
          <Text style={styles.underline_short}>2566</Text>
        </View>
        {/* เรียน เรื่อง */}
        <View style={styles.purpose_section}>
          <Text style={{ marginRight: "18px" }}>เรื่อง</Text>
          <Text>ขออนุญาตให้ยานพาหนะเดินบนทางหลวงพิเศษ ทางหลวงแผ่นดิน และทางหลวงสัมปทาน</Text>
        </View>
        <View style={styles.purpose_section}>
          <Text style={{ marginRight: "18px" }}>เรียน</Text>
          <Text>อธิบดีกรมทางหลวงชนบท</Text>
        </View>
        {/* ช่องกรอก */}
        {/* Checkbox Section */}
        {/* Checkbox Section - Equal Alignment */}
        <View style={[styles.section, styles.indent]}>
          <View style={styles.row}>
            <View style={styles.checkbox_container}>
              <Svg width="12" height="12">
                <Rect
                  x="0"
                  y="0"
                  width="12"
                  height="12"
                  stroke="black"
                  strokeWidth="1"
                  fill="white"
                />
                <Svg>
                  <Text x="2" y="10" style={{ fontSize: "10" }}>✓</Text>
                </Svg>
              </Svg>
            </View>
            <Text style={styles.label}>บุคคลธรรมดา</Text>
            <Text>ชื่อ</Text>
            <Text style={styles.underline_full}>&nbsp;</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.checkbox_container}>
              <Svg width="12" height="12">
                <Rect
                  x="0"
                  y="0"
                  width="12"
                  height="12"
                  stroke="black"
                  strokeWidth="1"
                  fill="white"
                />
                <Svg>
                  <Text x="2" y="10" style={{ fontSize: "10" }}>✓</Text>
                </Svg>
              </Svg>
            </View>
            <Text style={styles.label}>นิติบุคคล</Text>
            <Text>ชื่อ</Text>
            <Text style={styles.underline_full}>&nbsp;</Text>
          </View>
        </View>
        <View style={[styles.row, styles.indent]}>
          <Text>ข้าพเจ้า (นาย/นาง/นางสาว)</Text>
          <Text style={styles.underline_long}>&nbsp;</Text>
          <Text>นามสกุล</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>เจ้าของยานพาหนะหรือตัวแทน เจ้าของยานพาหนะ อยู่บ้านเลขที่</Text>
          <Text style={styles.underline_long}>&nbsp;</Text>
          <Text>หมู่ที่</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>ถนน</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>ตรอก/ซอย</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>แขวง/ตำบล</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>เขต/อำเภอ</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>จังหวัด</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>โทรศัพท์</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>นิติบุคคลประเภท</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>จดทะเบียนเมื่อ</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={[styles.underline_custom, { minWidth: 170 }]}>&nbsp;</Text>
          <Text>อยู่เลขที่</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>หมู่ที่</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>ถนน</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>ตรอก/ซอย</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>แขวง/ตำบล</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>เขต/อำเภอ</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>จังหวัด</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
          <Text>โทรศัพท์</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={[styles.row, styles.indent]}>
          <Text>ขอยื่นคำขออนุญาตให้ยานพาหนะเดืนบนทางหลวงชนบท ตามประกาศผู้อำนวยการทางหลวงฯ หมวด 2</Text>
        </View>
        <View style={styles.row}>
          <Text>ข้อ</Text>
          <Text style={styles.underline_long}>&nbsp;</Text>
          <Text>ต่ออธิการบดีกรมทางหลวงชนบท เพื่อ (เหตุผลที่ขอ)</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.underline_custom, { minWidth: 270 }]}>&nbsp;</Text>
          <Text>โดยยานพาหนะมีลักษณะดังต่อไปนี้</Text>
        </View>
        {/* ลักษณะ 1 */}
        <View style={[styles.row, styles.indent]}>
          <Text>1. ลักษณะ/มาตรฐาน</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>&nbsp;</Text>
          <Text>ประเภท</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>&nbsp;</Text>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>จังหวัด</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>&nbsp;</Text>
          <Text>สี</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>&nbsp;</Text>
          <Text>โดยมีจำนวนเพลา</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>&nbsp;</Text>
          <Text>เพลา</Text>
          <Text> น้ำหนักลงเพลา</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>กิโลกรัม</Text>
          <Text> น้ำหนักรวม</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>&nbsp;</Text>
          <Text>กิโลกรัม</Text>
        </View>
        {/* ลักษณะ 2 */}
        <View style={[styles.row, styles.indent]}>
          <Text>2. ลักษณะ/มาตรฐาน</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>&nbsp;</Text>
          <Text>ประเภท</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>&nbsp;</Text>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text>จังหวัด</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>&nbsp;</Text>
          <Text>สี</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>&nbsp;</Text>
          <Text>โดยมีจำนวนเพลา</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>&nbsp;</Text>
          <Text>เพลา</Text>
          <Text> น้ำหนักลงเพลา</Text>
          <Text style={styles.underline_full}>&nbsp;</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>&nbsp;</Text>
          <Text>กิโลกรัม</Text>
          <Text> น้ำหนักรวม</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>&nbsp;</Text>
          <Text>กิโลกรัม</Text>
        </View>
        <View style={[styles.section, { marginTop: 15 }]}>
          <Text>หมายเหตุ โปรดระบุข้อมูลยานพาหนะทุกคันที่จะทำการขออนุญาต</Text>
        </View>
      </Page>
    </Document>
  )
}

const PermitForm: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer
        width={"100%"}
        height={"100%"}
      >
        <RenderDoc />
      </PDFViewer>
    </div>
  )
}

export default React.memo<Props>(PermitForm)
