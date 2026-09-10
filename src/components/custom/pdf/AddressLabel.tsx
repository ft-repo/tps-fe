/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'THSarabunNew',
  fonts: [
    {
      src: '/fonts/THSarabunNew Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold'
    },
    {
      src: '/fonts/THSarabunNew BoldItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    {
      src: '/fonts/THSarabunNew Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/THSarabunNew.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  ]
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'THSarabunNew',
    padding: '16mm 0 0 16mm',
  },
  label: {
    width: '120mm',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    borderBottomColor: '#888',
    paddingBottom: 4,
    marginBottom: 18,
    fontSize: 16,
    minHeight: 24,
  },
  postalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  circle: {
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: '#888',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 13,
  },
})

interface Props {
  postalCode?: string
}

const AddressLabel: React.FC<Props> = ({ postalCode = '10220' }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.label}>
          <Text style={styles.title}>ชื่อผู้รับ</Text>
          <Text style={styles.line}>กรมทางหลวงชนบท สำนักบำรุงทาง</Text>
          <Text style={styles.line}>เลขที่ 9 ถนนพหลโยธิน</Text>
          <Text style={styles.line}>แขวงอนุสาวรีย์ เขตบางเขน กทม. 10220</Text>
          <Text style={styles.line}> </Text>
          <View style={styles.postalRow}>
            <Text style={styles.labelText}>รหัสไปรษณีย์</Text>
            {postalCode.split('').map((digit, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles.circleText}>{digit}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default React.memo<Props>(AddressLabel)
