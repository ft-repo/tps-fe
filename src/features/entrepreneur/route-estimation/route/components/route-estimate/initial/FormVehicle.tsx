/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr, FieldTypeForRoute } from '@/@types/entrepreneur/route-estimation';
import { useAppSelector } from '@/store';
import { Card, Col, Image, Input, message, Modal, Row, Select, Spin, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { Control, Controller, UseFormSetValue, useFormState, UseFormTrigger, useWatch } from 'react-hook-form';
// import { VehicleDetail } from '@/services/master/MasterService';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import { InfoCircleFilled } from '@ant-design/icons';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { getAxisWeightAPI } from '@/services/master/MasterService';
import { AxiosError } from 'axios';
import { useRouteContext } from '../../../context';

interface Props {
  formItem: FieldTypeForRoute;
  formIndex: number;
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
  trigger: UseFormTrigger<FieldTypeArr>;   // ← add
}

interface ImageState {
  front: string;
  back: string;
  side: string;
}

const INIT_IMG_STATE: ImageState = {
  front: '',
  back: '',
  side: ''
}

const FormVehicle: React.FC<Props> = (props) => {
  const { formIndex, control, setValue, trigger } = props
  const { vehicle_selection } = useAppSelector(state => state.master)
  const { loading } = useAppSelector(state => state.layout)
  // WHEEL
  const [toweringVehicleWheel, setToweringVehicleWheel] = useState<number>(0)
  const [semiVehicleWheel, setSemiVehicleWheel] = useState<number>(0)
  // WEIGHT
  // const [towingProperties, setTowingProperties] = useState<PropertieState>(INIT_VALUE)
  // const [semiProperties, setSemiProperties] = useState<PropertieState>(INIT_VALUE)
  // const [etcProperties, setEtcProperties] = useState<PropertieState>(INIT_VALUE)
  // IMG
  const [towingImage, setTowingImage] = useState<ImageState>(INIT_IMG_STATE)
  const [semiImage, setSemiImage] = useState<ImageState>(INIT_IMG_STATE)
  const [etcImage, setEtcImage] = useState<{ [key: number]: ImageState }>({})
  // NAVIGATE
  const navigate = useNavigate()
  // CONTEXT
  const { towingMaxWeight, setTowingMaxWeight, semiMaxWeight, setSemiMaxWeight } = useRouteContext()
  const { state } = useLocation()
  const isEditRoadMap = state?.type === 'ตรวจเส้นทาง' ? true : false
  const isEditVehicle = (state?.type === 'ตรวจยานพาหนะ' || state?.type === 'รอแก้ไข') ? true : false

  const {
    match_type,
    towering_vehicle,
    semi_trailer_vehicle,
    etc_vehicle,
    towering_weight1,
    towering_weight2,
    towering_weight3,
    towering_weight4,
    towering_weight5,
    towering_weight6,
    towering_weight7,
    semi_weight1,
    semi_weight2,
    semi_weight3,
    semi_weight4,
    semi_weight5,
    semi_weight6,
    semi_weight7,
  } = useWatch({ control, name: `route_form.${formIndex}` })

  const { errors } = useFormState({ control })

  const selectTowing = vehicle_selection.data.find(item => item.vehicle_detail.id === towering_vehicle) || null
  const selectSemi = vehicle_selection.data.find(item => item.vehicle_detail.id === semi_trailer_vehicle) || null
  // const selectETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etc_vehicle) || null

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (stateType: 'towing' | 'semi' | 'etc', imgUrl: string[], etcId?: number) => {
    try {
      const response = await Promise.all(imgUrl.map(item => getUploadAPI(item as string)))
      const result = response.every(item => item.status === 200)
      if (result) {
        if (stateType === 'towing') {
          const imgArr = response.map((item) => {
            const blobFile = new Blob([item.data], { type: item.data.type })
            const url = URL.createObjectURL(blobFile)
            return url
          })
          setTowingImage({
            front: imgArr[0],
            back: imgArr[1],
            side: imgArr[2],
          })
        }
        if (stateType === 'semi') {
          const imgArr = response.map((item) => {
            const blobFile = new Blob([item.data], { type: item.data.type })
            const url = URL.createObjectURL(blobFile)
            return url
          })
          setSemiImage({
            front: imgArr[0],
            back: imgArr[1],
            side: imgArr[2],
          })
        }
        if (stateType === 'etc' && etcId) {
          const imgArr = response.map((item) => {
            const blobFile = new Blob([item.data], { type: item.data.type })
            const url = URL.createObjectURL(blobFile)
            return url
          })
          setEtcImage(prev => ({
            ...prev,
            [etcId]: {
              front: imgArr[0],
              back: imgArr[1],
              side: imgArr[2],
            }
          }))
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  const renderLicensePlate = useCallback((plateNo: string, plateProvince: string) => {
    const nameArr = [plateNo, plateProvince]
    if (!nameArr.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

  useEffect(() => {
    if (selectTowing?.vehicle_pictures.front_rear_url) {
      if (extractUrl(selectTowing?.vehicle_pictures.front_rear_url)) {
        fetchImage('towing', [
          extractUrl(selectTowing?.vehicle_pictures.front_rear_url),
          extractUrl(selectTowing?.vehicle_pictures.back_rear_url),
          extractUrl(selectTowing?.vehicle_pictures.side_rear_url),
        ])
      }
    }
    if (selectSemi?.vehicle_pictures.front_rear_url) {
      if (extractUrl(selectSemi?.vehicle_pictures.front_rear_url)) {
        fetchImage('semi', [
          extractUrl(selectSemi?.vehicle_pictures.front_rear_url),
          extractUrl(selectSemi?.vehicle_pictures.back_rear_url),
          extractUrl(selectSemi?.vehicle_pictures.side_rear_url),
        ])
      }
    }

    // Handle multiple ETC vehicles
    if (etc_vehicle && Array.isArray(etc_vehicle) && etc_vehicle.length > 0) {
      etc_vehicle.forEach((etcId) => {
        const selectedETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etcId)
        if (selectedETC?.vehicle_pictures.front_rear_url) {
          if (extractUrl(selectedETC?.vehicle_pictures.front_rear_url)) {
            fetchImage('etc', [
              extractUrl(selectedETC?.vehicle_pictures.front_rear_url),
              extractUrl(selectedETC?.vehicle_pictures.back_rear_url),
              extractUrl(selectedETC?.vehicle_pictures.side_rear_url),
            ], etcId)
          }
        }
      })
    }
  }, [
    fetchImage,
    extractUrl,
    selectTowing?.vehicle_pictures.front_rear_url,
    selectTowing?.vehicle_pictures.back_rear_url,
    selectTowing?.vehicle_pictures.side_rear_url,
    selectSemi?.vehicle_pictures.front_rear_url,
    selectSemi?.vehicle_pictures.back_rear_url,
    selectSemi?.vehicle_pictures.side_rear_url,
    etc_vehicle,
    vehicle_selection.data
  ])

  useEffect(() => {
    if (towering_vehicle) {
      setToweringVehicleWheel(Number(selectTowing?.vehicle_detail.axis_number))
    }
    if (semi_trailer_vehicle) {
      setSemiVehicleWheel(Number(selectSemi?.vehicle_detail.axis_number))
    }
    if (!match_type) {
      setToweringVehicleWheel(0)
      setSemiVehicleWheel(0)
      setTowingImage(INIT_IMG_STATE)
      setSemiImage(INIT_IMG_STATE)
      setEtcImage({})
    }
    if (!towering_vehicle) {
      setTowingImage(INIT_IMG_STATE)
      setToweringVehicleWheel(0)
    }
    if (!semi_trailer_vehicle) {
      setSemiImage(INIT_IMG_STATE)
      setSemiVehicleWheel(0)
    }
    // Check if etc_vehicle array is empty
    if (!etc_vehicle || etc_vehicle.length === 0) {
      setEtcImage({})
    }
  }, [towering_vehicle, semi_trailer_vehicle, etc_vehicle, match_type, selectTowing?.vehicle_detail.axis_number, selectSemi?.vehicle_detail.axis_number])

  useEffect(() => {
    if (Number(selectTowing?.vehicle_detail.axis_number) + Number(selectSemi?.vehicle_detail.axis_number) > 7) {
      Modal.confirm({
        title: 'จำนวนเพลาเกินกำหนด',
        content: 'กรุณากดยืนยันเพื่อเข้าสู่ขบวนการขอใบอนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: () => navigate('/route-estimation/other'),
        onCancel: () => Modal.destroyAll(),
        okButtonProps: {
          style: { fontFamily: 'Noto Sans Thai' }
        },
        cancelButtonProps: {
          style: { fontFamily: 'Noto Sans Thai' }
        },
        style: { fontFamily: 'Noto Sans Thai' }
      })
    }
  }, [selectTowing?.vehicle_detail.axis_number, selectSemi?.vehicle_detail.axis_number, navigate])
  //  ^^^^^^ removed `loading`

  const renderETC = useCallback((value: number[]) => {
    const arr = []
    if (value?.length) {
      for (const etc_id of value) {
        const selectETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etc_id)
        if (selectETC) {
          arr.push(selectETC)
        }
      }
    }
    if (arr.length) {
      return arr.map((item, index) => {
        const images = etcImage[item.vehicle_detail.id] || INIT_IMG_STATE
        return (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8} xxl={8} >
            <Card
              cover={(
                <Spin spinning={loading}>
                  <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    pagination={true}
                  >
                    <SwiperSlide>
                      <figure className='h-44 relative overflow-hidden'>
                        <Image
                          src={images.front}
                          alt={'etc-vehicle'}
                          width={'100%'}
                          height={'100%'}
                          className='object-cover object-center'
                          fallback='data:image/png;base64,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'
                        />
                      </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                      <figure className='h-44 relative overflow-hidden'>
                        <Image
                          src={images.back}
                          alt={'etc-vehicle'}
                          width={'100%'}
                          height={'100%'}
                          className='object-cover object-center'
                          fallback='data:image/png;base64,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'
                        />
                      </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                      <figure className='h-44 relative overflow-hidden'>
                        <Image
                          src={images.side}
                          alt={'etc-vehicle'}
                          width={'100%'}
                          height={'100%'}
                          className='object-cover object-center'
                          fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
                        />
                      </figure>
                    </SwiperSlide>
                  </Swiper>
                </Spin>
              )}
            >
              <Card.Meta
                title={renderLicensePlate(item.vehicle_detail.plate_no, item.vehicle_detail.plate_province)}
                description={`${item.vehicle_detail.weight || 0} กก.`}
              />
            </Card>
          </Col>
        )
      })
    }
  }, [loading, renderLicensePlate, vehicle_selection.data, etcImage])

  const getTotalEtcWeight = useCallback(() => {
    if (!etc_vehicle || etc_vehicle.length === 0) return 0;

    return etc_vehicle.reduce((total, etcId) => {
      const selectedETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etcId);
      return total + (selectedETC?.vehicle_detail.weight || 0);
    }, 0);
  }, [etc_vehicle, vehicle_selection.data]);

  // 7. Calculate max dimensions for all ETC vehicles
  const getMaxEtcDimensions = useCallback(() => {
    if (!etc_vehicle || etc_vehicle.length === 0) return { width: 0, length: 0, height: 0 };

    return etc_vehicle.reduce((max, etcId) => {
      const selectedETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etcId);
      if (selectedETC) {
        return {
          width: Math.max(max.width, Number(selectedETC.vehicle_detail.width || 0)),
          length: Math.max(max.length, Number(selectedETC.vehicle_detail.length || 0)),
          height: Math.max(max.height, Number(selectedETC.vehicle_detail.height || 0))
        };
      }
      return max;
    }, { width: 0, length: 0, height: 0 });
  }, [etc_vehicle, vehicle_selection.data]);

  // Use in your summary section:
  const etcWeight = getTotalEtcWeight();
  const etcDimensions = getMaxEtcDimensions();

  const fetchTowingMaxWeight = useCallback(async (id: string | number | null) => {
    try {
      const response = await getAxisWeightAPI(id)
      if (response.status === 200) {
        // console.log(response.data)
        setTowingMaxWeight(response.data)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      } else {
        console.error(error)
      }
    }
  }, [setTowingMaxWeight])

  const fetchSemiMaxWeight = useCallback(async (id: string | number | null) => {
    try {
      const response = await getAxisWeightAPI(id)
      if (response.status === 200) {
        setSemiMaxWeight(response.data)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      } else {
        console.error(error)
      }
    }
  }, [setSemiMaxWeight])

  return (
    <>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <Controller
              name={`route_form.${formIndex}.match_type`}
              control={control}
              rules={{
                required: 'กรุณาเลือกเลือกประเภทจับคู่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลือกประเภทจับคู่ <span className='text-red-500'>*</span></label>
                    <Select
                      disabled={isEditVehicle || isEditRoadMap}
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={[
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร',
                          value: 1
                        },
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง',
                          value: 2
                        },
                        {
                          label: 'รถกึ่งพ่วง',
                          value: 3
                        },
                      ]}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(value) => {
                        field.onChange(value)
                        // ON VALUE CHANGE
                        setValue(`route_form.${formIndex}.towering_vehicle`, null)
                        setValue(`route_form.${formIndex}.semi_trailer_vehicle`, null)
                        setValue(`route_form.${formIndex}.etc_vehicle`, [])
                        // SET TOWER WEIGHT
                        setValue(`route_form.${formIndex}.towering_weight1`, 0)
                        setValue(`route_form.${formIndex}.towering_weight2`, 0)
                        setValue(`route_form.${formIndex}.towering_weight3`, 0)
                        setValue(`route_form.${formIndex}.towering_weight4`, 0)
                        setValue(`route_form.${formIndex}.towering_weight5`, 0)
                        setValue(`route_form.${formIndex}.towering_weight6`, 0)
                        setValue(`route_form.${formIndex}.towering_weight7`, 0)
                        // SET SEMI WEIGHT
                        setValue(`route_form.${formIndex}.semi_weight1`, 0)
                        setValue(`route_form.${formIndex}.semi_weight2`, 0)
                        setValue(`route_form.${formIndex}.semi_weight3`, 0)
                        setValue(`route_form.${formIndex}.semi_weight4`, 0)
                        setValue(`route_form.${formIndex}.semi_weight5`, 0)
                        setValue(`route_form.${formIndex}.semi_weight6`, 0)
                        setValue(`route_form.${formIndex}.semi_weight7`, 0)
                        // ON STATE CHANGE
                        // setToweringVehicleWheel(0)
                        // setSemiVehicleWheel(0)
                        // setTowingProperties(INIT_VALUE)
                        // setSemiProperties(INIT_VALUE)
                        // setEtcProperties(INIT_VALUE)
                        // setTowingImage('')
                        // setSemiImage('')
                        // setEtcImage('')
                      }}
                    />
                    {!!errors.route_form?.[formIndex]?.match_type &&
                      <p className='text-red-500'>{errors.route_form[formIndex].match_type.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Controller
              name={`route_form.${formIndex}.turn_radius`}
              control={control}
              rules={{
                required: 'กรุณาระบุรัศมีวงเลี้ยว (เมตร)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label className='flex items-center justify-between flex-wrap'>
                      <span>รัศมีวงเลี้ยว (เมตร) <span className='text-red-500'>*</span></span>
                      <Tooltip
                        title='เอกสารสูตรคำนวณรัศมีวงเลี้ยว'
                      >
                        <InfoCircleFilled
                          style={{
                            color: '#69b1ff'
                          }}
                          onClick={() => window.open('/pdf/สูตรคำนวณรัศมีวงเลี้ยว.pdf', '_blank')}
                        />
                      </Tooltip>
                    </label>
                    <Input
                      disabled={isEditVehicle}
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      // suffix='เมตร'
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                      }}
                    />
                    {!!errors.route_form?.[formIndex]?.turn_radius &&
                      <p className='text-red-500'>{errors.route_form[formIndex].turn_radius.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          {(match_type === 1 || match_type === 2) ?
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Controller
                name={`route_form.${formIndex}.towering_vehicle`}
                control={control}
                rules={{
                  required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ',
                  validate: () => {
                    return Number(selectTowing?.vehicle_detail.axis_number) + Number(selectSemi?.vehicle_detail.axis_number) <= 7 || 'จำนวนเพลาเกินที่กำหนด'
                  }
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>รถลากจูง</h5>
                      <label>เลขทะเบียน / เลขตัวรถ <span className='text-red-500'>*</span></label>
                      <Select
                        disabled={isEditVehicle || isEditRoadMap}
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'รถลากจูง').map(item => {
                          return item.vehicle_detail
                        })}
                        fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                        onChange={(value, option: any) => {
                          field.onChange(value)
                          // SET TOWER WEIGHT
                          setValue(`route_form.${formIndex}.towering_weight1`, '')
                          setValue(`route_form.${formIndex}.towering_weight2`, '')
                          setValue(`route_form.${formIndex}.towering_weight3`, '')
                          setValue(`route_form.${formIndex}.towering_weight4`, '')
                          setValue(`route_form.${formIndex}.towering_weight5`, '')
                          setValue(`route_form.${formIndex}.towering_weight6`, '')
                          setValue(`route_form.${formIndex}.towering_weight7`, '')
                          // API
                          fetchTowingMaxWeight(option.axis_type_id)
                        }}
                      // onChange={(value, option) => {
                      //   const axis: VehicleDetail | any = option
                      //   field.onChange(value)
                      //   if (!value) {
                      //     setToweringVehicleWheel(0)
                      //     setTowingProperties(INIT_VALUE)
                      //     setTowingImage('')
                      //   } else {
                      //     setToweringVehicleWheel(axis.axis_number)
                      //     setTowingProperties(axis)
                      //   }
                      // }}
                      />
                      {!!errors.route_form?.[formIndex]?.towering_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].towering_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(match_type === 1 || match_type === 2 || match_type === 3) ?
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={match_type === 3 ? 24 : 12}
              xl={match_type === 3 ? 24 : 12}
              xxl={match_type === 3 ? 24 : 12}
            >
              <Controller
                name={`route_form.${formIndex}.semi_trailer_vehicle`}
                control={control}
                rules={{
                  required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ',
                  validate: () => {
                    if (match_type === 3) return true

                    return Number(selectTowing?.vehicle_detail.axis_number) + Number(selectSemi?.vehicle_detail.axis_number) <= 7 || 'จำนวนเพลาเกินที่กำหนด'
                  }
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>รถกึ่งพ่วง</h5>
                      <label>เลขทะเบียน / เลขตัวรถ <span className='text-red-500'>*</span></label>
                      <Select
                        disabled={isEditVehicle || isEditRoadMap}
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'รถกึ่งพ่วง').map(item => {
                          return item.vehicle_detail
                        })}
                        fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                        onChange={(value, option: any) => {
                          field.onChange(value)
                          // SET SEMI WEIGHT
                          setValue(`route_form.${formIndex}.semi_weight1`, '')
                          setValue(`route_form.${formIndex}.semi_weight2`, '')
                          setValue(`route_form.${formIndex}.semi_weight3`, '')
                          setValue(`route_form.${formIndex}.semi_weight4`, '')
                          setValue(`route_form.${formIndex}.semi_weight5`, '')
                          setValue(`route_form.${formIndex}.semi_weight6`, '')
                          setValue(`route_form.${formIndex}.semi_weight7`, '')
                          // API
                          fetchSemiMaxWeight(option.axis_type_id)
                        }}
                      // onChange={(value, option) => {
                      //   const axis: VehicleDetail | any = option
                      //   field.onChange(value)
                      //   if (!value) {
                      //     setSemiVehicleWheel(0)
                      //     setSemiProperties(INIT_VALUE)
                      //     setSemiImage('')
                      //   } else {
                      //     setSemiVehicleWheel(axis.axis_number)
                      //     setSemiProperties(axis)
                      //   }
                      // }}
                      />
                      {!!errors.route_form?.[formIndex]?.semi_trailer_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].semi_trailer_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(match_type === 1) ?
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Controller
                name={`route_form.${formIndex}.etc_vehicle`}
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อสินค้า / เครื่องจักร'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>สินค้า / เครื่องจักร</h5>
                      <label>ชื่อสินค้า / เครื่องจักร <span className='text-red-500'>*</span></label>
                      <Select
                        disabled={isEditVehicle || isEditRoadMap}
                        {...field}
                        allowClear
                        showSearch
                        mode='multiple'
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'เครื่องจักร / สินค้า').map(item => {
                          return item.vehicle_detail
                        })}
                        fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      // onChange={(value, option) => {
                      //   const axis: VehicleDetail | any = option
                      //   field.onChange(value)
                      //   if (!value) {
                      //     setEtcProperties(INIT_VALUE)
                      //     setEtcImage('')
                      //   } else {
                      //     setEtcProperties(axis)
                      //   }
                      // }}
                      />
                      {!!errors.route_form?.[formIndex]?.etc_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].etc_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
        </Row>
      </section>
      {toweringVehicleWheel !== 0 ?
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม) <span className='text-red-500'>*</span></h5>
          <Row gutter={[16, 16]}>
            {toweringVehicleWheel >= 2 ?
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.towering_weight1`}
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                      validate: (value) => {
                        const entry = towingMaxWeight.find(w => w.axis_number === 1) // change N per field
                        if (!entry) return true
                        return Number(value) <= entry.axis_max_weight
                          || `น้ำหนักเกินเกณฑ์`
                      }
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            disabled={isEditRoadMap}
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            // suffix='กิโลกรัม'
                            // onChange={(e) => {
                            //   field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                            // }}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "")
                              field.onChange(val)
                              trigger(`route_form.${formIndex}.towering_weight1`)  // field-specific name
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.towering_weight1 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].towering_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.towering_weight2`}
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                      validate: (value) => {
                        const entry = towingMaxWeight.find(w => w.axis_number === 2) // change N per field
                        if (!entry) return true
                        return Number(value) <= entry.axis_max_weight
                          || `น้ำหนักเกินเกณฑ์`
                      }
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            disabled={isEditRoadMap}
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            // suffix='กิโลกรัม'
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "")
                              field.onChange(val)
                              trigger(`route_form.${formIndex}.towering_weight2`)  // field-specific name
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.towering_weight2 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].towering_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {toweringVehicleWheel >= 3 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight3`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = towingMaxWeight.find(w => w.axis_number === 3) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.towering_weight3`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight3 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight3.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 4 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight4`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = towingMaxWeight.find(w => w.axis_number === 4) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.towering_weight4`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight4 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight4.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight5`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = towingMaxWeight.find(w => w.axis_number === 5) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.towering_weight5`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight5 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight5.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 6 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight6`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = towingMaxWeight.find(w => w.axis_number === 6) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.towering_weight6`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight6 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight6.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 7 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight7`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = towingMaxWeight.find(w => w.axis_number === 7) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.towering_weight7`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight7 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight7.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
          </Row>
        </section>
        : null}
      {semiVehicleWheel !== 0 ?
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม) <span className='text-red-500'>*</span></h5>
          <Row gutter={[16, 16]}>
            {semiVehicleWheel >= 2 ?
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.semi_weight1`}
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                      validate: (value) => {
                        const entry = semiMaxWeight.find(w => w.axis_number === 1) // change N per field
                        if (!entry) return true
                        return Number(value) <= entry.axis_max_weight
                          || `น้ำหนักเกินเกณฑ์`
                      }
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            disabled={isEditRoadMap}
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            // suffix='กิโลกรัม'
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "")
                              field.onChange(val)
                              trigger(`route_form.${formIndex}.semi_weight1`)  // field-specific name
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.semi_weight1 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].semi_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.semi_weight2`}
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                      validate: (value) => {
                        const entry = semiMaxWeight.find(w => w.axis_number === 2) // change N per field
                        if (!entry) return true
                        return Number(value) <= entry.axis_max_weight
                          || `น้ำหนักเกินเกณฑ์`
                      }
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            disabled={isEditRoadMap}
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            // suffix='กิโลกรัม'
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "")
                              field.onChange(val)
                              trigger(`route_form.${formIndex}.semi_weight2`)  // field-specific name
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.semi_weight2 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].semi_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {semiVehicleWheel >= 3 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight3`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = semiMaxWeight.find(w => w.axis_number === 3) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.semi_weight3`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight3 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight3.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 4 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight4`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = semiMaxWeight.find(w => w.axis_number === 4) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.semi_weight4`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight4 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight4.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight5`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = semiMaxWeight.find(w => w.axis_number === 5) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.semi_weight5`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight5 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight5.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 6 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight6`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = semiMaxWeight.find(w => w.axis_number === 6) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.semi_weight6`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight6 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight6.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 7 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight7`}
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)',
                    validate: (value) => {
                      const entry = semiMaxWeight.find(w => w.axis_number === 7) // change N per field
                      if (!entry) return true
                      return Number(value) <= entry.axis_max_weight
                        || `น้ำหนักเกินเกณฑ์`
                    }
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          disabled={isEditRoadMap}
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          // suffix='กิโลกรัม'
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(val)
                            trigger(`route_form.${formIndex}.semi_weight7`)  // field-specific name
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
          </Row>
        </section>
        : null}
      <section className='mt-5'>
        <div className='bg-gray-200 rounded-md p-3'>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>น้ำหนักรถเปล่ารวม:</strong></p>
            <p>{(
              Number(selectTowing?.vehicle_detail.weight || 0) +
              Number(selectSemi?.vehicle_detail.weight || 0) +
              etcWeight
            ) || 0} กก.</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>น้ำหนักรถเปล่ารวมน้ำหนักเพลา:</strong></p>
            <p>{(
              Number(selectTowing?.vehicle_detail.weight || 0) +
              Number(selectSemi?.vehicle_detail.weight || 0) +
              etcWeight +
              Number(towering_weight1 || 0) +
              Number(towering_weight2 || 0) +
              Number(towering_weight3 || 0) +
              Number(towering_weight4 || 0) +
              Number(towering_weight5 || 0) +
              Number(towering_weight6 || 0) +
              Number(towering_weight7 || 0) +
              Number(semi_weight1 || 0) +
              Number(semi_weight2 || 0) +
              Number(semi_weight3 || 0) +
              Number(semi_weight4 || 0) +
              Number(semi_weight5 || 0) +
              Number(semi_weight6 || 0) +
              Number(semi_weight7 || 0)
            ) || 0}  กก.</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>มิติรถเปล่า (ม.):</strong></p>
            <p>{`กว้าง ${Math.max(
              Number(selectTowing?.vehicle_detail.width || 0),
              Number(selectSemi?.vehicle_detail.width || 0)
            )} X ยาว ${Math.max(
              Number(selectTowing?.vehicle_detail.length || 0),
              Number(selectSemi?.vehicle_detail.length || 0)
            )} X สูง ${Math.max(
              Number(selectTowing?.vehicle_detail.height || 0),
              Number(selectSemi?.vehicle_detail.height || 0)
            )}`}</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.):</strong></p>
            <p>{`กว้าง ${Math.max(
              Number(selectTowing?.vehicle_detail.width || 0),
              Number(selectSemi?.vehicle_detail.width || 0),
              etcDimensions.width
            )} X ยาว ${Math.max(
              Number(selectTowing?.vehicle_detail.length || 0),
              Number(selectSemi?.vehicle_detail.length || 0),
              etcDimensions.length
            )} X สูง ${Math.max(
              Number(selectTowing?.vehicle_detail.height || 0),
              Number(selectSemi?.vehicle_detail.height || 0),
              etcDimensions.height
            )}`}</p>
          </div>
        </div>
      </section>
      {towering_vehicle || semi_trailer_vehicle ?
        <section className='mt-5'>
          <h5>รูปภาพยานพาหนะ</h5>
          <Row gutter={[16, 16]}>
            {selectTowing?.vehicle_detail.id ?
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card
                  cover={(
                    <Spin spinning={loading}>
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={true}
                      >
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={towingImage.front}
                              alt={'towering-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={towingImage.back}
                              alt={'towering-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={towingImage.side}
                              alt={'towering-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                      </Swiper>
                    </Spin>
                  )}
                >
                  <Card.Meta
                    title="รถลากจูง"
                    description={(
                      <>
                        <p>{selectTowing.vehicle_detail.weight || 0} กก.</p>
                        <p>{renderLicensePlate(selectTowing.vehicle_detail.plate_no, selectTowing.vehicle_detail.plate_province)}</p>
                      </>
                    )}
                  />
                </Card>
              </Col>
              : null}
            {selectSemi?.vehicle_detail.id ?
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card
                  cover={(
                    <Spin spinning={loading}>
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={true}
                      >
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={semiImage.front}
                              alt={'semi-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={semiImage.back}
                              alt={'semi-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                        <SwiperSlide>
                          <figure className='h-44 relative overflow-hidden'>
                            <Image
                              src={semiImage.side}
                              alt={'semi-vehicle'}
                              width={'100%'}
                              height={'100%'}
                              className='object-cover object-center'
                              fallback='data:image/png;base64,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'
                            />
                          </figure>
                        </SwiperSlide>
                      </Swiper>
                    </Spin>
                  )}
                >
                  <Card.Meta
                    title="รถกึ่งพ่วง 4 เพลา 8"
                    description={(
                      <>
                        <p>{selectSemi.vehicle_detail.weight || 0} กก.</p>
                        <p>{renderLicensePlate(selectSemi.vehicle_detail.plate_no, selectSemi.vehicle_detail.plate_province)}</p>
                      </>
                    )}
                  />
                </Card>
              </Col>
              : null}
          </Row>
        </section>
        : null}
      {etc_vehicle?.length ?
        <section className='mt-5'>
          <h5>รูปภาพเครื่องจักร / สินค้า</h5>
          <Row gutter={[16, 16]}>
            {renderETC(etc_vehicle as number[])}
          </Row>
        </section>
        : null}
    </>

  )
}

export default React.memo<Props>(FormVehicle)
