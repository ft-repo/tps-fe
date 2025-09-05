/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useState } from 'react'
import {
  ContentSearchCategory as ContentPetition,
  ContentSearchOther as ContentPetitionExtended
} from '../components'
import { Button, Flex, Tabs, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Props {
}

const PermitListScreen: React.FC<Props> = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState<string>('1')
  const navigate = useNavigate()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'รถหมวด 2 (4 - 7 เพลา)',
      children: <ContentPetition />,
    },
    {
      key: '2',
      label: 'นอกเหนือ (4 - 7 เพลา)',
      children: <ContentPetitionExtended />,
    },
  ];

  const renderRedirectButton = useMemo(() => {
    return (
      <Flex
        wrap
        align='center'
        gap={5}
      >
        <Button
          htmlType='button'
          type='primary'
          onClick={() => navigate('/route-estimation/route')}
        >
          ขอใบอนุญาตรถหมวด 2 (4 - 7 เพลา)
        </Button>
        <Button
          htmlType='button'
          type='primary'
          color='yellow'
          variant='solid'
          onClick={() => navigate('/route-estimation/other')}
        >
          ขอใบอนุญาตรถนอกเหนือ (4 - 7 เพลา)
        </Button>
      </Flex>
    )
  }, [navigate])

  return (
    <Tabs
      tabBarExtraContent={renderRedirectButton}
      defaultActiveKey={tabKey}
      items={items}
      onChange={(tabKey) => setTabKey(tabKey)}
    />
  )
}

export default React.memo<Props>(PermitListScreen)
