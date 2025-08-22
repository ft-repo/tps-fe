/* eslint-disable no-empty-pattern */
import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import { Avatar, Button, ConfigProvider, List, ListProps } from 'antd';

export type SidePanelContentProps = ThemeConfiguratorProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationContent = (props: SidePanelContentProps) => {
  const { } = props;

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )
        }}
      />
      <Button
        block
        type='primary'
        size='large'
      >
        แจ้งเตือนเพิ่มเติม
      </Button>
    </ConfigProvider>
  )
}

export default NotificationContent
