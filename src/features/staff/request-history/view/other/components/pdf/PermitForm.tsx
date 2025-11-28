/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Rect, Svg, Path } from '@react-pdf/renderer';
import { AdminPetitionExtendedDetail } from '@/@types/reducer/petition';
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra); // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.
dayjs.locale("th");

Font.register({
  family: "THSarabunNew",
  fonts: [
    {
      src: "/fonts/THSarabunNew Bold.ttf",
      fontStyle: "normal",
      fontWeight: "bold"
    },
    {
      src: "/fonts/THSarabunNew BoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: "bold"
    },
    {
      src: '/fonts/THSarabunNew Italic.ttf',
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: '/fonts/THSarabunNew.ttf',
      fontWeight: "normal",
      fontStyle: "normal",
    },
  ]
})

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "20mm 25mm 20mm 25mm",
    fontSize: "14px",
    fontFamily: "THSarabunNew",
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

const permit_styles = StyleSheet.create({
  page: {
    padding: "20mm 25mm 20mm 25mm",
    fontSize: "14px",
    fontFamily: "THSarabunNew"
  },
  title_section: {
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sign_section: {
    marginTop: 16,
    marginRight: 16,
    alignItems: "flex-end"
  },

  signature_row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 2
  },

  signature_field: {
    minWidth: 160,
    alignItems: "center"
  },

  signature_underline: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000",
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 4
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginBottom: 5
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
  label_text: {
    width: 300,
    flexDirection: "row",
    gap: 4,
    alignItems: "flex-start"
  }
});

interface Props {
  data: AdminPetitionExtendedDetail;
}

const PermitForm: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* จ่าหน้า */}
        <View style={styles.header_section}>
          <Text>ม.61_ทช.03</Text>
        </View>
        {/* หัวข้อ */}
        <View style={styles.title_section}>
          <Text style={{ fontWeight: "bold" }}>แบบขออนุญาต</Text>
          <Text style={{ fontWeight: "bold" }}>ให้ยานพาหนะเดินบนทางหลวงชนบท</Text>
          <Text style={{ fontWeight: "bold" }}>ตามประกาศ ผู้อำนวยการทางหลวงชนบท ม.61 หมวด 2 ข้อ 16(1),16(2),16(3),16(4),16(5)</Text>
        </View>
        {/* เขียนที่ */}
        <View style={styles.date_section}>
          <Text>เขียนที่</Text>
          <Text style={styles.underline_long}>{data?.user_created?.business_details?.business_name || '-'}</Text>
        </View>
        {/* วันที่ */}
        <View style={styles.date_section}>
          <Text>วันที่</Text>
          <Text style={styles.underline_short}>{dayjs(data?.created_at).format('DD') || '-'}</Text>
          <Text>เดือน</Text>
          <Text style={styles.underline_short}>{dayjs(data?.created_at).format('MMMM') || '-'}</Text>
          <Text>พ.ศ.</Text>
          <Text style={styles.underline_short}>{dayjs(data?.created_at).format('BBBB') || '-'}</Text>
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
                {/* <Path
                  d="M 2 6 L 5 9 L 10 3"
                  stroke="black"
                  strokeWidth="1.5"
                  fill="none"
                /> */}
              </Svg>
            </View>
            <Text style={styles.label}>บุคคลธรรมดา</Text>
            <Text>ชื่อ</Text>
            <Text style={styles.underline_full}>&nbsp;</Text>
          </View>

          <View style={styles.row}>
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
              <Path
                d="M 2 6 L 5 9 L 10 3"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
              />
            </Svg>
            <Text style={styles.label}>นิติบุคคล</Text>
            <Text>ชื่อ</Text>
            <Text style={styles.underline_full}>{data?.user_created?.business_details?.business_name || '-'}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.indent]}>
          <Text>ข้าพเจ้า (นาย/นาง/นางสาว)</Text>
          <Text style={styles.underline_long}>{'-'}</Text>
          <Text>นามสกุล</Text>
          <Text style={styles.underline_full}>{'-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>เจ้าของยานพาหนะหรือตัวแทน เจ้าของยานพาหนะ อยู่บ้านเลขที่</Text>
          <Text style={styles.underline_long}>{data?.address?.contact_house_number || '-'}</Text>
          <Text>หมู่ที่</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_village || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>ถนน</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_road || '-'}</Text>
          <Text>ตรอก/ซอย</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_lane || '-'}</Text>
          <Text>แขวง/ตำบล</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_sub_district?.name_th || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>เขต/อำเภอ</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_district?.name_th || '-'}</Text>
          <Text>จังหวัด</Text>
          <Text style={styles.underline_full}>{data?.address?.contact_province?.name_th || '-'}</Text>
          <Text>โทรศัพท์</Text>
          <Text style={styles.underline_full}>{data?.phone_number || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>นิติบุคคลประเภท</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_details?.entity_type_id || '-'}</Text>
          <Text>จดทะเบียนเมื่อ</Text>
          <Text style={styles.underline_full}>{dayjs(data?.user_created?.created_at).format('DD MMMM BBBB') || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={[styles.underline_custom, { minWidth: 170 }]}>{data?.user_created?.registration_no || '-'}</Text>
          <Text>อยู่เลขที่</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.house_number || '-'}</Text>
          <Text>หมู่ที่</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.village || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>ถนน</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.road || '-'}</Text>
          <Text>ตรอก/ซอย</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.lane || '-'}</Text>
          <Text>แขวง/ตำบล</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.sub_district?.name_th || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text>เขต/อำเภอ</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.district?.name_th || '-'}</Text>
          <Text>จังหวัด</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.province?.name_th || '-'}</Text>
          <Text>โทรศัพท์</Text>
          <Text style={styles.underline_full}>{data?.user_created?.business_address?.phone_number || '-'}</Text>
        </View>
        <View style={[styles.row, styles.indent]}>
          <Text>ขอยื่นคำขออนุญาตให้ยานพาหนะเดืนบนทางหลวงชนบท ตามประกาศผู้อำนวยการทางหลวงฯ หมวด 2</Text>
        </View>
        <View style={styles.row}>
          <Text>ข้อ</Text>
          <Text style={styles.underline_long}>{data?.ref_form_no || <>&nbsp;</>}</Text>
          <Text>ต่ออธิการบดีกรมทางหลวงชนบท เพื่อ (เหตุผลที่ขอ)</Text>
          <Text style={styles.underline_full}>{data?.remark || <>&nbsp;</>}</Text>
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
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>รถลากจูง</Text>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={styles.underline_full}>{data?.vehicle?.towing_vehicle?.plate_no || <>&nbsp;</>}</Text>
        </View>
        <View style={styles.row}>
          <Text>จังหวัด</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>{data?.vehicle?.towing_vehicle?.plate_province || <>&nbsp;</>}</Text>
          <Text>สี</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>{data?.vehicle?.towing_vehicle?.color || <>&nbsp;</>}</Text>
          <Text>โดยมีจำนวนเพลา</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>{data?.vehicle?.towing_vehicle?.axis_number || <>&nbsp;</>}</Text>
          <Text>เพลา</Text>
          <Text> น้ำหนักลงเพลา</Text>
          <Text style={styles.underline_full}>{data?.vehicle?.axis_weight_towing[0] || 0} {data?.vehicle?.axis_weight_towing[1] || 0}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_towing[2] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_towing[3] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_towing[4] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_towing[5] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_towing[6] || 0}</Text>
          <Text>กิโลกรัม</Text>
          <Text> น้ำหนักรวม</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>{data?.vehicle?.towing_vehicle?.weight || <>&nbsp;</>}</Text>
          <Text>กิโลกรัม</Text>
        </View>
        {/* ลักษณะ 2 */}
        <View style={[styles.row, styles.indent]}>
          <Text>2. ลักษณะ/มาตรฐาน</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>&nbsp;</Text>
          <Text>ประเภท</Text>
          <Text style={[styles.underline_custom, { minWidth: 100 }]}>รถกึ่งพ่วง</Text>
          <Text>เลขที่ทะเบียน</Text>
          <Text style={styles.underline_full}>{data?.vehicle?.semi_trailer_vehicle?.plate_province || <>&nbsp;</>}</Text>
        </View>
        <View style={styles.row}>
          <Text>จังหวัด</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>{data?.vehicle?.semi_trailer_vehicle?.plate_province || <>&nbsp;</>}</Text>
          <Text>สี</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>{data?.vehicle?.semi_trailer_vehicle?.color || <>&nbsp;</>}</Text>
          <Text>โดยมีจำนวนเพลา</Text>
          <Text style={[styles.underline_custom, { minWidth: 50 }]}>{data?.vehicle?.semi_trailer_vehicle?.axis_number || <>&nbsp;</>}</Text>
          <Text>เพลา</Text>
          <Text> น้ำหนักลงเพลา</Text>
          <Text style={styles.underline_full}>{data?.vehicle?.axis_weight_semi_trailer[0] || 0} {data?.vehicle?.axis_weight_semi_trailer[1] || 0}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_semi_trailer[2] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_semi_trailer[3] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_semi_trailer[4] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_semi_trailer[5] || 0}</Text>
          <Text>-</Text>
          <Text style={[styles.underline_custom, { minWidth: 40 }]}>{data?.vehicle?.axis_weight_semi_trailer[6] || 0}</Text>
          <Text>กิโลกรัม</Text>
          <Text> น้ำหนักรวม</Text>
          <Text style={[styles.underline_custom, { minWidth: 60 }]}>{data?.vehicle?.semi_trailer_vehicle?.weight || <>&nbsp;</>}</Text>
          <Text>กิโลกรัม</Text>
        </View>
        <View style={[styles.section, { flexDirection: "row", gap: 3, marginTop: 15 }]}>
          <Text style={{ fontWeight: "bold" }}>หมายเหตุ</Text> <Text>โปรดระบุข้อมูลยานพาหนะทุกคันที่จะทำการขออนุญาต</Text>
        </View>
        <View style={[styles.section, { textAlign: "right" }]}>
          <Text>/พร้อมนี้...</Text>
        </View>
      </Page>
      {/* PAGE2 */}
      <Page size="A4" style={permit_styles.page}>
        <View style={permit_styles.title_section}>
          <Text>-2-</Text>
          <Text>พร้อมนี้ได้แนบหลักฐานและเอกสารเพื่อประกอบการพิจารณาตามหลักเกณฑ์ที่กำหนดดังนี้</Text>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>สำเนาบัตรประชาชน</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>สำเนาหนังสือรับรองนิติบุคคล</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>แบบคำขออนุญาตให้ยานพาหนะบางชนิด บางประเภอ เดินบนทางหลวงชนบท</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>หนังสือมอบอำนาจพร้อมตราประทับของผู้มีอำนาจลงนามแทนบริษัทหรือห้างหุ้นส่วน</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>สำเนาคู่มือจดทะเบียนและประวัติยานพาหนะที่ขออนุญาต เช่น รถลากจูงรถกึ่งพ่วง พร้อมหลักฐานฉบับจริงต่อเจ้าหน้าที่เพื่อตรวจสอบ</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รูปถ่ายสียานพาหนะ</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รูปแบบยานพาหนะโดบแสดงถึงมิติของรถรวมสิ่งของบรรทุก (กว้าง, ยาว, สูง) น้ำหนักลงเพลา เมื่อมีการบรรทุกสิ่งของแล้ว</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>กรณีที่มีชิ้นส่วนสำเร็จรูปจำนวนมากให้แสดงจำนวนชิ้น ขนาดมิติ และน้ำหนัก พร้อมจำนวนเที่ยวที่ต้องการขนส่ง</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รูปแบบยานพาหนะโดยมีรัศมีวงเลี้ยว</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานที่อยู่ในเส้นทางที่ต้องการขออนุญาต เมื่อมีการบรรทุกน้ำหนักแล้ว</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>หนังสือรับรองของวิศวกรโยธาผู้คำนวนโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยวพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>รูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง (ถ้ามี)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>แผนที่เส้นทางเดินบนทางหลวง (ถ้ามี)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>แผนและระยะเวลาการดำเนินงาน</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.section}>
          <View style={permit_styles.label_text}>
            <Text>[  ]</Text>
            <Text>ที่อยู่และอีเมล์ในการจัดส่งเอกสาร (ถ้ามี)</Text>
          </View>
          <View style={permit_styles.row}>
            <Text>จำนวน</Text>
            <Text style={permit_styles.underline_short}>&nbsp;</Text>
            <Text>ชุด</Text>
          </View>
        </View>
        <View style={permit_styles.sign_section}>
          <View style={permit_styles.signature_row}>
            <Text>ลงชื่อ</Text>
            <View style={permit_styles.signature_field}>
              <Text style={permit_styles.signature_underline}>&nbsp;</Text>
            </View>
          </View>

          <View style={permit_styles.signature_row}>
            <Text style={{ color: 'transparent' }}>ลงชื่อ</Text>
            <Text>(</Text>
            <View style={permit_styles.signature_field}>
              <Text style={permit_styles.signature_underline}>&nbsp;</Text>
            </View>
            <Text>)</Text>
          </View>

          <View style={permit_styles.signature_row}>
            <Text style={{ color: 'transparent' }}>ลงชื่อ</Text>
            <View style={permit_styles.signature_field}>
              <Text style={{ textAlign: 'center' }}>ผู้ขออนุญาต</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default React.memo<Props>(PermitForm)
