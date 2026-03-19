/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { ETCVehicle, VehicleList } from '@/@types/reducer/petition';
import { FileType } from '@/@types/shared';
import { getUploadAPI, postUploadImageAPI } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch } from '@/store';
import { Col, Empty, Image, message, Row, Upload } from 'antd'
import { RcFile/*, UploadFile*/ } from 'antd/es/upload';
import React, { /*ReactElement,*/ useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaUpload as UploadIcon } from "react-icons/fa6";
// import {
//   AiOutlineEye as EyeOutlined,
//   AiOutlineDelete as DeleteOutlined
// } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  index: number;
  item: VehicleList;
}

interface FieldType {
  towing_image: FileType;
  semi_image: FileType;
  etc_image: FileType;
  truck_dimension_image: FileType;
  semi_dimension_image: FileType;
  cargo_dimension_image: FileType;
  combined_vehicle_image: FileType;
  turn_radius_image: FileType;
  highway_permit_image: FileType;
  highway_number_image: FileType;
  rural_permit_image: FileType;
  rural_number_image: FileType;
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

const ContentImage: React.FC<Props> = (props) => {
  const { item } = props
  const dispatch = useAppDispatch()
  const [towingUrl, setTowingUrl] = useState<ImageState>(INIT_IMG_STATE)
  const [semiUrl, setSemiUrl] = useState<ImageState>(INIT_IMG_STATE)
  // const [etcUrl, setEtcUrl] = useState<ImageState>(INIT_IMG_STATE)
  const [etcUrl, setEtcUrl] = useState<{ [key: number]: ImageState }>({})


  const form = useForm<FieldType>({
    defaultValues: {
      towing_image: {
        file: [],
        url: ''
      },
      semi_image: {
        file: [],
        url: ''
      },
      etc_image: {
        file: [],
        url: ''
      },
      truck_dimension_image: {
        file: [],
        url: ''
      },
      semi_dimension_image: {
        file: [],
        url: ''
      },
      cargo_dimension_image: {
        file: [],
        url: ''
      },
      combined_vehicle_image: {
        file: [],
        url: ''
      },
      turn_radius_image: {
        file: [],
        url: ''
      },
      highway_permit_image: {
        file: [],
        url: ''
      },
      highway_number_image: {
        file: [],
        url: ''
      },
      rural_permit_image: {
        file: [],
        url: ''
      },
      rural_number_image: {
        file: [],
        url: ''
      },
    },
  })

  const {
    setValue,
    control,
    formState: { errors }
  } = form

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadImageAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue(fieldName as any, response.data?.url)
      } else {
        console.log('Error')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [setValue])

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (
    stateType:
      'towing' |
      'semi' |
      'etc' |
      'truck_dimension' |
      'semi_dimension' |
      'cargo_dimension' |
      'combined_vehicle' |
      'turn_radius' |
      'highway_permit' |
      'highway_number' |
      'rural_permit' |
      'rural_number',
    imgUrl: string
  ) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        if (stateType === 'towing') {
          setValue('towing_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.towing_vehicle?.vehicle_picture?.front_rear_url)),
              name: 'รถลากจูง',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'semi') {
          setValue('semi_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url)),
              name: 'รถกึ่งพ่วง',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'etc') {
          setValue('etc_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.etc_vehicle?.vehicle_picture?.front_rear_url)),
              name: 'เครื่องจักร / สินค้า',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'truck_dimension') {
          setValue('truck_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.truck_dimension_url)),
              name: 'รูปแบบที่แสดงมิติ รถลากจูง',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'semi_dimension') {
          setValue('semi_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.semi_trailer_dimension_url)),
              name: 'รูปแบบที่แสดงมิติ รถกึ่งพ่วง',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'cargo_dimension') {
          setValue('cargo_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.cargo_dimension_url)),
              name: 'รูปแบบที่แสดงมิติ เครื่องจักร / สินค้า',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'combined_vehicle') {
          setValue('combined_vehicle_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.combined_vehicle_url)),
              name: 'รูปแบบยานพาหนะรวมสิ่งของ',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'turn_radius') {
          setValue('turn_radius_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.turn_radius)),
              name: 'รูปแบบที่แสดงรัศมีวงเลี่ยว',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'highway_permit') {
          setValue('highway_permit_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.highway_dept_permit_url)),
              name: 'เอกสารขออนุญาตจาก ทล.',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'highway_number') {
          setValue('highway_number_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.highway_dept_permit_number_url)),
              name: 'เลขที่ขออนุญาตเดิมจาก ทล.',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'rural_permit') {
          setValue('rural_permit_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.rural_highway_dept_permit_url)),
              name: 'เอกสารขออนุญาตจาก ทช.',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'rural_number') {
          setValue('rural_number_image.file', [
            {
              // crossOrigin: 'use-credentials',
              // name: extractFileName(String(item?.rural_highway_dept_permit_url)),
              name: 'เลขที่ขออนุญาตเดิมจาก ทช.',
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, setValue])

  const fetchStateImage = useCallback(async (stateType: 'towing' | 'semi' | 'etc', imgUrl: string[], etcId?: number) => {
    dispatch(setLoading(true))
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
          setTowingUrl({
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
          setSemiUrl({
            front: imgArr[0],
            back: imgArr[1],
            side: imgArr[2],
          })
        }
        // if (stateType === 'etc') {
        //   const imgArr = response.map((item) => {
        //     const blobFile = new Blob([item.data], { type: item.data.type })
        //     const url = URL.createObjectURL(blobFile)
        //     return url
        //   })
        //   setEtcUrl({
        //     front: imgArr[0],
        //     back: imgArr[1],
        //     side: imgArr[2],
        //   })
        // }
        if (stateType === 'etc') {
          const imgArr = response.map((item) => {
            const blobFile = new Blob([item.data], { type: item.data.type })
            const url = URL.createObjectURL(blobFile)
            return url
          })
          setEtcUrl(prev => ({
            ...prev,
            [etcId as number]: {
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
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    if (item?.towing_vehicle?.vehicle_picture?.front_rear_url) {
      if (extractUrl(item?.towing_vehicle?.vehicle_picture?.front_rear_url)) {
        fetchStateImage('towing', [
          extractUrl(item?.towing_vehicle?.vehicle_picture?.front_rear_url),
          extractUrl(item?.towing_vehicle?.vehicle_picture?.back_rear_url),
          extractUrl(item?.towing_vehicle?.vehicle_picture?.side_rear_url),
        ])
      }
    }
    if (item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url) {
      if (extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url)) {
        fetchStateImage('semi', [
          extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url),
          extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.back_rear_url),
          extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.side_rear_url),
        ])
      }
    }

    if (item?.etc_vehicle && Array.isArray(item?.etc_vehicle) && item?.etc_vehicle.length > 0) {
      item?.etc_vehicle.forEach((etcId, index) => {
        if (extractUrl(etcId?.vehicle_picture?.front_rear_url)) {
          fetchStateImage('etc', [
            extractUrl(etcId?.vehicle_picture?.front_rear_url),
            extractUrl(etcId?.vehicle_picture?.back_rear_url),
            extractUrl(etcId?.vehicle_picture?.side_rear_url),
          ], index)
        }
      })
    }
    // if (item?.etc_vehicle?.vehicle_picture?.front_rear_url) {
    //   if (extractUrl(item?.etc_vehicle?.vehicle_picture?.front_rear_url)) {
    //     fetchStateImage('etc', [
    //       extractUrl(item?.etc_vehicle?.vehicle_picture?.front_rear_url),
    //       extractUrl(item?.etc_vehicle?.vehicle_picture?.back_rear_url),
    //       extractUrl(item?.etc_vehicle?.vehicle_picture?.side_rear_url),
    //     ])
    //   }
    // }
  }, [item, extractUrl, fetchStateImage])

  useEffect(() => {
    if (item?.towing_vehicle?.vehicle_picture?.front_rear_url) {
      if (extractUrl(item?.towing_vehicle?.vehicle_picture?.front_rear_url)) {
        fetchImage('towing', extractUrl(item?.towing_vehicle?.vehicle_picture?.front_rear_url))
      }
    }
    if (item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url) {
      if (extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url)) {
        fetchImage('semi', extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url))
      }
    }
    // if (item?.etc_vehicle?.vehicle_picture?.front_rear_url) {
    //   if (extractUrl(item?.etc_vehicle?.vehicle_picture?.front_rear_url)) {
    //     fetchImage('etc', extractUrl(item?.etc_vehicle?.vehicle_picture?.front_rear_url))
    //   }
    // }
    if (item?.truck_dimension_url) {
      if (extractUrl(item?.truck_dimension_url)) {
        fetchImage('truck_dimension', extractUrl(item?.truck_dimension_url))
      }
    }
    if (item?.semi_trailer_dimension_url) {
      if (extractUrl(item?.semi_trailer_dimension_url)) {
        fetchImage('semi_dimension', extractUrl(item?.semi_trailer_dimension_url))
      }
    }
    if (item?.cargo_dimension_url) {
      if (extractUrl(item?.cargo_dimension_url)) {
        fetchImage('cargo_dimension', extractUrl(item?.cargo_dimension_url))
      }
    }
    if (item?.combined_vehicle_url) {
      if (extractUrl(item?.combined_vehicle_url)) {
        fetchImage('combined_vehicle', extractUrl(item?.combined_vehicle_url))
      }
    }
    if (item?.turning_radius_url) {
      if (extractUrl(item?.turning_radius_url)) {
        fetchImage('turn_radius', extractUrl(item?.turning_radius_url))
      }
    }
    if (item?.highway_dept_permit_url) {
      if (extractUrl(item?.highway_dept_permit_url)) {
        fetchImage('highway_permit', extractUrl(item?.highway_dept_permit_url))
      }
    }
    if (item?.highway_dept_permit_number_url) {
      if (extractUrl(item?.highway_dept_permit_number_url)) {
        fetchImage('highway_number', extractUrl(item?.highway_dept_permit_number_url))
      }
    }
    if (item?.rural_highway_dept_permit_url) {
      if (extractUrl(item?.rural_highway_dept_permit_url)) {
        fetchImage('rural_permit', extractUrl(item?.rural_highway_dept_permit_url))
      }
    }
    if (item?.rural_highway_dept_permit_number_url) {
      if (extractUrl(item?.rural_highway_dept_permit_number_url)) {
        fetchImage('rural_number', extractUrl(item?.rural_highway_dept_permit_number_url))
      }
    }
  }, [item, extractUrl, fetchImage])

  // const _itemRender = useCallback((
  //   originNode: ReactElement,
  //   file: UploadFile,
  //   fileList: UploadFile[],
  //   actions: {
  //     download: (file: UploadFile) => void,
  //     preview: (file: UploadFile) => void,
  //     remove: (file: UploadFile) => void
  //   }) => {
  //   if (file.type === 'application/pdf') {
  //     return (
  //       <div className='custom-upload-item'>
  //         {originNode}
  //         <div className='preview-overlay rounded-md'>
  //           <EyeOutlined
  //             className='preview-icon'
  //             onClick={() => {
  //               const url = URL.createObjectURL(file.originFileObj as RcFile);
  //               window.open(url);
  //             }}
  //           />
  //           <DeleteOutlined
  //             className='delete-icon'
  //             onClick={() => actions.remove(file)}
  //           />
  //         </div>
  //       </div>
  //     )
  //   }
  //   return originNode
  // }, []);

  const renderETC = useCallback((value: ETCVehicle[]) => {
    const arr = []
    if (value?.length) {
      for (const etc_id of value) {
        arr.push(etc_id)
      }
    }
    if (arr.length) {
      return arr.map((item, index) => {
        const images = etcUrl[index] || INIT_IMG_STATE
        return (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              pagination={true}
            >
              <SwiperSlide>
                <figure className='h-60 relative overflow-hidden rounded-lg'>
                  <Image
                    src={images.front}
                    alt={'semi-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                  <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                    <div className='block p-3'>
                      <p className='text-white'>{item?.plate_no}</p>
                    </div>
                  </section>
                </figure>
              </SwiperSlide>
              <SwiperSlide>
                <figure className='h-60 relative overflow-hidden rounded-lg'>
                  <Image
                    src={images.back}
                    alt={'semi-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                  <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                    <div className='block p-3'>
                      <p className='text-white'>{item?.plate_no}</p>
                    </div>
                  </section>
                </figure>
              </SwiperSlide>
              <SwiperSlide>
                <figure className='h-60 relative overflow-hidden rounded-lg'>
                  <Image
                    src={images.side}
                    alt={'semi-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                  <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                    <div className='block p-3'>
                      <p className='text-white'>{item?.plate_no}</p>
                    </div>
                  </section>
                </figure>
              </SwiperSlide>
            </Swiper>
          </Col>
        )
      })
    }
  }, [etcUrl])

  return (
    <>
      <section>
        <h5 className='mb-3'>รูปภาพยานพาหนะ</h5>
        <Row gutter={[16, 16]}>
          {item?.towing_vehicle?.vehicle_picture?.front_rear_url ?
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                pagination={true}
              >
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={towingUrl.front}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถลากจูง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={towingUrl.back}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถลากจูง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={towingUrl.side}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถลากจูง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
              </Swiper>
            </Col>
            : null}
          {item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url ?
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                pagination={true}
              >
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={semiUrl.front}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถกึ่งพ่วง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={semiUrl.back}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถกึ่งพ่วง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={semiUrl.side}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>รถกึ่งพ่วง</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
              </Swiper>
            </Col>
            : null}
        </Row>
      </section>
      {item.etc_vehicle && (
        <section className='mt-5'>
          <h5 className='mb-3'>รูปภาพเครื่องจักร / สินค้า</h5>
          <Row gutter={[16, 16]}>
            {renderETC(item.etc_vehicle)}
          </Row>
          {/* <Row gutter={[16, 16]}>
          {item?.etc_vehicle?.vehicle_picture?.front_rear_url ?
            <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                pagination={true}
              >
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={etcUrl.front}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>เครื่องจักร / สินค้า</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={etcUrl.back}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>เครื่องจักร / สินค้า</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
                <SwiperSlide>
                  <figure className='h-60 relative overflow-hidden rounded-lg'>
                    <Image
                      src={etcUrl.side}
                      alt={'semi-vehicle'}
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback='data:image/png;base64,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'
                    />
                    <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                      <div className='block p-3'>
                        <p className='text-white'>เครื่องจักร / สินค้า</p>
                      </div>
                    </section>
                  </figure>
                </SwiperSlide>
              </Swiper>
            </Col>
            : null}
        </Row> */}
        </section>
      )}
      <section className='mt-5'>
        <h5 className='mb-3'>เอกสารรายละเอียดยานพาหนะ</h5>
        {
          [
            item?.truck_dimension_url,
            item?.semi_trailer_dimension_url,
            item?.cargo_dimension_url,
            item?.combined_vehicle_url,
            item?.rural_highway_dept_permit_number_url,
            item?.rural_highway_dept_permit_url,
            item?.highway_dept_permit_number_url,
            item?.highway_dept_permit_url,
            item?.turning_radius_url
          ].filter(item => item !== "").length ?
            <Row gutter={[16, 16]}>
              {item?.truck_dimension_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='truck_dimension_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถลากจูง'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>รูปแบบที่แสดงมิติ รถลากจูง</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`truck_dimension_image.url`, e.fileList)
                              } else {
                                setValue(`truck_dimension_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.truck_dimension_image?.file &&
                            <p className='text-red-500'>{errors.truck_dimension_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.semi_trailer_dimension_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='semi_dimension_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถกึ่งพ่วง'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>รูปแบบที่แสดงมิติ รถกึ่งพ่วง</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`semi_dimension_image.url`, e.fileList)
                              } else {
                                setValue(`semi_dimension_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.semi_dimension_image?.file &&
                            <p className='text-red-500'>{errors.semi_dimension_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.cargo_dimension_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='cargo_dimension_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ เครื่องจักร / สินค้า'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>รูปแบบที่แสดงมิติ เครื่องจักร / สินค้า</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`cargo_dimension_image.url`, e.fileList)
                              } else {
                                setValue(`cargo_dimension_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.cargo_dimension_image?.file &&
                            <p className='text-red-500'>{errors.cargo_dimension_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.combined_vehicle_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='combined_vehicle_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดรูปแบบยานพาหนะรวมสิ่งของ'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>รูปแบบยานพาหนะรวมสิ่งของ</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`combined_vehicle_image.url`, e.fileList)
                              } else {
                                setValue(`combined_vehicle_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.combined_vehicle_image?.file &&
                            <p className='text-red-500'>{errors.combined_vehicle_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.turning_radius_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='turn_radius_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดรูปแบบที่แสดงรัศมีวงเลี่ยว'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>รูปแบบที่แสดงรัศมีวงเลี่ยว</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`turn_radius_image.url`, e.fileList)
                              } else {
                                setValue(`turn_radius_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.turn_radius_image?.file &&
                            <p className='text-red-500'>{errors.turn_radius_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.highway_dept_permit_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='highway_permit_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทล.'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>เอกสารขออนุญาตจาก ทล.</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`highway_permit_image.url`, e.fileList)
                              } else {
                                setValue(`highway_permit_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.highway_permit_image?.file &&
                            <p className='text-red-500'>{errors.highway_permit_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.highway_dept_permit_number_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='highway_number_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทล.'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>เลขที่ขออนุญาตเดิมจาก ทล.</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`highway_number_image.url`, e.fileList)
                              } else {
                                setValue(`highway_number_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.highway_number_image?.file &&
                            <p className='text-red-500'>{errors.highway_number_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.rural_highway_dept_permit_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='rural_permit_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทช.'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>เอกสารขออนุญาตจาก ทช.</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`rural_permit_image.url`, e.fileList)
                              } else {
                                setValue(`rural_permit_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.rural_permit_image?.file &&
                            <p className='text-red-500'>{errors.rural_permit_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
              {item?.rural_highway_dept_permit_number_url ?
                <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
                  <Controller
                    disabled
                    name='rural_number_image.file'
                    control={control}
                    rules={{
                      required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทช.'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>เลขที่ขออนุญาตเดิมจาก ทช.</label>
                          <Upload
                            {...field}
                            fileList={field.value || []}
                            maxCount={1}
                            listType='picture-card'
                            accept='application/pdf'
                            beforeUpload={(file) => {
                              // DEFAULT VALUES
                              const allowList = ['application/pdf']
                              const maxFileSize = 10000000
                              // CHECK
                              const isListAvailable = allowList.some(item => item === file.type)
                              const isLt10 = file.size < maxFileSize
                              if (!isListAvailable) {
                                message.error('ประเภทไฟล์ไม่ถูกต้อง')
                                return Upload.LIST_IGNORE
                              }
                              if (!isLt10) {
                                message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                                return Upload.LIST_IGNORE
                              }
                              return false
                            }}
                            // itemRender={_itemRender}
                            onChange={(e) => {
                              field.onChange(e.fileList);
                              if (e.fileList.length) {
                                uploadFile(`rural_number_image.url`, e.fileList)
                              } else {
                                setValue(`rural_number_image.url`, '')
                              }
                            }}
                            onPreview={(e) => {
                              const url = URL.createObjectURL(e.originFileObj as RcFile);
                              window.open(url);
                            }}
                          >
                            {field.value.length ? null :
                              <div className="my-8 text-center">
                                <div className="text-6xl mb-4 flex justify-center">
                                  <UploadIcon />
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  เพิ่มไฟล์
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  กรุณาอัปโหลดไฟล์ประเภท PDF
                                </p>
                              </div>
                            }
                          </Upload>
                          {!!errors.rural_number_image?.file &&
                            <p className='text-red-500'>{errors.rural_number_image?.file.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                : null}
            </Row>
            :
            <Empty description='ไม่พบข้อมูลเอกสารรายละเอียดยานพาหนะ' />
        }
        {/* {(item?.truck_dimension_url &&
          item?.semi_trailer_dimension_url &&
          item?.cargo_dimension_url &&
          item?.combined_vehicle_url &&
          item?.rural_highway_dept_permit_number_url &&
          item?.rural_highway_dept_permit_url &&
          item?.highway_dept_permit_number_url &&
          item?.highway_dept_permit_url &&
          item?.turning_radius_url) ?
          <></>
          : <Empty description='ไม่พบข้อมูลเอกสารรายละเอียดยานพาหนะ' />} */}
      </section>
    </>
  )
}

export default React.memo<Props>(ContentImage)
