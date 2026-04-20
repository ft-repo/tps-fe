/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FormPermitRoute } from '..'
import DocumentTabList from '../route-estimate/petition/DocumentTabList'
import { useRouteContext } from '../../context'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Col, Modal, Row, UploadFile } from 'antd'
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list'
import { PetitionConfirmRequest, PetitionDocumentRequest, PetitionVehicleRequest } from '@/@types/services/petition'
import dayjs from 'dayjs'
import { postConfirmPetitionAPI, putPetitionDocumentAPI, putPetitionVehicleAPI } from '@/services/entrepreneur/PetitionService'
import { getPetitionData } from '@/store/slices/entrepreneur'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { APIResponseRegion } from '@/@types/shared'
import axios from 'axios'
import { CheckCircleFilled } from '@ant-design/icons'

interface Props {

}

const RequestPermit: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser, setStep } = useRouteContext()
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { user } = useAppSelector(state => state.auth)
  const { province } = useAppSelector(state => state.master)
  const { petition, petition_detail } = useAppSelector(state => state.entrepreneur.permitList)
  // REACT HOOK
  const navigate = useNavigate()
  const location = useLocation();
  // GET STATE
  const { state } = location;
  const isEditDocument = state?.type === 'ตรวจเอกสาร' ? true : false
  const isEditVehicle = (state?.type === 'ตรวจยานพาหนะ' || state?.type === 'รอแก้ไข') ? true : false

  // console.log(dataParser)
  // console.log(user)

  const form = useForm<FieldTypePetition>({
    defaultValues: {
      set_id: dataParser.res_data.set_id,
      start_date: state?.petition_id ? dayjs(petition_detail.document.start_date) : dayjs().add(62, 'day'),
      end_date: state?.petition_id ? dayjs(petition_detail.document.end_date) : dayjs().add(62, 'day').add(1, 'year'),
      contact_name: state?.petition_id ? petition_detail.document.contact_name : user.details.contact_info.contact_name,
      phone_number: state?.petition_id ? petition_detail.document.contact_phone_no : user.details.contact_info.phone_number,
      project_name: state?.petition_id ? petition_detail.document.project_name : '',
      start_point: state?.petition_id ? petition_detail.document.start_point : dataParser.raw_body.start_point,
      end_point: state?.petition_id ? petition_detail.document.end_point : dataParser.raw_body.end_point,
      start_province: dataParser.region_detail.start.id,
      end_Povince: dataParser.region_detail.end.id,
      poa_url: {
        file: [],
        url: ''
      },
      mach_book_url: {
        file: [],
        url: ''
      },
      vehicle: state?.petition_id ?
        petition_detail.vehicle.vehicle_list.map(item => {
          return {
            estimate_id: item.sort,
            truck_dimension_url: {
              file: [],
              url: ''
            },
            semi_trailer_dimension_url: {
              file: [],
              url: ''
            },
            combined_vehicle_url: {
              file: [],
              url: ''
            },
            turning_radius_url: {
              file: [],
              url: ''
            },
            cargo_dimension_url: {
              file: [],
              url: ''
            },
            highway_dept_permit_url: {
              file: [],
              url: ''
            },
            highway_dept_permit_number_url: {
              file: [],
              url: ''
            },
            rural_highway_dept_permit_url: {
              file: [],
              url: ''
            },
            rural_highway_dept_permit_number_url: {
              file: [],
              url: ''
            },
          }
        })
        : dataParser.res_data.estimate.map(item => {
          return {
            estimate_id: item.estimate_id,
            truck_dimension_url: {
              file: [],
              url: ''
            },
            semi_trailer_dimension_url: {
              file: [],
              url: ''
            },
            combined_vehicle_url: {
              file: [],
              url: ''
            },
            turning_radius_url: {
              file: [],
              url: ''
            },
            cargo_dimension_url: {
              file: [],
              url: ''
            },
            highway_dept_permit_url: {
              file: [],
              url: ''
            },
            highway_dept_permit_number_url: {
              file: [],
              url: ''
            },
            rural_highway_dept_permit_url: {
              file: [],
              url: ''
            },
            rural_highway_dept_permit_number_url: {
              file: [],
              url: ''
            },
          }
        })
    }
  })
  const { handleSubmit, control, setValue, reset } = form

  const onCreate = useCallback(async (value: FieldTypePetition) => {
    const body: PetitionConfirmRequest = {
      set_id: value.set_id,
      start_date: dayjs(value.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(value.end_date).format('YYYY-MM-DD'),
      contact_name: value.contact_name,
      phone_number: value.phone_number,
      project_name: value.project_name,
      start_point: value.start_point,
      end_point: value.end_point,
      start_province: String(province.find(item => item.id === value.start_province)?.name_th) || String(value.start_province),
      end_Povince: String(province.find(item => item.id === value.end_Povince)?.name_th) || String(value.end_Povince),
      poa_url: value.poa_url.url,
      mach_book_url: value.mach_book_url.url,
      vehicle: value.vehicle.map((item) => {
        return {
          estimate_id: item.estimate_id,
          truck_dimension_url: item.truck_dimension_url.url,
          semi_trailer_dimension_url: item.semi_trailer_dimension_url.url,
          combined_vehicle_url: item.combined_vehicle_url.url,
          turning_radius_url: item.turning_radius_url.url,
          cargo_dimension_url: item.cargo_dimension_url.url,
          highway_dept_permit_url: item.highway_dept_permit_url.url,
          highway_dept_permit_number_url: item.highway_dept_permit_number_url.url,
          rural_highway_dept_permit_url: item.rural_highway_dept_permit_url.url,
          rural_highway_dept_permit_number_url: item.rural_highway_dept_permit_number_url.url,
        }
      })
    }

    dispatch(setLoading(true))
    try {
      const response = await postConfirmPetitionAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'ส่งคำขออนุญาตสำเร็จ',
          content: 'เจ้าหน้าที่ได้รับคำขออนุญาตของคุณแล้ว ใช้ระยะเวลาการพิจารณาภายใน 61 วันทำการโดยไม่นับรวมระยะเวลาที่ผู้ยื่นคำขอใช้ในการแก้ไขหรือเพิ่มเติมเอกสาร ในกรณีที่เอกสารหลักฐานที่ยื่นไม่ครบถ้วนหรือไม่ถูกต้องตามหลักเกณฑ์ที่กำหนด คุณสามารถติดตามสถานะได้ที่ รายการขออนุญาต',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getPetitionData(petition.overview.search))
            navigate('/permit-list')
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, province, petition.overview.search, navigate])

  const onUpdateDocument = useCallback(async (value: FieldTypePetition) => {
    const body: PetitionDocumentRequest = {
      "petition_id": petition_detail.document.petition_id,
      "start_date": dayjs(value.start_date).format('YYYY-MM-DD'),
      "end_date": dayjs(value.end_date).format('YYYY-MM-DD'),
      "contact_name": value.contact_name,
      "phone_number": value.phone_number,
      "project_name": value.project_name,
      "poa_url": value.poa_url.url,
      "mach_book_url": value.mach_book_url.url
    }

    dispatch(setLoading(true))
    try {
      const response = await putPetitionDocumentAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'ส่งคำขออนุญาตสำเร็จ',
          content: 'เจ้าหน้าที่ได้รับคำขออนุญาตของคุณแล้ว ใช้ระยะเวลาการพิจารณาภายใน 61 วันทำการโดยไม่นับรวมระยะเวลาที่ผู้ยื่นคำขอใช้ในการแก้ไขหรือเพิ่มเติมเอกสาร ในกรณีที่เอกสารหลักฐานที่ยื่นไม่ครบถ้วนหรือไม่ถูกต้องตามหลักเกณฑ์ที่กำหนด คุณสามารถติดตามสถานะได้ที่ รายการขออนุญาต',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getPetitionData(petition.overview.search))
            navigate('/permit-list')
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [petition_detail.document.petition_id, dispatch, petition.overview.search, navigate])

  const onUpdateVehicle = useCallback(async (value: FieldTypePetition) => {
    const body: PetitionVehicleRequest = {
      petition_id: state?.petition_id,
      vehicle: value.vehicle.map((item) => {
        return {
          estimate_id: item.estimate_id,
          truck_dimension_url: item.truck_dimension_url.url,
          semi_trailer_dimension_url: item.semi_trailer_dimension_url.url,
          combined_vehicle_url: item.combined_vehicle_url.url,
          turning_radius_url: item.turning_radius_url.url,
          cargo_dimension_url: item.cargo_dimension_url.url,
          highway_dept_permit_url: item.highway_dept_permit_url.url,
          highway_dept_permit_number_url: item.highway_dept_permit_number_url.url,
          rural_highway_dept_permit_url: item.rural_highway_dept_permit_url.url,
          rural_highway_dept_permit_number_url: item.rural_highway_dept_permit_number_url.url,
        }
      })
    }

    dispatch(setLoading(true))
    try {
      const response = await putPetitionVehicleAPI(body)
      // console.log(response)
      if (response.status === 200) {
        Modal.success({
          title: 'ส่งคำขออนุญาตสำเร็จ',
          content: 'เจ้าหน้าที่ได้รับคำขออนุญาตของคุณแล้ว ใช้ระยะเวลาการพิจารณาภายใน 61 วันทำการโดยไม่นับรวมระยะเวลาที่ผู้ยื่นคำขอใช้ในการแก้ไขหรือเพิ่มเติมเอกสาร ในกรณีที่เอกสารหลักฐานที่ยื่นไม่ครบถ้วนหรือไม่ถูกต้องตามหลักเกณฑ์ที่กำหนด คุณสามารถติดตามสถานะได้ที่ รายการขออนุญาต',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getPetitionData(petition.overview.search))
            navigate('/permit-list')
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error)
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, state?.petition_id, petition.overview.search, navigate])

  const onSubmit = useCallback(async (value: FieldTypePetition) => {
    if (state?.petition_id) {
      // console.log("FUNCTION WORK")
      // console.log(state?.petition_id)
      // console.log(isEditDocument)
      // console.log(isEditVehicle)
      if (isEditDocument) {
        onUpdateDocument(value)
        // console.log("FIRST")
      }
      if (isEditVehicle) {
        onUpdateVehicle(value)
        // console.log("SECOND")
      }
    } else {
      // console.log("THIRD")
      onCreate(value)
    }
  }, [onUpdateDocument, onUpdateVehicle, onCreate, state?.petition_id, isEditDocument, isEditVehicle])

  // const confirmSubmit = useCallback(() => {
  //   Modal.confirm({
  //     title: 'ยืนยันการขอใบอนุญาต',
  //     content: 'กรุณาตรวจสอบข้อมูลให้ครบถ้วน',
  //     okText: 'ขอใบอนุญาต',
  //     cancelText: 'ยกเลิก',
  //     onOk: () => submitRef.current?.click(),
  //     onCancel: () => Modal.destroyAll(),
  //     okButtonProps: {
  //       style: {
  //         fontFamily: 'Noto Sans Thai'
  //       },
  //       loading: loading
  //     },
  //     cancelButtonProps: {
  //       style: {
  //         fontFamily: 'Noto Sans Thai'
  //       },
  //       disabled: loading
  //     },
  //     style: {
  //       fontFamily: 'Noto Sans Thai'
  //     }
  //   })
  // }, [loading])

  const resolveProvinceFromCoords = useCallback(async (
    coordStr: string,
    field: 'start_province' | 'end_Povince'
  ) => {
    const match = coordStr.match(/([\d.\-]+),\s*([\d.\-]+)/)
    if (!match) return
    try {
      const response = await axios.get<APIResponseRegion>(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${match[1]}&longitude=${match[2]}&localityLanguage=th`
      )
      if (response.status === 200) {
        const localText = response.data.principalSubdivision.replace(/^จังหวัด/, '')
        const findProvinceId = province.find(item => item.name_th === localText)?.id
        if (findProvinceId) {
          setValue(field, Number(findProvinceId))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [province, setValue])

  useEffect(() => {
    if (!state?.petition_id) return
    if (!petition_detail.document.start_date) return

    const stripCoords = (raw: string) => {
      const m = raw.match(/([\d.\-]+,\s*[\d.\-]+)/)
      return m ? m[1].trim() : raw
    }

    reset({
      set_id: dataParser.res_data.set_id,
      start_date: dayjs(petition_detail.document.start_date),
      end_date: dayjs(petition_detail.document.end_date),
      contact_name: petition_detail.document.contact_name,
      phone_number: petition_detail.document.contact_phone_no,
      project_name: petition_detail.document.project_name,
      start_point: stripCoords(petition_detail.document.start_point),
      end_point: stripCoords(petition_detail.document.end_point),
      start_province: dataParser.region_detail.start.id,
      end_Povince: dataParser.region_detail.end.id,
      poa_url: { file: [], url: '' },
      mach_book_url: { file: [], url: '' },
      vehicle: petition_detail.vehicle.vehicle_list.map((item, index) => ({
        estimate_id: petition_detail.road_map.estimate[index]?.id ?? '',
        truck_dimension_url: { file: [], url: '' },
        semi_trailer_dimension_url: { file: [], url: '' },
        combined_vehicle_url: { file: [], url: '' },
        turning_radius_url: { file: [], url: '' },
        cargo_dimension_url: { file: [], url: '' },
        highway_dept_permit_url: { file: [], url: '' },
        highway_dept_permit_number_url: { file: [], url: '' },
        rural_highway_dept_permit_url: { file: [], url: '' },
        rural_highway_dept_permit_number_url: { file: [], url: '' },
      })),
    })
    resolveProvinceFromCoords(petition_detail.document.start_point, 'start_province')
    resolveProvinceFromCoords(petition_detail.document.end_point, 'end_Povince')
  }, [
    petition_detail.document,
    petition_detail.vehicle.vehicle_list,
    reset,
    state?.petition_id,
    dataParser.res_data.set_id,
    dataParser.region_detail.start.id,
    dataParser.region_detail.end.id,
    resolveProvinceFromCoords,
    petition_detail.road_map.estimate
  ])

  const extractUrl = useCallback((url: string) => {
    return url.split('/upload')[1]
  }, [])

  const fetchFileToField = useCallback(async (fieldName: string, label: string, fullUrl: string) => {
    const path = extractUrl(fullUrl)
    if (!path) return
    try {
      const response = await getUploadAPI(path)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const objectUrl = URL.createObjectURL(blobFile)
        setValue(`${fieldName}.file` as any, [{
          name: label,
          uid: fieldName,
          status: 'done',
          url: objectUrl,
          type: response.data.type,
          originFileObj: blobFile as any,
        } as UploadFile])
        setValue(`${fieldName}.url` as any, fullUrl)
      }
    } catch (error) {
      console.error(error)
    }
  }, [extractUrl, setValue])

  useEffect(() => {
    if (!state?.petition_id) return
    if (!petition_detail.document.start_date) return
    if (!petition_detail.road_map.estimate.length) return   // ← add this
    if (petition_detail.road_map.estimate.length !== petition_detail.vehicle.vehicle_list.length) return  // ← add this

    if (petition_detail.document.poa_url) {
      fetchFileToField('poa_url', 'หนังสือมอบอำนาจ', petition_detail.document.poa_url)
    }
    if (petition_detail.document.mach_book_url) {
      fetchFileToField('mach_book_url', 'สมุดคู่มือจดทะเบียน', petition_detail.document.mach_book_url)
    }
    petition_detail.vehicle.vehicle_list.forEach((item, index) => {
      const urlFields: Array<[string, string]> = [
        ['truck_dimension_url', 'รูปแบบที่แสดงมิติ รถลากจูง'],
        ['semi_trailer_dimension_url', 'รูปแบบที่แสดงมิติ รถกึ่งพ่วง'],
        ['combined_vehicle_url', 'รูปแบบยานพาหนะรวมสิ่งของ'],
        ['turning_radius_url', 'รูปแบบที่แสดงรัศมีวงเลี่ยว'],
        ['cargo_dimension_url', 'รูปแบบที่แสดงมิติ เครื่องจักร / สินค้า'],
        ['highway_dept_permit_url', 'เอกสารขออนุญาตจาก ทล.'],
        ['highway_dept_permit_number_url', 'เลขที่ขออนุญาตเดิมจาก ทล.'],
        ['rural_highway_dept_permit_url', 'เอกสารขออนุญาตจาก ทช.'],
        ['rural_highway_dept_permit_number_url', 'เลขที่ขออนุญาตเดิมจาก ทช.'],
      ]
      urlFields.forEach(([field, label]) => {
        const url = (item as any)[field] as string
        if (url) {
          fetchFileToField(`vehicle.${index}.${field}`, label, url)
        }
      })
    })
  }, [
    state?.petition_id,
    petition_detail.document.start_date,
    petition_detail.document.poa_url,
    petition_detail.document.mach_book_url,
    petition_detail.vehicle.vehicle_list,
    petition_detail.road_map.estimate,
    fetchFileToField,
  ])

  const onPrintAddress = useCallback(() => {
    const postalCode = '10220'
    const circles = postalCode.split('').map(d =>
      `<span class="circle">${d}</span>`
    ).join('')

    const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      @page { size: A4 landscape; margin: 0; }
      html, body {
        font-family: 'Noto Sans Thai', sans-serif;
        width: 297mm;
        height: 210mm;
        overflow: hidden;
      }
      body {
        padding: 16mm 0 0 16mm;
        display: block;
      }
      .label {
        width: 120mm;
      }
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .line {
        border-bottom: 1.5px dashed #888;
        padding-bottom: 4px;
        margin-bottom: 18px;
        font-size: 14px;
        min-height: 24px;
      }
      .postal-row {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 6px;
      }
      .label-text {
        font-size: 14px;
        font-weight: 700;
        margin-right: 4px;
        white-space: nowrap;
      }
      .circle {
        width: 30px; height: 30px;
        border: 1.5px solid #888;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <div class="label">
      <div class="title">ชื่อผู้รับ</div>
      <div class="line">กรมทางหลวงชนบท สำนักบำรุงทาง</div>
      <div class="line">เลขที่ 9 ถนนพหลโยธิน</div>
      <div class="line">แขวงอนุสาวรีย์ เขตบางเขน กทม. 10220</div>
      <div class="line"></div>
      <div class="postal-row">
        <span class="label-text">รหัสไปรษณีย์</span>
        ${circles}
      </div>
    </div>
  </body>
  </html>`

    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1122px;height:794px;border:none;visibility:hidden;'
    document.body.appendChild(iframe)

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(html)
    doc.close()

    setTimeout(() => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
      setTimeout(() => document.body.removeChild(iframe), 1500)
    }, 500)
  }, [])

  const renderResult = useMemo(() => {
    return (
      <div>
        <h5 className='mb-1.5'>รายการเอกสารที่ผู้ยื่นคำขอจำเป็นต้องส่งไปยังกรมทางหลวงชนบท ดังนี้</h5>
        <ol className='list-decimal list-inside mb-5'>
          <li>รูปแบบพาหนะโดยแสดงถึงรัศมีวงเลี้ยว (ฉบับจริง 1 ชุด สำเนา 1 ชุด) พร้อมเซ็นชื่อกำกับ</li>
        </ol>
        <div className='bg-[#FFE3A7] border-[#FF9C00] border-2 p-3 rounded-lg'>
          <p>หมายเหตุ : หากคณะกรรมการพิจารณาคำขออนุญาตใช้ยานพาหนะบางชนิด บางประเภทเดินบนทางหลวงชนบทพิจารณางานขออนุญาต เกิดความไม่สมบูรณ์ของข้อมูลคณะกรรมการฯจะประสานทางผู้ขออนุญาตจำเป็นต้องเข้ามาชี้แจงให้ข้อมูลประกอบการพิจารณาโดยหากผู้ขออนุญาตไม่เข้ามาชี้แจงภายในระยะเวลาตามที่คณะกรรมการฯกำหนด และคณะกรรมการฯจะทำการพิจารณาตามข้อมูลที่ผู้ขออนุญาตยื่นไว้</p>
        </div>
        <div className='mt-5'>
          <p>ที่อยู่ผู้รับ :</p>
          <p>กรมทางหลวงชนบท สำนักบำรุงทาง</p>
          <p>เลขที่ 9 ถนนพหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กทม. 10220</p>
        </div>
      </div>
    )
  }, [])

  const onConfirmPrintAddress = useCallback(() => {
    Modal.confirm({
      title: 'ตรวจสอบเอกสารและพิมพ์ที่อยู่',
      content: renderResult,
      okText: 'พิมพ์ที่อยู่',
      cancelText: 'รับทราบ',
      width: 1400,
      onOk: () => onPrintAddress(),
      onCancel: () => Modal.destroyAll(),
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai',
          backgroundColor: '#1629FF',
          color: '#FFFFFF'
        }
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        type: 'primary'
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      },
      footer: (_, { OkBtn, CancelBtn }) => {
        return (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        )
      }
    })
  }, [renderResult, onPrintAddress])


  const confirmSubmit = useCallback(async (value: FieldTypePetition) => {
    Modal.confirm({
      icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
      title: 'ยืนยันการขอใบอนุญาต',
      content: renderResult,
      okText: 'พิมพ์ที่อยู่',
      cancelText: 'ขอใบอนุญาต',
      width: 1400,
      onOk: () => onPrintAddress(),
      onCancel: () => onSubmit(value),
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai',
          backgroundColor: '#1629FF',
          color: '#FFFFFF'
        }
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        type: 'primary'
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      },
      footer: (_, { OkBtn, CancelBtn }) => {
        return (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        )
      }
    })
  }, [renderResult, onPrintAddress, onSubmit])

  return (
    <>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ใบขออนุญาต</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='primary'
            // size='large'
            className='w-full lg:w-auto !bg-[#1629FF] hover:!bg-[#1629FF90]'
            onClick={() => onConfirmPrintAddress()}
          >
            พิมพ์ที่อยู่
          </Button>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => {
              if (state?.petition_id) {
                navigate('/permit-list')
              } else {
                setStep((prev: number) => prev - 1)
              }
            }}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            // onClick={() => confirmSubmit()}
            onClick={() => submitRef.current?.click()}
          >
            บันทึก
          </Button>
        </div>
      </section>
      <section className='mt-5'>
        <form onSubmit={handleSubmit(confirmSubmit)}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <FormPermitRoute
                control={control}
                setValue={setValue}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <DocumentTabList
                control={control}
                setValue={setValue}
              />
            </Col>
          </Row>
          <button ref={submitRef} hidden type='submit' />
        </form>
      </section>
    </>
  )
}

export default React.memo<Props>(RequestPermit)
