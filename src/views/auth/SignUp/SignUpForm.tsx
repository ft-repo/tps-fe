import { SignUpCredential } from '@/@types/auth'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useAppSelector } from '@/store'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

interface Props {
  control: Control<SignUpCredential>
  setValue: UseFormSetValue<SignUpCredential>
  setProvinceId: (provinceId: string) => void
  setDistrictId: (districtId: string) => void
}

function SignUpForm(props: Props) {
  const { control, setValue, setProvinceId, setDistrictId } = props
  const { province, district, sub_district, entity_type } = useAppSelector(
    (state) => state.master,
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
                <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                <Input {...field} name={field.name} placeholder="กรุณาระบุ" type="tel" autoComplete="off" />
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
                    <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                    <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                    <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                    <Input {...field} name={field.name} placeholder="กรุณาระบุ" />
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
                    <label>ตำบล</label>
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
                    <Input {...field} name={field.name} placeholder="กรุณาระบุ" disabled />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpForm
