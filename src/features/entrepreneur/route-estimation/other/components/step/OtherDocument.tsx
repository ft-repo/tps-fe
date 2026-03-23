/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo, useRef } from 'react'
import { useOtherContext } from '../../context'
import FormDocumentApproval from '../other-step/upload/FormDocumentApproval'
import FormDocumentVehicle from '../other-step/upload/FormDocumentVehicle'
import FormDocumentProposal from '../other-step/upload/FormDocumentProposal'
import { Button, Modal } from 'antd'
import { useForm } from 'react-hook-form'
import { DocumentFieldType } from '@/@types/entrepreneur/route-estimation'
import { PetitionExtendedDocumentPostRequest } from '@/@types/services/petition'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { postConfirmPetitionExtendedAPI } from '@/services/entrepreneur/PetitionService'
import { getPetitionExtendedData } from '@/store/slices/entrepreneur'
import { useNavigate } from 'react-router-dom'
import { CheckCircleFilled } from '@ant-design/icons'

interface Props {

}

const OtherDocument: React.FC<Props> = (props) => {
  const { } = props
  const { dataParser, setStep } = useOtherContext()
  const dispatch = useAppDispatch()
  const { petition_extended } = useAppSelector(state => state.entrepreneur.permitList)
  const { loading } = useAppSelector(state => state.layout)
  const navigate = useNavigate()
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<DocumentFieldType>({
    defaultValues: {
      petition_extended_user_document: {
        cid_url: {
          file: [],
          url: ''
        },
        company_certificate_url: {
          file: [],
          url: ''
        },
        vehicle_permit_url: {
          file: [],
          url: ''
        },
        power_of_attorney_url: {
          file: [],
          url: ''
        },
      },
      petition_extended_vehicle_document: {
        vehicle_registration_url: {
          file: [],
          url: ''
        },
        vehicle_photos_url: {
          file: [],
          url: ''
        },
        vehicle_dimensions_empty_url: {
          file: [],
          url: ''
        },
        vehicle_dimensions_loaded_url: {
          file: [],
          url: ''
        },
        prefab_parts_details_url: {
          file: [],
          url: ''
        },
        vehicle_turning_radius_url: {
          file: [],
          url: ''
        }
      },
      petition_extended_audit_document: {
        bridge_structure_calculation_url: {
          file: [],
          url: ''
        },
        road_structure_calculation_url: {
          file: [],
          url: ''
        },
        bridge_engineer_certificate_url: {
          file: [],
          url: ''
        },
        road_engineer_certificate_url: {
          file: [],
          url: ''
        },
        mechanical_engineer_certificate_url: {
          file: [],
          url: ''
        },
        safety_management_plan_url: {
          file: [],
          url: ''
        },
        route_map_url: {
          file: [],
          url: ''
        },
        operation_plan_url: {
          file: [],
          url: ''
        },
        contact_info_url: {
          file: [],
          url: ''
        },
        mechanical_engineer_certifier_url: {
          file: [],
          url: ''
        }
      }
    }
  })

  const {
    handleSubmit,
    control,
    setValue
  } = form

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
    body { font-family: 'Noto Sans Thai', sans-serif; padding: 48px; }
    .label { width: 100%; }
    .title { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
    .line {
      border-bottom: 2px dashed #999;
      padding-bottom: 6px;
      margin-bottom: 22px;
      font-size: 15px;
      min-height: 28px;
    }
    .postal-row { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
    .label-text { font-size: 15px; font-weight: 700; margin-right: 4px; }
    .circle {
      width: 34px; height: 34px;
      border: 1.5px solid #888;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
@page { margin: 0mm; }
@media print { body { padding: 24px; } }
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
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:800px;height:0;border:none;visibility:hidden;'
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
        <h5 className='mb-1.5'>รายการเอกสารที่ผู้ยื่นคำขอจำเป็นต้องส่งไปยังกรมทางหลวงชนบท</h5>
        <ol className='list-decimal list-inside'>
          <li>กรณีเป็นบุคคลธรรมดาให้ใช้บัตรประจำตัวประชาชน  (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>กรณีเป็นนิติบุคคลให้ใช้หนังสือรับรองจดทะเบียนเป็นนิติบุคคล พร้อมวัตถุประสงค์ ( 1 ฉบับ ) และสำเนาประจำตัวประชาชนผู้มีอำนาจลงนาม  (ฉบับจริง 1 ชุด)</li>
          <li>แผนผังถนนของทางหลวงชนบทที่ขออนุญาต เช่น ถนนหลวงชนบท (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>สำเนาบัตรผู้จัดการเดินรถและประวัติด้านพาหนะที่ได้รับอนุญาตใช้บนถนนสาธารณะ พร้อมแสดงหลักฐานการรับรองเจ้าหน้าที่ (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รูปถ่ายลักษณะพาหนะ (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รูปแบบขบวนพาหนะ โดยแสดงถึงขนาด ระยะ และน้ำหนักลงเพลาของขบวนพาหนะ (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รูปแบบขบวนพาหนะโดยแสดงถึงมิติขนาดรวมของขบวนบรรทุก (กว้าง ยาว สูง) ทั้งก่อนและหลังมีการบรรทุกสิ่งของแล้ว(ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>กรณีใช้ชิ้นส่วนสำเร็จรูปประกอบมากกว่า 1 ชิ้น ให้แสดงรายละเอียดและน้ำหนักรวมของสิ่งของที่ต้องการขนส่ง(ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รูปแบบพาหนะโดยแสดงถึงรัศมีวงเลี้ยว (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานทางผ่านในเส้นทางที่ขออนุญาต เมื่อมีการบรรทุกน้ำหนักแล้ว(ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานทางผ่านในเส้นทางที่กำหนดก่อนการขออนุญาต เมื่อมีการบรรทุกน้ำหนักแล้ว (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพาน พร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทาง พร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณน้ำหนักลงเพลา พร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณแรงดึงหรือแรงฉุด พร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>รูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>แผนที่เส้นทางเดินรถ (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>แผนและระยะเวลาการดำเนินงาน (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>ที่อยู่และสิ่งที่ใช้ในการจัดส่งเอกสาร (ฉบับจริง 1 ชุด สำเนา 4 ชุด)</li>
          <li>หนังสือมอบอำนาจ (กรณีไม่สามารถมาดำเนินการด้วยตนเอง) ต้องติดอากรแสตมป์ 10 หรือ 30 บาท พร้อมสำเนาบัตรประชาชนของผู้มอบอำนาจและผู้รับมอบอำนาจ</li>
        </ol>
        <div className='mt-5'>
          <p>ที่อยู่ผู้รับ :</p>
          <p>กรมทางหลวงชนบท สำนักบำรุงทาง</p>
          <p>เลขที่ 9 ถนนพหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กทม. 10220</p>
        </div>
      </div>
    )
  }, [])

  const onSubmit = useCallback(async (value: DocumentFieldType) => {
    const body: PetitionExtendedDocumentPostRequest = {
      petition_extended_user_document: {
        cid_url: value.petition_extended_user_document.cid_url.url,
        company_certificate_url: value.petition_extended_user_document.company_certificate_url.url,
        vehicle_permit_url: value.petition_extended_user_document.vehicle_permit_url.url,
        power_of_attorney_url: value.petition_extended_user_document.power_of_attorney_url.url
      },
      petition_extended_vehicle_document: {
        vehicle_registration_url: value.petition_extended_vehicle_document.vehicle_registration_url.url,
        vehicle_photos_url: value.petition_extended_vehicle_document.vehicle_photos_url.url,
        vehicle_dimensions_empty_url: value.petition_extended_vehicle_document.vehicle_dimensions_empty_url.url,
        vehicle_dimensions_loaded_url: value.petition_extended_vehicle_document.vehicle_dimensions_loaded_url.url,
        prefab_parts_details_url: value.petition_extended_vehicle_document.prefab_parts_details_url.url,
        vehicle_turning_radius_url: value.petition_extended_vehicle_document.vehicle_turning_radius_url.url
      },
      petition_extended_audit_document: {
        bridge_structure_calculation_url: value.petition_extended_audit_document.bridge_structure_calculation_url.url,
        road_structure_calculation_url: value.petition_extended_audit_document.road_structure_calculation_url.url,
        bridge_engineer_certificate_url: value.petition_extended_audit_document.bridge_engineer_certificate_url.url,
        road_engineer_certificate_url: value.petition_extended_audit_document.road_engineer_certificate_url.url,
        mechanical_engineer_certificate_url: value.petition_extended_audit_document.mechanical_engineer_certificate_url.url,
        safety_management_plan_url: value.petition_extended_audit_document.safety_management_plan_url.url,
        route_map_url: value.petition_extended_audit_document.route_map_url.url,
        operation_plan_url: value.petition_extended_audit_document.operation_plan_url.url,
        contact_info_url: value.petition_extended_audit_document.contact_info_url.url,
        mechanical_engineer_certifier_url: value.petition_extended_audit_document.mechanical_engineer_certifier_url.url
      }
    }

    dispatch(setLoading(true))
    try {
      const response = await postConfirmPetitionExtendedAPI(dataParser.temporary_id, body)
      if (response.status === 200) {
        // Modal.confirm({
        //   icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
        //   title: 'บันทึกข้อมูลสำเร็จ',
        //   content: renderResult,
        //   okText: 'พิมพ์ที่อยู่',
        //   cancelText: 'รับทราบ',
        //   width: 1000,
        //   onOk: () => onPrintAddress(),
        //   onCancel: () => {
        //     dispatch(getPetitionExtendedData(petition_extended.overview.search))
        //     navigate('/permit-list?tabKey=2')
        //   },
        //   okButtonProps: {
        //     style: {
        //       fontFamily: 'Noto Sans Thai',
        //       backgroundColor: '#1629FF',
        //       color: '#FFFFFF'
        //     }
        //   },
        //   cancelButtonProps: {
        //     style: {
        //       fontFamily: 'Noto Sans Thai'
        //     },
        //     type: 'primary'
        //   },
        //   style: {
        //     fontFamily: 'Noto Sans Thai'
        //   },
        //   footer: (_, { OkBtn, CancelBtn }) => {
        //     return (
        //       <>
        //         <OkBtn />
        //         <CancelBtn />
        //       </>
        //     )
        //   }
        // })
        Modal.success({
          title: 'บันทึกข้อมูลสำเร็จ',
          content: renderResult,
          okText: 'รับทราบ',
          width: 1000,
          onOk: () => {
            dispatch(getPetitionExtendedData(petition_extended.overview.search))
            navigate('/permit-list?tabKey=2')
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            },
            loading: loading
          },
          cancelButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            },
            disabled: loading
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
  }, [
    dataParser.temporary_id,
    dispatch,
    navigate,
    petition_extended.overview.search,
    renderResult,
    loading,
  ])

  const onConfirmPrintAddress = useCallback(() => {
    Modal.confirm({
      title: 'ตรวจสอบเอกสารและพิมพ์ที่อยู่',
      content: renderResult,
      okText: 'พิมพ์ที่อยู่',
      cancelText: 'รับทราบ',
      width: 1000,
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

  const confirmSubmit = useCallback(() => {
    Modal.confirm({
      icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
      title: 'ยืนยันการขอใบอนุญาต',
      content: renderResult,
      okText: 'พิมพ์ที่อยู่',
      cancelText: 'ขอใบอนุญาต',
      width: 1000,
      onOk: () => onPrintAddress(),
      onCancel: () => submitRef.current?.click(),
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

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
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
            onClick={() => setStep((prev: number) => prev - 1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            // onClick={() => submitRef.current?.click()}
            onClick={() => confirmSubmit()}
          >
            บันทึกข้อมูล
          </Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='mt-3'>
          <div className='block xl:grid grid-cols-2 gap-5 mt-5'>
            <FormDocumentProposal
              control={control}
              setValue={setValue}
            />
            <FormDocumentVehicle
              control={control}
              setValue={setValue}
            />
          </div>
        </section>
        <section className='mt-3'>
          <FormDocumentApproval
            control={control}
            setValue={setValue}
          />
        </section>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main>
  )
}

export default React.memo<Props>(OtherDocument)
