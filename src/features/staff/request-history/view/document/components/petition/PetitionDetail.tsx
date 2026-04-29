/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Descriptions, DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'

interface Props {

}

const PetitionDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const renderAddress = useCallback((
    houseNumber: string,
    village: string,
    lane: string,
    road: string,
    province: string,
    district: string,
    subDistrict: string,
    zipCode: string
  ) => {
    const addressArr = [
      houseNumber ? `เลขที่${houseNumber}` : null,
      village ? `หมู่ที่ ${village}` : null,
      lane ? `ซอบ ${lane}` : null,
      road ? `ถนน ${road}` : null,
      province || null,
      district || null,
      subDistrict || null,
      zipCode || null
    ]
    return addressArr.join(' ').trim()
  }, [])

  const clientItems: DescriptionsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: detail?.user_created?.is_personal ? 'ชื่อ - นามสกุล' : 'ชื่อบริษัท / ห้าง / ร้าน',
        children: <p>{detail?.user_created?.business_details?.business_name || '-'}</p>,
      },
      {
        key: '2',
        label: 'ประเภทนิติบุคคล',
        children: <p>{detail?.user_created?.business_details?.entity_type_id || '-'}</p>,
      },
      {
        key: '3',
        label: detail?.user_created?.is_personal ? 'ที่อยู่' : 'ที่อยู่บริษัท',
        children: (
          <p>
            {renderAddress(
              detail?.user_created?.business_address?.house_number,
              detail?.user_created?.business_address?.village,
              detail?.user_created?.business_address?.lane,
              detail?.user_created?.business_address?.road,
              detail?.user_created?.business_address?.province?.name_th,
              detail?.user_created?.business_address?.district?.name_th,
              detail?.user_created?.business_address?.sub_district?.name_th,
              detail?.user_created?.business_address?.zip_codes,
            )}
          </p>
        ),
      },
      {
        key: '4',
        label: detail?.user_created?.is_personal ? 'วันที่สมัคร' : 'วันที่จดทะเบียน',
        children: <p>{detail?.user_created?.created_at ? dayjs(detail?.user_created?.created_at).format('DD/MM/YYYY') : '-'}</p>,
      },
      {
        key: '5',
        label: detail?.user_created?.is_personal ? 'เลขบัตรประชาชน' : 'เลขทะเบียนนิติบุคคล',
        children: <p>{detail?.user_created?.registration_no || '-'}</p>,
      },
      {
        key: '6',
        label: detail?.user_created?.is_personal ? 'เบอร์โทรศัพท์' : 'เบอร์โทรสำนักงาน',
        children: <p>{detail?.user_created?.business_address?.phone_number || '-'}</p>,
      },
    ]
  }, [detail, renderAddress])

  const businessItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      children: <p>{'-'}</p>,
    },
    {
      key: '2',
      label: 'ที่อยู่',
      children: (
        <p>
          {renderAddress(
            detail?.address?.contact_house_number,
            detail?.address?.contact_village,
            detail?.address?.contact_lane,
            detail?.address?.contact_road,
            detail?.address?.contact_province?.name_th,
            detail?.address?.contact_district?.name_th,
            detail?.address?.contact_sub_district?.name_th,
            detail?.address?.contact_zip_code,
          )}
        </p>
      ),
    },
  ]

  const poaItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ผู้ได้รับมอบอำนาจ',
      children: <p>{detail?.poa_name || '-'}</p>,
    },
    {
      key: '2',
      label: 'ที่อยู่',
      children: (
        <p>
          {renderAddress(
            detail?.address?.poa_house_number,
            detail?.address?.poa_village,
            detail?.address?.poa_lane,
            detail?.address?.poa_road,
            detail?.address?.poa_province?.name_th,
            detail?.address?.poa_district?.name_th,
            detail?.address?.poa_sub_district?.name_th,
            detail?.address?.poa_zip_code,
          )}
        </p>
      ),
    },
    {
      key: '3',
      label: 'เบอร์โทรศัพท์',
      children: <p>{'-'}</p>,
    },
  ]

  const isPersonalContent = useMemo(() => {
    if (detail?.user_created?.is_personal) return clientItems.filter(item => item.key !== '2')
    return clientItems
  }, [detail?.user_created?.is_personal, clientItems])

  return (
    <div>
      <section>
        <Descriptions
          title="ข้อมูลผู้ประสงค์ขออนุญาต"
          items={isPersonalContent}
          column={1}
          layout='vertical'
          size='small'
        />
      </section>
      <section className='mt-5'>
        <Descriptions
          title="ข้อมูลนิติบุคคล"
          items={businessItems}
          column={1}
          layout='vertical'
          size='small'
        />
      </section>
      <section className='mt-5'>
        <Descriptions
          title="ข้อมูลผู้ได้รับมอบอำนาจ"
          items={poaItems}
          column={1}
          layout='vertical'
          size='small'
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(PetitionDetail)
