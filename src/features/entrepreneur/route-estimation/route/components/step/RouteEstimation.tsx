import { Root } from '@/@types/entrepreneur/route-estimation'
import { Tabs } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface TabItem {
  label: string
  children: React.ReactNode
  key: string
  closable?: boolean
}

const defaultValues: Root = {
  vehicle: [],
  start_point: {
    type: '',
    coordinates: [],
  },
  end_point: {
    type: '',
    coordinates: [],
  },
  vehicle_route: {
    type: '',
    coordinates: [],
  },
}

const initialTabItems: TabItem[] = [
  {
    label: 'รถคู่ที่ 1',
    children: <div>รถคู่ที่ 1</div>,
    key: '1',
  },
]

function RouteEstimation() {
  const [activeKey, setActiveKey] = useState(initialTabItems[0].key)
  const { control, handleSubmit } = useForm<Root>({
    defaultValues,
  })

  const [tabItems, setTabItems] = useState<TabItem[]>(initialTabItems)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicle',
  })

  const onAddedTab = useCallback(() => {
    const newTabItem: TabItem = {
      label: `รถคู่ที่ ${tabItems.length + 1}`,
      children: <div>รถคู่ที่ {tabItems.length + 1}</div>,
      key: `${tabItems.length + 1}`,
    }

    setTabItems([...tabItems, newTabItem])
  }, [tabItems, setTabItems])

  const onRemovedTab = useCallback((targetKey: TargetKey) => {
    const newTabItems = tabItems.filter((item) => item.key !== targetKey)
    setTabItems(newTabItems)
  }, [tabItems, setTabItems])

  const onTabsEdit = useCallback(
    (targetKey: TargetKey, action: 'add' | 'remove') => {
      if (action === 'add') {
        onAddedTab()
      } else {
        onRemovedTab(targetKey)
      }
    },
    [onAddedTab, onRemovedTab],
  )

  const onTabsChange = useCallback((newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }, [setActiveKey])

  const onSubmit = useCallback((values: Root) => {
    console.log('values ======> ', values)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        type="editable-card"
        items={tabItems}
        activeKey={activeKey}
        onEdit={onTabsEdit}
        onChange={onTabsChange}
      />
    </form>
  )
}

export default RouteEstimation
