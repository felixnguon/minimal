import React, { ReactNode, useState } from 'react'
import { Table, Tabs, Tag, Button, notification, Pagination, Modal } from 'antd'
import s from './Dashboard.module.scss'
import MyComponent from '@/components/Quill/index'

type Column = {
  title: string
  dataIndex: string
  render?: (val: Record<string, string>) => ReactNode
  className?: string
  align?: 'left' | 'right' | 'center'
}

const DashboardPage = () => {
  const columns: Column[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      align: 'center',
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      align: 'center',
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ]

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const openNotification = () => {
    notification.error({
      message: 'Notification Title',
      className: 'notification-error',
      duration: 1000,
    })
  }

  return (
    <div>
      <Pagination
        showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
        defaultCurrent={2}
        total={50}
        size="small"
      />
      <Table columns={columns} dataSource={data} bordered pagination={false} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>

      <Tag color="#EBEBEB">magenta</Tag>
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>

        <div className={s.buttons}>
          <Button>キャンセル</Button>
          <Button type="primary" danger>
            削除する
          </Button>
        </div>
      </Modal>
      <MyComponent />
    </div>
  )
}

export default DashboardPage
