/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { ExtendedETCVehicleDetail } from '@/@types/reducer/petition'
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import React, { useCallback } from 'react'

interface Props {

}

const VehicleDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const renderAxisWeight = useCallback((arr: number[]) => {
    if (!arr?.length) return '-'
    return arr.join(' : ')
  }, [])

  const renderLicensePlate = useCallback((plateNo: string, plateProvince: string) => {
    const licenseArr = [plateNo, plateProvince]
    if (!licenseArr?.length) return '-'
    return licenseArr.join(' ').trim()
  }, [])

  const towering_vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>{renderLicensePlate(detail?.vehicle?.towing_vehicle?.plate_no, detail?.vehicle?.towing_vehicle?.plate_province)}</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>{detail?.vehicle?.towing_vehicle?.weight || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>{renderAxisWeight(detail?.vehicle?.axis_weight_towing)}</p>,
    },
  ];

  const semi_trailer_vehicle: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เลขทะเบียน / เลขตัวรถ',
      children: <p>{renderLicensePlate(detail?.vehicle?.semi_trailer_vehicle?.plate_no, detail?.vehicle?.semi_trailer_vehicle?.plate_province)}</p>,
    },
    {
      key: '2',
      label: 'น้ำหนัก (กิโลกรัม)',
      children: <p>{detail?.vehicle?.semi_trailer_vehicle?.weight || '-'}</p>,
    },
    {
      key: '3',
      label: 'น้ำหนักลงเพลา (กิโลกรัม)',
      children: <p>{renderAxisWeight(detail?.vehicle?.axis_weight_semi_trailer)}</p>,
    },
  ];

  const renderETC = useCallback((value: ExtendedETCVehicleDetail[]) => {
    const arr = []
    if (value.length) {
      for (const etc_id of value) {
        arr.push(etc_id)
      }
    }
    if (arr.length) {
      return arr.map((item, index) => {
        // DESCRIPTION
        const product: DescriptionsProps['items'] = [
          {
            key: '1',
            label: 'ชื่อเครื่องจักร / สินค้า',
            children: item?.etc_vehicle?.plate_no || '-',
          },
          {
            key: '2',
            label: 'น้ำหนัก (กิโลกรัม)',
            children: item?.etc_vehicle?.weight || 0,
          },
        ];
        // COMPONENTS
        return (
          <section key={index} className='mt-3'>
            <Descriptions
              title="ข้อมูลเครื่องจักร / สินค้า"
              items={product}
              column={1}
              layout='vertical'
              size='small'
            />
          </section>
        )
      })
    }
  }, [])


  // const etc_vehicle: DescriptionsProps['items'] = [
  //   {
  //     key: '1',
  //     label: 'เลขทะเบียน / เลขตัวรถ',
  //     children: <p>{renderLicensePlate(detail?.vehicle?.etc_vehicle?.plate_no, detail?.vehicle?.etc_vehicle?.plate_province)}</p>,
  //   },
  //   {
  //     key: '2',
  //     label: 'น้ำหนัก (กิโลกรัม)',
  //     children: <p>{detail?.vehicle?.etc_vehicle?.weight || '-'}</p>,
  //   },
  // ];

  return (
    <>
      <section>
        <Descriptions
          title="ข้อมูลรถลากจูง"
          items={towering_vehicle}
          column={1}
          layout='vertical'
          size='small'
        />

      </section>
      <section className='mt-5'>
        <Descriptions
          title="ข้อมูลรถกึ่งพ่วง 4 เพลา 8"
          items={semi_trailer_vehicle}
          column={1}
          layout='vertical'
          size='small'
        />
      </section>
      {renderETC(detail?.vehicle?.etc_vehicle)}
      {/* <section className='mt-5'>
        <Descriptions
          title="ข้อมูลเครื่องจักร / สินค้า"
          items={etc_vehicle}
          column={1}
          layout='vertical'
          size='small'
        />
      </section> */}
    </>
  )
}

export default React.memo<Props>(VehicleDetail)
