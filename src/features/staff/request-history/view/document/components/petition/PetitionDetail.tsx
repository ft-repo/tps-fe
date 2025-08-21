/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'

interface Props {

}

const PetitionDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const renderAddress = useCallback((
    houseNumber: string,
    road: string,
    lane: string,
    province: string,
    district: string,
    subDistrict: string,
    zipCode: string
  ) => {
    const addressArr = [houseNumber, road, lane, province, district, subDistrict, zipCode]
    return addressArr.join(' ').trim()
  }, [])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อบริษัท / ห้าง / ร้าน',
      children: <p>{detail.user_created.business_details.business_name || '-'}</p>,
    },
    {
      key: '2',
      label: 'ประเภทนิติบุคคล',
      children: <p>{detail.user_created.business_details.entity_type_id || '-'}</p>,
    },
    {
      key: '3',
      label: 'ที่อยู่บริษัท',
      children: (
        <p>
          {renderAddress(
            detail.user_created.business_address.house_number,
            detail.user_created.business_address.road,
            detail.user_created.business_address.lane,
            detail.user_created.business_address.province.name_th,
            detail.user_created.business_address.district.name_th,
            detail.user_created.business_address.sub_district.name_th,
            detail.user_created.business_address.zip_codes,
          )}
        </p>
      ),
    },
    {
      key: '4',
      label: 'วันที่จดทะเบียน',
      children: <p>{dayjs(detail.user_created.created_at).format('DD MMMM YYYY') || '-'}</p>,
    },
    {
      key: '5',
      label: 'เลขทะเบียนนิติบุคคล',
      children: <p>{detail.user_created.registration_no || '-'}</p>,
    },
    {
      key: '6',
      label: 'เบอร์โทรสำนักงาน',
      children: <p>{detail.user_created.business_address.phone_number || '-'}</p>,
    },
    {
      key: '7',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: <p>{'-'}</p>,
    },
    {
      key: '8',
      label: 'ที่อยู่',
      children: (
        <p>
          {renderAddress(
            detail.address.contact_house_number,
            detail.address.contact_road,
            detail.address.contact_lane,
            detail.address.contact_province.name_th,
            detail.address.contact_district.name_th,
            detail.address.contact_sub_district.name_th,
            detail.address.contact_zip_code,
          )}
        </p>
      ),
    },
    {
      key: '9',
      label: 'ผู้ได้รับมอบอำนาจ',
      children: <p>{detail.poa_name || '-'}</p>,
    },
    {
      key: '10',
      label: 'ที่อยู่',
      children: (
        <p>
          {renderAddress(
            detail.address.poa_house_number,
            detail.address.poa_road,
            detail.address.poa_lane,
            detail.address.poa_province.name_th,
            detail.address.poa_district.name_th,
            detail.address.poa_sub_district.name_th,
            detail.address.poa_zip_code,
          )}
        </p>
      ),
    },
    {
      key: '11',
      label: 'เบอร์โทรศัพท์',
      children: <p>{'-'}</p>,
    },
  ]

  return (
    <Descriptions
      title="ข้อมูลผู้ประสงค์ขออนุญาต"
      items={items}
      column={1}
    />
  )
}

export default React.memo<Props>(PetitionDetail)
