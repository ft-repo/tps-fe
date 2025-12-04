/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { AdminPetitionDetail, AxisType, VehicleList } from '@/@types/reducer/petition';
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
// import { APIResponseRegion } from '@/@types/shared';
// import axios from 'axios';
import { FieldType } from '@/features/staff/request-list/approval/sign/components/FormDownloadTemplate';
import GovLogo from '@/assets/img/GovLogo.jpg'

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
    padding: "20mm 17mm 20mm 33mm",
    fontSize: 16,
    fontFamily: "THSarabunNew",
    lineHeight: 1.1,
    textAlign: "justify"
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
});

interface Props {
  data: AdminPetitionDetail;
  value: FieldType;
}

interface GroupedVehicle {
  axis_type: AxisType;
  plates: string[];
}

const ApproveForm: React.FC<Props> = (props) => {
  const { data, value } = props;

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

  // const getRegion = useCallback(async (lat: number, lng: number) => {
  //   try {
  //     const response = await axios.get<APIResponseRegion>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`)
  //     if (response.status === 200) {
  //       console.log(response.data)
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message)
  //     } else {
  //       console.error(error)
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   const [lat, lng] = data.estimate.route.start_road.split(',').slice(0, 2).map(s => parseFloat(s.trim()));

  //   getRegion(lat, lng)
  // }, [getRegion, data.estimate.route.start_road])

  const mapTowing = useCallback((data: VehicleList[]): Record<string, GroupedVehicle> => {
    const groups: any = {};
    data.forEach(item => {
      if (item.towing_vehicle?.axis_type?.name) {
        const name = item.towing_vehicle.axis_type.name;
        if (!groups[name]) {
          groups[name] = {
            axis_type: item.towing_vehicle.axis_type,
            plates: []
          };
        }
        const plateInfo = `${item.towing_vehicle.plate_no} ${item.towing_vehicle.plate_province}`;
        if (!groups[name].plates.includes(plateInfo)) {
          groups[name].plates.push(plateInfo);
        }
      }
    });
    return groups;
  }, []);

  // จัดกลุ่มข้อมูล semi_trailer_vehicle ตาม axis_type.name
  const mapSemiTrailer = useCallback((data: VehicleList[]): Record<string, GroupedVehicle> => {
    const groups: any = {};
    data.forEach(item => {
      if (item.semi_trailer_vehicle?.axis_type?.name) {
        const name = item.semi_trailer_vehicle.axis_type.name;
        if (!groups[name]) {
          groups[name] = {
            axis_type: item.semi_trailer_vehicle.axis_type,
            plates: []
          };
        }
        const plateInfo = `${item.semi_trailer_vehicle.plate_no} ${item.semi_trailer_vehicle.plate_province}`;
        if (!groups[name].plates.includes(plateInfo)) {
          groups[name].plates.push(plateInfo);
        }
      }
    });
    return groups;
  }, []);

  const towing = mapTowing(data.vehicle.vehicle_list);
  const semi = mapSemiTrailer(data.vehicle.vehicle_list);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.page_number}
          // render={({ pageNumber, totalPages }) =>
          //   pageNumber === 1
          //     ? ''
          //     : `${convertToThaiNumber(pageNumber)} / ${convertToThaiNumber(totalPages)}`
          // }
          render={({ pageNumber }) => pageNumber === 1 ? '' : `- ${convertToThaiNumber(pageNumber)} -`}
        />
        <View style={styles.header}>
          <Text
            style={{
              paddingTop: 70
            }}
          >
            ที่ คค ๐๗๒๔.๕/
          </Text>
          <Image
            src={GovLogo}
            style={{
              width: 80,
              height: 80,
              marginLeft: 40
            }}
          />
          <Text
            style={{
              width: 110,
              textAlign: "left",
              paddingTop: 50
            }}
          >
            กรมทางหลวงชนบท เลขที่ ๙ ถนนพหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพมหานคร ๑๐๒๒๐
          </Text>
        </View>
        <View style={[styles.title, { marginBottom: 10 }]}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>หนังสืออนุญาต</Text>
          <Text style={{ marginLeft: 80 }}>{convertToThaiAlp(dayjs().format('DD MMMM BBBB'))}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.main_paragraph}>
            ตามที่ {data.document.business_name || 'บริษัท มามมุท (ประเทศไทย) จำกัด'} มีความจำเป็นต้องขนส่งเครื่องจักรและอุปกรณ์
            ขนาดใหญ่ จาก {convertToThaiAlp(data.estimate.route.start_point) || 'ท่าเรือแหลมฉบัง จังหวัดชลบุรี'} ไปยัง {convertToThaiAlp(data.estimate.route.end_point) || 'บริษัท ไทยออยส์ จำกัด (มหาชน)'} ผ่านทางหลวงชนบท
            สายทาง {convertToThaiAlp(data.estimate.route.start_road_code) || 'ชบ.๓๐๐๙'} {convertToThaiAlp(data.estimate.route.start_road) || 'แยกทางหลวงหมายเลข ๓๓๑ - ท่าเรือแหลมฉบัง อำเภอศรีราชา จังหวัดชลบุรี'} ช่วง กม.ที่
            {' '}{convertToThaiAlp(value.start_km as string) || '๑๘๗๐๐'} ถึง กม.ที่ {convertToThaiAlp(value.end_km as string) || '๑๙+๐๐'} ระยะทาง {convertToThaiNumber(value.distance as number) || '๐.๓๐๐'} กิโลเมตร นั้น
          </Text>
          <Text style={styles.main_paragraph}>กรมทางหลวงชนบทพิจารณาแล้ว อนุญาตให้<Text>{data.document.business_name || 'บริษัท มามมุท (ประเทศไทย) จำกัด'}</Text> ใช้ยานพาหนะตามข้อกำหนด ดังต่อไปนี้</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.main_paragraph}>๑. ยานพาหนะที่อนุญาตให้ใช้ในการขนส่งมีดังนี้</Text>
          {Object.entries(towing).map(([name, type]: [string, GroupedVehicle], index) => {
            console.log(name)
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.sub_paragraph}>๑.{convertToThaiNumber(index + 1)} รถลากจูงประเภท{convertToThaiAlp(type.axis_type.name) || 'รถลากจูงประเภท ๓ เพลา 5 ล้อ ยาง ๑๐ เส้น'}</Text>
                <Text>ตามหมายเลขทะเบียนรถดังนี้</Text>
                <Text style={styles.list}>
                  {type.plates.map((item: string, index: number) => {
                    if (index === type.plates.length - 1) {
                      return convertToThaiAlp(item)
                    } else {
                      return convertToThaiAlp(item) + ', '
                    }
                  })}
                </Text>
              </View>
            )
          })}
          {Object.entries(semi).map(([name, type]: [string, GroupedVehicle], index) => {
            const towingCount = Object.keys(towing).length;
            console.log(name)
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.sub_paragraph}>๑.{convertToThaiNumber(towingCount + index + 1)} รถพ่วงประเภท{convertToThaiAlp(type.axis_type.name) || 'รถพ่วงประเภท ๑๐ แถว ๒๐ เพลา ๔๐ ล้อ ยาง ๘๐ เส้น'}</Text>
                <Text>ตามหมายเลขทะเบียนรถดังนี้</Text>
                <Text style={styles.list}>
                  {type.plates.map((item: string, index: number) => {
                    if (index === type.plates.length - 1) {
                      return convertToThaiAlp(item)
                    } else {
                      return convertToThaiAlp(item) + ', '
                    }
                  })}
                </Text>
              </View>
            )
          })}
          {/* <View>
            <Text style={styles.sub_paragraph}>๑.๑  รถลากจูงประเภท ๓ เพลา 5 ล้อ ยาง ๑๐ เส้น</Text>
            <Text>ตามหมายเลขทะเบียนรถดังนี้</Text>
            <Text style={styles.list}>๐-๔๑๘๙ ระยอง, ๗๑-๑๐๓๐ ระยอง, ๗๑-๘๐๓๑ ระยอง,</Text>
          </View>
          <View>
            <Text style={styles.sub_paragraph}>๑.๒ รถพ่วงประเภท ๑๐ แถว ๒๐ เพลา ๔๐ ล้อ ยาง ๘๐ เส้น</Text>
            <Text>ตามหมายเลขทะเบียนรถดังนี้</Text>
            <Text style={styles.list}>๐-๔๑๘๙ ระยอง, ๗๑-๑๐๓๐ ระยอง, ๗๑-๘๐๓๑ ระยอง,</Text>
          </View> */}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.main_paragraph}>๒. พิกัดน้ำหนักในการบรรทุกจะต้องไม่เกินตามที่กำหนดให้ดังนี้</Text>
          {Object.entries(towing).map(([name, type]: [string, GroupedVehicle], index) => {
            console.log(name)
            const maxCarryWeight = type.axis_type.max_carry_weight;

            return (
              <Text key={`towing-${index}`} style={styles.sub_paragraph}>
                ๒.{convertToThaiNumber(index + 1)} รถลากจูง ตามข้อ ๑.{convertToThaiNumber(index + 1)} มีน้ำหนักยานพาหนะรวมน้ำหนักบรรทุกไม่เกิน {convertToThaiNumber(maxCarryWeight)} กิโลกรัม
              </Text>
            );
          })}
          {Object.entries(semi).map(([name, type]: [string, GroupedVehicle], index) => {
            console.log(name)
            const towingCount = Object.keys(towing).length;
            const maxCarryWeight = type.axis_type.max_carry_weight;

            return (
              <Text key={`semi-${index}`} style={styles.sub_paragraph}>
                ๒.{convertToThaiNumber(towingCount + index + 1)} รถพ่วง ตามข้อ ๑.{convertToThaiNumber(towingCount + index + 1)} มีน้ำหนักยานพาหนะรวมน้ำหนักบรรทุกไม่เกิน {convertToThaiNumber(maxCarryWeight)} กิโลกรัม
              </Text>
            );
          })}
          {/* <Text style={styles.sub_paragraph}>๒.๑ รถลากจูง ตามข้อ ๑.๑ มีน้ำหนักยานพาหนะรวมน้ำหนักบรรทุกไม่เกิน ๒๕,๐๐๐ กิโลกรัม</Text> */}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.main_paragraph}>๓. ประเภทสินค้าที่ขนส่ง</Text>
          {data.vehicle.vehicle_list.map((vehicle, vehicleIndex) => {
            // Only show items that have etc_vehicle (cargo/machinery)
            if (!vehicle.etc_vehicle) return null;

            // Build reference numbers based on what vehicles are present
            const references: string[] = [];

            // Find which towing group this vehicle belongs to
            if (vehicle.towing_vehicle?.axis_type?.name) {
              const towingGroups = Object.keys(towing);
              const towingIndex = towingGroups.findIndex(name => name === vehicle.towing_vehicle?.axis_type?.name);
              if (towingIndex !== -1) {
                references.push(`๑.${new Intl.NumberFormat('th-TH-u-nu-thai').format(towingIndex + 1)}`);
              }
            }

            // Find which semi group this vehicle belongs to
            if (vehicle.semi_trailer_vehicle?.axis_type?.name) {
              const semiGroups = Object.keys(semi);
              const semiIndex = semiGroups.findIndex(name => name === vehicle.semi_trailer_vehicle?.axis_type?.name);
              if (semiIndex !== -1) {
                const towingCount = Object.keys(towing).length;
                references.push(`๑.${new Intl.NumberFormat('th-TH-u-nu-thai').format(towingCount + semiIndex + 1)}`);
              }
            }

            const referenceText = references.length > 0 ? ` ใช้กับยานพาหนะ ตามข้อ ${references.join(', ')}` : '';

            return (
              <Text key={vehicleIndex} style={styles.sub_paragraph}>
                {/* ๓.{new Intl.NumberFormat('th-TH-u-nu-thai').format(vehicleIndex + 1)} {vehicle.etc_vehicle.plate_no} ขนาด กว้าง {convertToThaiAlp(vehicle.etc_vehicle.width?.toString() || '0')} เมตร ยาว {convertToThaiAlp(vehicle.etc_vehicle.length?.toString() || '0')} เมตร สูง {convertToThaiAlp(vehicle.etc_vehicle.height?.toString() || '0')} เมตร มีน้ำหนัก {convertToThaiAlp((vehicle.etc_vehicle.weight / 1000).toFixed(2))} ตัน{referenceText} */}
                ๓.{convertToThaiNumber(vehicleIndex + 1)} {vehicle.etc_vehicle.plate_no} ขนาด กว้าง {vehicle.etc_vehicle.width ? convertToThaiNumber(vehicle.etc_vehicle.width || 0) : '...............'} เมตร ยาว {vehicle.etc_vehicle.length ? convertToThaiNumber(vehicle.etc_vehicle.length || 0) : '...............'} เมตร สูง {vehicle.etc_vehicle.height ? convertToThaiNumber(vehicle.etc_vehicle.height || 0) : '...............'} เมตร มีน้ำหนัก {convertToThaiNumber(vehicle.etc_vehicle.weight || 0)} ตัน{referenceText}
              </Text>
            );
          })}
          {/* <Text style={styles.sub_paragraph}>๓.๑ AFC/2nd Stage HP/MT Flash Gas ขนาด กว้าง ๕.๔๐ เมตร ยาว ๑๓.๓๙ เมตร สูง ๔.๕๐ เมตร มีน้ำหนัก ๔๔.๐๓ ตัน ใช้กับยานพาหนะ ตามข้อ ๑.๑, ๑.</Text> */}
        </View>
        <View>
          <Text style={styles.main_paragraph}>
            ๔.  ผ่านเส้นทางของกรมทางหลวงชนบทจำนวน ๑ สาย สายทาง {convertToThaiAlp(data.estimate.route.start_road_code) || 'ชบ.๓๐๐๙'} {convertToThaiAlp(data.estimate.route.start_road) || 'แยกทางหลวงหมายเลข ๓๓๑ - ท่าเรือแหลมฉบัง อำเภอศรีราชา จังหวัดชลบุรี'}
            ช่วง กม.ที่ {convertToThaiAlp(value.start_km as string) || '๑๘๗๐๐'} ถึง กม.ที่ {convertToThaiAlp(value.end_km as string) || '๑๙+๐๐'} ระยะทาง
            {' '}{convertToThaiNumber(value.distance as number) || '๐.๓๐๐'} กิโลเมตร รวมระยะทางที่ผ่านทั้งสิ้น {convertToThaiNumber(value.distance as number) || '๐.๓๐๐'} กิโลเมตร ตามที่ขออนุญาตได้ ภายในระยะเวลา ๑ ปี
            นับจากวันที่ได้รับอนุญาต โดยผู้ได้รับอนุญาตฯ จะต้องปฏิบัติตามเงื่อนไขการขออนุญาตใช้ยานพาหนะบางชนิด
            บางประเภทเดินบนทางหลวงชนบท จำนวน ๒๖ ข้อ ที่แนบมาพร้อมนี้
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default React.memo<Props>(ApproveForm)
