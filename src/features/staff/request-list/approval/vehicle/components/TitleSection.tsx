/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button, Flex } from 'antd'
import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

interface Props {

}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props

  return (
    <Flex
      wrap
      justify={'space-between'}
      align={'center'}
      gap={5}
    >
      <h3>ตรวจสอบยานพาหนะ</h3>
      <Button
        type='primary'
        icon={<AiOutlineDownload />}
      >
        Export to PDF
      </Button>
    </Flex>
  )
}

export default React.memo<Props>(TitleSection)
