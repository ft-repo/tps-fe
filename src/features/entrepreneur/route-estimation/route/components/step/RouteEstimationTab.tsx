import { Tabs } from 'antd'
import { memo, useState, useCallback } from 'react'
import { initFormValue } from '../../mock'
import { useFieldArray, useForm } from 'react-hook-form'
import { FieldType } from '@/@types/entrepreneur/route-estimation'
import { Button, Notification, toast } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import TemplateForm from '../route-estimate/initial/TemplateForm'
import { useRouteContext } from '../../context'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabItem {
  label: string
  children: React.ReactNode
  key: string
  closable?: boolean
}

function RouteEstimation() {
  const navigate = useNavigate()
  const { setStep, setDataParser } = useRouteContext()
  const { control, handleSubmit } = useForm<FieldType>({
    defaultValues: {
      form_template: [initFormValue],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'form_template',
  })

  const [items, setItems] = useState<TabItem[]>([
    {
      label: 'รถคู่ที่ 1',
      children: (
        <TemplateForm formItem={fields[0]} formIndex={0} control={control} />
      ),
      key: '1',
      closable: false,
    },
  ])
  const [activeKey, setActiveKey] = useState(items[0].key)

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }

  const addTab = () => {
    const newActiveKey = items.length + 1
    const newPanes = [...items]
    append(initFormValue)
    newPanes.push({
      label: `รถคู่ที่ ${newActiveKey}`,
      children: <TemplateForm formItem={fields[items.length]} formIndex={items.length} control={control} />,
      key: newActiveKey.toString(),
    })
    setItems(newPanes)
    setActiveKey(newActiveKey.toString())
  }

  const removeTab = (targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1

    console.log('targetKey ======> ', targetKey)

    items.forEach((item, i) => {
      if (item.key === targetKey) {
        remove(i)
        lastIndex = i - 1
      }
    })
    console.log('lastIndex ======> ', lastIndex)
    const newPanes = items.filter((item) => item.key !== targetKey)
    // Reorder items to maintain sequential numbering
    const reorderedPanes = newPanes.map((item, index) => ({
      ...item,
      label: `รถคู่ที่ ${index + 1}`,
      key: (index + 1).toString(),
    }))
    setItems(reorderedPanes)

    // Update activeKey to match the new numbering
    if (items.length && newActiveKey === targetKey) {
      if (lastIndex >= 0 && lastIndex < items.length) {
        newActiveKey = items[lastIndex].key
      } else {
        newActiveKey = items[0].key
      }
    } else {
      newActiveKey = items[items.length - 2].key
    }
    setActiveKey(newActiveKey)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      addTab()
    } else {
      removeTab(targetKey)
    }
  }

  const onSubmit = useCallback((data: FieldType) => {
    console.log(data)
    toast.push(
      <Notification
        title={'Success'}
        type={'success'}
        onClose={() => {
          setStep(2)
          setDataParser(data)
        }}
      >
        <p className="break-all">Successfully submit data</p>
      </Notification>,
    )
  }, [setDataParser, setStep])  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        className="w-full h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] overflow-y-auto"
        type="editable-card"
        activeKey={activeKey}
        items={items}
        tabBarExtraContent={
          <Button
            variant="solid"
            className="bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-600 transition duration-300"
            size="sm"
            onClick={() => navigate('/route-estimation/other')}
          >
            ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)
          </Button>
        }
        onChange={onChange}
        onEdit={onEdit}
      />

      <section className="w-full p-4">
        <div className="flex justify-end items-center gap-5 ">
          <Button type="submit" variant="solid">
            ประเมินเส้นทาง
          </Button>
        </div>
      </section>
    </form>
  )
}

export default memo(RouteEstimation)
