import { SignUpCredential } from '@/@types/auth'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Upload } from '@/components/ui/NewUpload'
import {
  postUploadFile,
  postUploadImage,
} from '@/services/entrepreneur/VehicleListService'
import { useAppSelector } from '@/store'
import { useCallback } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { FaUpload as UploadIcon } from 'react-icons/fa6'

interface Props {
  control: Control<SignUpCredential>
  setValue: UseFormSetValue<SignUpCredential>
  setProvinceId: (provinceId: string) => void
  setDistrictId: (districtId: string) => void
}

function SignUpForm(props: Props) {
  const { control, setValue, setProvinceId, setDistrictId } = props
  const { province, district, sub_district, entity_type, contact_type } =
    useAppSelector((state) => state.master)

  const uploadFile = useCallback(
    async (fieldName: string, file: any, isImage: boolean = false) => {
      let uploadAPI
      if (isImage) {
        uploadAPI = postUploadImage
      } else {
        uploadAPI = postUploadFile
      }
      try {
        // POST
        const response = await uploadAPI({ upload: file })
        if (response.status === 200) {
          setValue(fieldName, response.data?.url)
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
    },
    [setValue],
  )

  return (
    <section className="mt-5">
      <div className="block lg:grid grid-cols-2 gap-3">
        <Controller
          name="business_detail.entity_type_id"
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทนิติบุคคล</label>
                <Select
                  {...field}
                  name={field.name}
                  placeholder="กรุณาเลือก"
                  options={entity_type.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    }
                  })}
                  onChange={(e: any) => {
                    setValue('business_detail.entity_type_id', e.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name="business_detail.registration_no"
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียนนิติบุคคล</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  onChange={(e) => {
                    setValue('business_detail.registration_no', e.target.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name="business_detail.business_name"
          control={control}
          render={({ field }) => {
            return (
              <fieldset className="col-span-2">
                <label>ชื่อบริษัท/ห้าง/ร้าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  onChange={(e) => {
                    setValue('business_detail.business_name', e.target.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name="contact_info.phone_number"
          control={control}
          render={({ field }) => {
            return (
              <fieldset className="col-span-2">
                <label>เบอร์โทรสำนักงาน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="tel"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue('contact_info.phone_number', e.target.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />

        {/* ข้อมูลที่อยู่ */}
        <div className="mb-4 col-span-2">
          <div className="font-semibold mb-2">ที่อยู่ (Address)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="business_address.house_number"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขที่</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue(
                          'business_address.house_number',
                          e.target.value,
                        )
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.village"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมู่ที่</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.village', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.lane"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ซอย</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.lane', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.road"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ถนน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.road', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.province_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={province.map((item) => {
                        return {
                          label: item.name_th,
                          value: item.id,
                        }
                      })}
                      onChange={(e: any) => {
                        setValue('business_address.province_id', e.value)
                        setProvinceId(e.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.district_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เขต/อำเภอ</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={district.map((item) => {
                        return {
                          label: item.name_th,
                          value: item.id,
                        }
                      })}
                      onChange={(e: any) => {
                        setValue('business_address.district_id', e.value)
                        setDistrictId(e.value)
                        field.onChange(e)
                      }}
                      isDisabled={district.length === 0}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.sub_district_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>แขวง/ตำบล</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={sub_district.map((item) => {
                        return {
                          label: item.name_th,
                          value: item.id,
                        }
                      })}
                      onChange={(e: any) => {
                        setValue('business_address.sub_district_id', e.value)
                        field.onChange(e)
                      }}
                      isDisabled={sub_district.length === 0}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.zip_code"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รหัสไปรษณีย์</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      disabled
                      onChange={(e) => {
                        setValue('business_address.zip_code', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
        {/* ผู้รับหมอบอำนาจ */}
        <div className="mb-4 col-span-2">
          <div className="font-semibold mb-2">ผู้ติดต่อ/รับหมอบอำนาจ</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="contact_info.contact_name"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ติดต่อ / มอบอำนาจ</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('contact_info.contact_name', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="contact_info.contact_type_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ประเภทผู้ติดต่อ / มอบอำนาจ</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={contact_type.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        }
                      })}
                      onChange={(e: any) => {
                        setValue('contact_info.contact_type_id', e.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="contact_info.phone_number"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เบอร์โทรผู้ติดต่อ</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      type="tel"
                      autoComplete="off"
                      onChange={(e) => {
                        setValue('contact_info.phone_number', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="contact_info.cid"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมายเลขบัตรประชาชน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      type="text"
                      autoComplete="off"
                      onChange={(e) => {
                        setValue('contact_info.cid', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
        {/* เอกสารที่ต้องมี */}
        <div className="mb-4 col-span-2">
          <Controller
            name="business_document.business_file_url"
            control={control}
            rules={{ required: 'หนังสือรับรองนิติบุคคลต้องมี' }}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.business_file_url"
                label="หนังสือรับรองนิติบุคคล"
                accept=".pdf"
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.business_file_url"
              />
            )}
          />
          <Controller
            name="business_document.cid_card_file_url"
            control={control}
            rules={{ required: 'รูปบัตรประชาชนต้องมี' }}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.cid_card_file_url"
                label="รูปบัตรประชาชน"
                accept=".pdf,.png,.jpeg,.jpg"
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.cid_card_file_url"
              />
            )}
          />
          <Controller
            name="business_document.certificate_file_url"
            control={control}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.certificate_file_url"
                label="รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ"
                accept=".pdf,.png,.jpeg,.jpg"
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.certificate_file_url"
              />
            )}
          />
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รหัสผ่าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue('password', e.target.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ยืนยันรหัสผ่าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue('password_confirmation', e.target.value)
                    field.onChange(e)
                  }}
                />
              </fieldset>
            )
          }}
        />
      </div>
    </section>
  )
}

export default SignUpForm
