/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { APIPostBody, VehicleListByIDResponse } from '@/@types/services/vehicle';
import { Col, message, Modal, Row, UploadFile } from 'antd'
import React, { Ref, useCallback, useEffect, useRef, useState } from 'react'
import { INIT_VEHICLE_MODAL } from '../screen';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { FormUpdateData, FormUpdateDocument } from '../components';
import { getProductType, setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUploadAPI, putVehicleAPI } from '@/services/entrepreneur/VehicleListService';
import { getVehicleData } from '@/store/slices/entrepreneur';

interface Props {
  open: boolean;
  data: VehicleListByIDResponse;
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse, id: string | number }) => void;
  id: string | number;
}

interface ContentProps {
  id: string | number;
  data: VehicleListByIDResponse,
  submitRef: Ref<HTMLButtonElement>;
  fileList: UploadFile[];
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse, id: string | number }) => void;
}

const Content = (props: ContentProps) => {
  const { id, data, submitRef, setOpen } = props
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const { province } = useAppSelector(state => state.master)

  console.log(data.vehicle_detail)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: data.vehicle_detail.vehicle_type_id || null,
      // license_plate: data.vehicle_detail.vehicle_type_id === 3 ? data.vehicle_detail.plate_no.split(',').map(item => item.trim()) : data.vehicle_detail.plate_no,
      license_plate: data.vehicle_detail.plate_no || '',
      vehicle_model: data.vehicle_detail.brand || '',
      province: province.find(item => item.name_th === data.vehicle_detail.plate_province)?.id || null,
      vehicle_weight: data.vehicle_detail.weight || 0,
      vehicle_distance: data.vehicle_detail.kingpin_distance || 0,
      vehicle_color: data.vehicle_detail.color || '',
      wide_unit: data.vehicle_detail.width || 0,
      long_unit: data.vehicle_detail.length || 0,
      tall_unit: data.vehicle_detail.height || 0,
      vehicle_axles: data.vehicle_detail.axis_type_id || null,
      file_registered_document_id: {
        file: [],
        url: ''
      },
      file_property_document_id: {
        file: [],
        url: ''
      },
      file_hire_contact_document_id: {
        file: [],
        url: ''
      },
      file_purchase_contact_document_id: {
        file: [],
        url: ''
      },
      file_transfer_contact_document_id: {
        file: [],
        url: ''
      },
      file_front_image_id: {
        file: [],
        url: ''
      },
      file_side_image_id: {
        file: [],
        url: ''
      },
      file_back_image_id: {
        file: [],
        url: ''
      },
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
  } = form;

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: APIPostBody = {
      vehicle_detail: {
        vehicle_type_id: value.vehicle_type || '',
        // plate_no: value.vehicle_type === 3 ? [...value.license_plate].join(',') : value.license_plate,
        plate_no: value.license_plate || '',
        plate_province: province.find(item => item.id === value.province)?.name_th || '',
        brand: value.vehicle_model || '',
        weight: Number(value.vehicle_weight) || 0,
        color: value.vehicle_color || '',
        kingpin_distance: Number(value.vehicle_distance) || 0,
        width: Number(value.wide_unit) || 0,
        length: Number(value.long_unit) || 0,
        height: Number(value.tall_unit) || 0,
        axis_type_id: Number(value.vehicle_axles) || null,
        registration_document_url: value.file_registered_document_id.url
      },
      vehicle_owner_document: {
        owner_document_url: value.file_property_document_id.url,
        employment_contact_url: value.file_hire_contact_document_id.url,
        buyer_contact_url: value.file_purchase_contact_document_id.url,
        assignment_contact_url: value.file_transfer_contact_document_id.url
      },
      vehicle_picture: {
        front_rear_url: value.file_front_image_id.url,
        side_rear_url: value.file_side_image_id.url,
        back_rear_url: value.file_back_image_id.url
      }
    }

    // INIT LOADING
    dispatch(setLoading(true))
    // CREATING REQUEST
    try {
      const response = await putVehicleAPI(id, body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getVehicleData(vehicle.overview.search))
            dispatch(getProductType())
            setOpen(INIT_VEHICLE_MODAL)
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
      } else {
        console.log(response)
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
  }, [dispatch, vehicle.overview.search, id, setOpen, province])

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchRegistrationUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_registered_document_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_detail.registration_document_url)),
            name: 'เอกสารเล่มทะเบียน',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_registered_document_id.url', data.vehicle_detail.registration_document_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_detail.registration_document_url, setValue])

  const fetchPropertyUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_property_document_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_owner_documents.owner_document_url)),
            name: 'เอกสารถือครองสิทธิ์',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_property_document_id.url', data.vehicle_owner_documents.owner_document_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_owner_documents.owner_document_url, setValue])

  const fetchHireUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_hire_contact_document_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_owner_documents.employment_contact_url)),
            name: 'สัญญาจ้างหรือเช่า',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_hire_contact_document_id.url', data.vehicle_owner_documents.employment_contact_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_owner_documents.employment_contact_url, setValue])

  const fetchPurchaseUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_purchase_contact_document_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_owner_documents.buyer_contact_url)),
            name: 'สัญญาเช่าซื้อ',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_purchase_contact_document_id.url', data.vehicle_owner_documents.buyer_contact_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_owner_documents.buyer_contact_url, setValue])

  const fetchTransferUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_transfer_contact_document_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_owner_documents.assignment_contact_url)),
            name: 'สัญญามอบสิทธิ์',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_transfer_contact_document_id.url', data.vehicle_owner_documents.assignment_contact_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_owner_documents.assignment_contact_url, setValue])

  const fetchFrontUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_front_image_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_pictures.front_rear_url)),
            name: 'รูปด้านหน้า',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_front_image_id.url', data.vehicle_pictures.front_rear_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_pictures.front_rear_url, setValue])

  const fetchSideUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_side_image_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_pictures.side_rear_url)),
            name: 'รูปด้านข้าง',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_side_image_id.url', data.vehicle_pictures.side_rear_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_pictures.side_rear_url, setValue])

  const fetchBackUrl = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_back_image_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(data.vehicle_pictures.back_rear_url)),
            name: 'รูปด้านหลัง',
            // percent: 100,
            uid: '1',
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: response.data.type,
            originFileObj: blobFile as any,
          }
        ])
        setValue('file_back_image_id.url', data.vehicle_pictures.back_rear_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [data.vehicle_pictures.back_rear_url, setValue])

  useEffect(() => {
    if (data.vehicle_detail.registration_document_url) {
      if (extractUrl(data.vehicle_detail.registration_document_url)) {
        fetchRegistrationUrl(extractUrl(data.vehicle_detail.registration_document_url))
      }
    }
    if (data.vehicle_owner_documents.owner_document_url) {
      if (extractUrl(data.vehicle_owner_documents.owner_document_url)) {
        fetchPropertyUrl(extractUrl(data.vehicle_owner_documents.owner_document_url))
      }
    }
    if (data.vehicle_owner_documents.employment_contact_url) {
      if (extractUrl(data.vehicle_owner_documents.employment_contact_url)) {
        fetchHireUrl(extractUrl(data.vehicle_owner_documents.employment_contact_url))
      }
    }
    if (data.vehicle_owner_documents.buyer_contact_url) {
      if (extractUrl(data.vehicle_owner_documents.buyer_contact_url)) {
        fetchPurchaseUrl(extractUrl(data.vehicle_owner_documents.buyer_contact_url))
      }
    }
    if (data.vehicle_owner_documents.assignment_contact_url) {
      if (extractUrl(data.vehicle_owner_documents.assignment_contact_url)) {
        fetchTransferUrl(extractUrl(data.vehicle_owner_documents.assignment_contact_url))
      }
    }
    //
    if (data.vehicle_pictures.front_rear_url) {
      if (extractUrl(data.vehicle_pictures.front_rear_url)) {
        fetchFrontUrl(extractUrl(data.vehicle_pictures.front_rear_url))
      }
    }
    if (data.vehicle_pictures.side_rear_url) {
      if (extractUrl(data.vehicle_pictures.side_rear_url)) {
        fetchSideUrl(extractUrl(data.vehicle_pictures.side_rear_url))
      }
    }
    if (data.vehicle_pictures.back_rear_url) {
      if (extractUrl(data.vehicle_pictures.back_rear_url)) {
        fetchBackUrl(extractUrl(data.vehicle_pictures.back_rear_url))
      }
    }
  }, [
    extractUrl,
    fetchRegistrationUrl,
    fetchPropertyUrl,
    fetchHireUrl,
    fetchPurchaseUrl,
    fetchTransferUrl,
    fetchFrontUrl,
    fetchSideUrl,
    fetchBackUrl,
    data.vehicle_detail.registration_document_url,
    data.vehicle_owner_documents.owner_document_url,
    data.vehicle_owner_documents.employment_contact_url,
    data.vehicle_owner_documents.buyer_contact_url,
    data.vehicle_owner_documents.assignment_contact_url,
    data.vehicle_pictures.front_rear_url,
    data.vehicle_pictures.side_rear_url,
    data.vehicle_pictures.back_rear_url
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
          <FormUpdateData
            control={control}
            setValue={setValue}
          />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
          <FormUpdateDocument
            control={control}
            setValue={setValue}
          />
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

const ModalUpdateVehicle: React.FC<Props> = (props) => {
  const { open, data, setOpen, id } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const loading = useAppSelector(state => state.layout.loading)
  const dispatch = useAppDispatch()
  const [fileList, setFileList] = useState<any[]>([])

  const extractUrl = useCallback((url: string) => {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\/(business_certificate|business_picture)\/.*/);
    return match ? match[0] : null;
  }, []);

  const extractFileName = useCallback((url: string | null) => {
    const match = url?.match(/\/([^\/]+)$/);
    return match ? match[1] : '';
  }, [])

  const getUploadAPIList = useCallback(async () => {
    // CHECK IF DATA EXISTED
    if (!data) return
    dispatch(setLoading(true))

    const uploadArr = [
      extractUrl(data?.vehicle_detail.registration_document_url || ''),
      extractUrl(data?.vehicle_owner_documents.owner_document_url || ''),
      extractUrl(data?.vehicle_owner_documents.employment_contact_url || ''),
      extractUrl(data?.vehicle_owner_documents.buyer_contact_url || ''),
      extractUrl(data?.vehicle_owner_documents.assignment_contact_url || ''),
      extractUrl(data?.vehicle_pictures.front_rear_url || ''),
      extractUrl(data?.vehicle_pictures.side_rear_url || ''),
      extractUrl(data?.vehicle_pictures.back_rear_url || ''),
    ]
    try {
      const response = await Promise.all(uploadArr.map(item => getUploadAPI(item as string)))
      const result = response.every(item => item.status === 200)
      if (result) {
        setFileList(response.map((item, index) => {
          const blobFile = new Blob([item.data], { type: item.data.type })
          const url = URL.createObjectURL(blobFile)
          // RETURN VALUE
          return {
            // crossOrigin: 'use-credentials',
            name: item.data.name || extractFileName(uploadArr[index]),
            // percent: 100,
            uid: String(index),
            status: 'done',
            url: url,
            // thumbUrl: url,
            type: item.data.type,
            originFileObj: blobFile as any,
          }
        }))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [data, extractUrl, dispatch, extractFileName])

  useEffect(() => {
    if (open) {
      getUploadAPIList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) {
      setFileList([])
    }
  }, [open])

  if (!data) return

  return (
    <Modal
      destroyOnHidden
      width={1600}
      open={open}
      title='แก้ไขข้อมูล'
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        loading: loading
      }}
      cancelButtonProps={{
        loading: loading
      }}
      onOk={() => submitRef.current?.click()}
      onCancel={() => setOpen(INIT_VEHICLE_MODAL)}
    >
      <Content
        id={id}
        data={data}
        submitRef={submitRef}
        fileList={fileList}
        setOpen={setOpen}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalUpdateVehicle)
