/* eslint-disable react-refresh/only-export-components */
import { Button, Flex } from 'antd'
import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

interface Props {
  onExport?: () => void
}

const TitleSection: React.FC<Props> = (props) => {
  const { onExport } = props;

  return (
    <Flex
      wrap
      justify="space-between"
      align="center"
      gap={5}
    >
      <h3>ตรวจสอบเอกสาร</h3>
      <Button
        type="primary"
        icon={<AiOutlineDownload />}
        onClick={onExport}
      >
        Export to PDF
      </Button>
    </Flex>
  )
}

export default React.memo(TitleSection)
