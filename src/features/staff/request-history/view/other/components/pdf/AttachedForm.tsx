/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { AdminPetitionDetail } from '@/@types/reducer/petition';
import { FieldType } from '@/features/staff/request-list/approval/sign/components/FormDownloadTemplate';

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

const hyphenationCallback = (word: string) => {
  // Return word syllables in an array
  const splittedWord = word.split('');
  const result = [] as string[];
  for (const l of splittedWord) {
    result.push(l, '');
  }
  return result;
};

Font.registerHyphenationCallback(hyphenationCallback);

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "20mm 25mm 20mm 33mm",
    fontSize: 16,
    fontFamily: "THSarabunNew",
    lineHeight: 1.1,
    textAlign: "justify",
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    textAlign: "center"
  },
  section: {
    marginBottom: 10
  },
  main_paragraph: {
    textIndent: 70
  },
  sub_paragraph: {
    textIndent: 85
  },
  list: {
    padding: "0mm 18mm"
  },
  page_number: {
    position: 'absolute',
    top: 25,
    left: 35,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
  },
  list_item: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  list_number: {
    marginRight: 8,
  },
  list_text: {
    // Add any specific styling for your list text here
  },
  topic_view: {
    flexDirection: "row",
    gap: 5
  }
});

interface Props {
  data: AdminPetitionDetail;
  value: FieldType;
}

const AttachedForm: React.FC<Props> = (props) => {
  const { data, value } = props

  console.log(data, value)

  const convertToThaiAlp = useCallback((value: string) => {
    const defaultAlp = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const thaiAlp = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

    // Use replace() with a regular expression and a callback function
    const result = value.replace(/[0-9]/g, function (match) {
      // Find the index of the English digit and return the corresponding Thai digit
      const index = defaultAlp.indexOf(match);
      return thaiAlp[index];
    });

    return result;
  }, [])

  const convertToThaiNumber = useCallback((value: number) => {
    return new Intl.NumberFormat('th-TH-u-nu-thai').format(value)
  }, [])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.page_number}
          render={({ pageNumber }) => pageNumber === 1 ? '' : `- ${convertToThaiNumber(pageNumber)} -`}
        />
        <View style={[styles.header, { textAlign: "center" }]}>
          <Text style={{ fontWeight: "bold" }}>เงื่อนไขประกอบการอนุญาตให้ {data.document.business_name || 'บริษัท มามมุท (ประเทศไทย) จำกัด'} ใช้ยานพาหนะบางชนิด บางประเภทเดินบนทางหลวงชนบท เพื่อขนส่งเครื่องจักรและอุปกรณ์ขนาดใหญ่ จาก {data.estimate.route.start_point || 'ท่าเรือแหลมฉบัง จังหวัดชลบุรี'} ไปยัง {data.estimate.route.end_point || 'บริษัท ไทยออยล์ จำกัด (มหาชน)'} ผ่านทางหลวงชนบทสายทาง {data.estimate.route.start_road_code || 'ชบ.๓๐๐๙'} {data.estimate.route.start_road || 'แยกทางหลวงหมายเลข ๓๓๑ - ท่าเรือแหลมฉบัง อำเภอศรีราชา จังหวัดชลบุรี'} ช่วง กม.ที่ {convertToThaiAlp(value.start_km) || '๑๘+๗๐๐'} ถึง กม.ที่ {convertToThaiAlp(value.end_km) || '๑๙+๐๐๐'} ระยะทางรวม {convertToThaiNumber(value.distance) || '๐.๓๐๐'} กิโลเมตร</Text>
        </View>
        <View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑.</Text>
            <Text break>ช่วงเวลาในการขนส่งต้องไม่เป็นอุปสรรคต่อการจราจรบนทางหลวง</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒.</Text>
            <Text break>ประชาสัมพันธ์แก่ผู้ใช้เส้นทางทราบล่วงหน้าโดยผ่านทาง Social Media เช่น เฟชบุ๊ก (Facebook) ไลน์ (Line) เป็นต้น, ผ่านสถานีวิทยุ เช่น จส.๑๐๐, สวพ.๙๑ และวิทยุท้องถิ่น เป็นต้น พร้อมทั้งให้จัดป้ายประชาสัมพันธ์ก่อนการดำเนินการ</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๓.</Text>
            <Text break>ความเร็วในการเดินทางบนผิวจราจรต้องไม่เกิน ๕๐ กม./ชม. และเมื่อผ่านสะพานต้องใช้ความเร็วไม่เกิน ๑๐ กม./ชม. โดยเว้นระยะห่างของรถที่ใช้ในการขนส่งขณะขึ้นสะพาน ไม่น้อยกว่า ๑๐๐ เมตร</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๔.</Text>
            <Text break>การดำเนินการขนส่งของผู้ได้รับอนุญาต ในช่วงที่มีการขนส่งข้ามสะพานหรือจุดที่ต้องมีการปิดการจราจรเป็นช่วงระยะเวลาหนึ่ง ผู้ได้รับอนุญาต จะต้องจัดทำป้ายประชาสัมพันธ์, ป้ายเตือน, ป้ายแนะนำ ให้ผู้ใช้ทางหลีกเลี่ยงเส้นทางดังกล่าว</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๕.</Text>
            <Text break>ผู้ได้รับอนุญาตต้องจัดทำแผนการจราจรและแผนการขนส่งสินค้า ช่วงเวลาที่จะขนส่งผ่านตรงบริเวณที่ต้องมีการปิดการจราจรให้ชัดเจน <Text style={{ textDecoration: "underline" }}>เสนอให้แขวงทางหลวงชนบทหรือสำนักงานทางหลวงชนบทในพื้นที่และโครงการก่อสร้างในพื้นที่ (ถ้ามี) เพื่อให้ความเห็นชอบภายในระยะเวลา ๑๕ วันก่อนดำเนินการขนส่งสินค้า</Text> และต้องประสานเจ้าหน้าที่ตำรวจในพื้นที่เพื่ออำนวยความสะดวกในการจัดระเบียบการจราจร</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๖.</Text>
            <Text break> ผู้ได้รับอนุญาตต้องจัดเตรียมอุปกรณ์ เช่น ป้ายเตือน สัญญาณไฟเตือน รวมทั้งเจ้าหน้าที่คอยให้สัญญาณหรือคอยกันรถผู้ใช้ทางให้พร้อมตลอดช่วงดำเนินการขนส่ง</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๗.</Text>
            <Text break>การขนส่งในเวลากลางคืนและต้องมีการปิดการจราจร ผู้ได้รับอนุญาตจะต้องประสานงานกับเจ้าหน้าที่ตำรวจในพื้นที่ เพื่อขออนุญาตและอำนวยความสะดวกในการจัดระเบียบการจราจรด้วย และจะต้องเตือนผู้ใช้ทางด้วยสัญญาณไฟให้ชัดเจน โดยมีเจ้าหน้าที่เตือนผู้ใช้ทางให้ชะลอก่อนถึงจุดที่มีการปิดการจราจร</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๘.</Text>
            <Text break>ผู้ได้รับอนุญาตต้องจัดให้มีเครื่องหมายสัญญาณประจำตัวรถที่ทำการขนส่ง เพื่อเพิ่มมาตรการความปลอดภัยในการเดินทางให้รถที่ร่วมใช้เส้นทางมองเห็นได้ชัดเจน เช่น ป้ายสะท้อนแสงติดท้ายรถ หรือเปิดไฟกะพริบ</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๙.</Text>
            <Text break>การติดตั้งป้ายหรือสัญญาณจราจรต่าง ๆ ก่อนที่จะดำเนินการติดตั้ง หรือใช้งานจะต้องขออนุญาต จากหน่วยงานที่เกี่ยวข้องทุกครั้ง</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๐.</Text>
            <Text break>การขนส่งแต่ละครั้งต้องมีรถนำขบวนและมีรถปิดท้ายขบวน <Text style={{ textDecoration: "underline" }}>พร้อมทั้งมีรถในการอำนวยความสะดวกต่าง ๆ กรณีมีเหตุฉุกเฉินทันที</Text></Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๑.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องใช้รถบรรทุกตามที่หนังสืออนุญาตระบุไว้ และจะต้องบรรทุกตามพิกัดน้ำหนักลงเพลาตามรายละเอียดที่ได้ขออนุญาตไว้เท่านั้น</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๒.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องทำการสำรวจและตรวจสอบสภาพของถนน, สะพาน, ช่องลอด, ทางแยก, ทางเลี้ยว และทางโค้งของเส้นทางที่จะทำการขนส่ง แล้วจัดส่งผลการสำรวจและตรวจสอบให้กรมทางหลวงชนบทเห็นชอบก่อนดำเนินการขนส่ง ในกรณีที่ตรวจพบปัญหาอุปสรรคในการขนส่งหากมีความจำเป็นจะต้องรื้อย้าย หรือดัดแปลง ปรับปรุงอุปกรณ์งานทางหรือเปลี่ยนลักษณะทางกายภาพของทางหลวงชนบท ผู้ได้รับอนุญาตต้องเสนอวิธีการแก้ไขปัญหาอุปสรรค ให้กรมทางหลวงชนบทเห็นชอบก่อนดำเนินการขนส่ง และเมื่อทำการขนส่งเรียบร้อยแล้วจะต้องดำเนินการให้สิ่งที่ได้รื้อย้ายดัดแปลงหรือปรับปรุงไปนั้นกลับคืนสภาพเดิมภายในระยะเวลาที่กรมทางหลวงชนบทกำหนด</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๓.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องอำนวยความสะดวกและให้ความยินยอมให้เจ้าหน้าที่ของกรมทางหลวงชนบทเข้าไปตรวจสอบน้ำหนักบรรทุก หรือน้ำหนักลงเพลาของรถบรรทุกที่จะใช้ในการขนส่ง ณ สถานที่ที่ทำการขนส่งของผู้ได้รับอนุญาต</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>&nbsp;</Text>
            <Text break>ทั้งนี้ การอนุญาตตามหนังสือฉบับนี้จะมีผลสมบูรณ์ และผู้ขออนุญาตสามารถดำเนินการขนส่งได้ก็ต่อเมื่อ ผู้อนุญาตโดยเจ้าหน้าที่ผู้ได้รับมอบหมายได้ทำการตรวจสอบน้ำหนักบรรทุก หรือน้ำหนักลงเพลาของรถคันที่ใช้ในการขนส่งตามที่หนังสืออนุญาตระบุไว้ว่า มีพิกัดน้ำหนักบรรทุกไม่เกินตามที่หนังสืออนุญาตระบุไว้ และเจ้าหน้าที่ผู้ตรวจสอบได้ออกหลักฐานโดยลงลายมือชื่อรับรองการตรวจสอบว่าถูกต้องตามข้อกำหนดให้แล้ว หากผลการตรวจสอบไม่เป็นไปตามที่หนังสืออนุญาตระบุไว้ให้ถือว่าการอนุญาตสิ้นสุดลงทันที</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๔.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องประสานงานกับเจ้าหน้าที่ผู้ได้รับมอบหมายจากกรมทางหลวงชนบท ณ จุดตรวจที่กำหนดไว้ เพื่อตรวจสอบวิธีการขนส่งตามเงื่อนไขที่ระบุในหนังสืออนุญาต หากตรวจสอบแล้วพบว่าไม่เป็นไปตามเงื่อนไข เจ้าหน้าที่ผู้ได้รับมอบหมายมีอำนาจระงับการขนส่งได้ทันที จนกว่าผู้ได้รับอนุญาตจะปฏิบัติตามเงื่อนไข จึงจะอนุญาตให้ดำเนินการขนส่งต่อไป</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๕.</Text>
            <Text break>ห้ามผู้ได้รับอนุญาตใช้ผิวทางจราจรในการจอดรถเพื่อหยุดพัก</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๖.</Text>
            <Text break>กรมทางหลวงชนบทอนุญาตให้ใช้เส้นทางในการขนส่งเฉพาะเส้นทางที่อยู่ในความรับผิดชอบของกรมทางหลวงชนบทเท่านั้น ในกรณีที่ผู้ได้รับอนุญาตขนส่งผ่านเส้นทางที่อยู่ในความรับผิดชอบของหน่วยงานอื่น ผู้ขออนุญาตต้องไปขออนุญาตกับหน่วยงานนั้น ๆ</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๗.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องมีเครื่องมือหรืออุปกรณ์ที่มีมาตรฐานสำหรับการตรวจสอบค่าน้ำหนัก, ความกว้าง, ความยาว และความสูง ของรถบรรทุกที่ขออนุญาตใช้ในการขนส่ง</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๘.</Text>
            <Text break>ผู้ได้รับอนุญาตต้องจัดทำรายงาน ก่อนการขนส่ง ระหว่างการขนส่ง และหลังการขนส่งตามที่กรมทางหลวงชนบทกำหนดแล้วจัดส่งให้กรมทางหลวงชนบท<Text style={{ textDecoration: "underline" }}>ทุก ๓ เดือน</Text> หลังจากได้รับอนุญาต</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๑๙.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องปฏิบัติตามคำสั่งกรมทางหลวงชนบท ในกรณีที่กรมทางหลวงชนบทขอความร่วมมือในช่วงเทศกาล ให้รถบรรทุกทุกประเภทหยุดวิ่งบนทางหลวงชนบท</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๐.</Text>
            <Text break>ผู้ได้รับอนุญาตต้องปฏิบัติตามกฎหมายอื่น ๆ ที่เกี่ยวข้อง</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๑.</Text>
            <Text break>หากการขนส่งเป็นอุปสรรคต่อการดำเนินงานของกรมทางหลวงชนบท กรมทางหลวงชนบทขอสงวนสิทธิ์ที่จะยกเลิกการอนุญาตนี้</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๒.</Text>
            <Text break>ในกรณีที่เกิดความเสียหายต่อทรัพย์สินของกรมทางหลวงชนบท ของส่วนราชการอื่น หรือของบุคคลภายนอก ผู้ได้รับอนุญาตต้องรับผิดชอบซ่อมแซม หรือชดใช้ค่าเสียหายรวมทั้งค่าใช้จ่ายที่เกิดขึ้นทั้งหมด</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๓.</Text>
            <Text break>ในกรณีการซ่อมแซมทรัพย์สินของกรมทางหลวงชนบทส่วนที่ชำรุดเสียหายให้อยู่ในสภาพเดิมต้องเป็นไปตามมาตรฐานของกรมทางหลวงชนบท</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๔.</Text>
            <Text break>ผู้ได้รับอนุญาตจะต้องเสนอแผนการตรวจสอบความเสียหายที่จะเกิดขึ้นกับโครงสร้างทางและสะพานให้กรมทางหลวงชนบทพิจารณาให้ความเห็นชอบ และให้จัดทำรายงานการตรวจติดตามสภาพของโครงสร้างทางและสะพาน เสนอให้กรมทางหลวงชนบททุก ๓ เดือน โดยให้วิศวกรโยธาตั้งแต่ระดับสามัญขึ้นไปเป็นผู้รับรองรายงานดังกล่าว</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๕.</Text>
            <Text break>ในกรณีที่เกิดความเสียหายต่อโครงสร้างทางและสะพานภายหลังจากที่ได้รับอนุญาต ซึ่งความเสียหายนั้นเกิดจากการขนส่งสินค้าของผู้ได้รับอนุญาต ผู้ได้รับอนุญาตจะต้องรับผิดชอบต่อความเสียหายที่เกิดขึ้นทั้งหมด</Text>
          </View>
          <View style={styles.topic_view}>
            <Text style={{ width: 20 }}>๒๖.</Text>
            <Text break>หากผู้ได้รับอนุญาตไม่ปฏิบัติตามเงื่อนไขข้อใดข้อหนึ่ง กรมทางหลวงชนบทมีอำนาจที่จะยกเลิกหนังสืออนุญาตได้ทันที โดยผู้ได้รับอนุญาตไม่สามารถเรียกร้องสิทธิหรือค่าเสียหายใด ๆ ทั้งสิ้น</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default React.memo<Props>(AttachedForm)
