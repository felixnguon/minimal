import React from 'react'
import moment from 'moment'
import { Modal, Button, ModalProps, Form, Input, DatePicker } from 'antd'

import styles from './ModalDownload.module.scss'
import ArrowLineRight from '@/assets/icons/ico_arrow-line-right.svg'

type PropsType = ModalProps & {
  handleCancel: () => void
  handleDownload: () => void
}

const ModalDownload: React.FC<PropsType> = ({ handleDownload, handleCancel, ...restProps }) => {
  const onFinish = () => {
    handleDownload()
  }

  const disabledDate = (current) => {
    return (
      (current && current < moment().subtract(1, 'year')) ||
      (current && current > moment().endOf('day'))
    )
  }

  return (
    <Modal
      centered
      title="CSVフォーマットダウンロード"
      onCancel={handleCancel}
      footer={null}
      width={660}
      className={styles.modal}
      {...restProps}
    >
      <Form
        name="download_filter"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item
          label="年月日指定"
          name="dateRange"
          rules={[{ required: true, message: '年月日を指定してください' }]}
        >
          <DatePicker.RangePicker
            style={{ width: '370px' }}
            placeholder={['YYYY/MM/DD', 'YYYY/MM/DD']}
            disabledDate={disabledDate}
            separator={<ArrowLineRight className={styles.arrowRightIcon} />}
          />
        </Form.Item>

        <Form.Item
          label="ユーザID"
          name="id"
          rules={[{ required: true, message: '正しいユーザIDを入力してください' }]}
        >
          <Input placeholder="複数指定する場合はカンマ（,）で区切って指定" />
        </Form.Item>

        <Form.Item className={styles.actionsBtn}>
          <Button htmlType="button" onClick={handleCancel}>
            キャンセル
          </Button>

          <Button type="primary" htmlType="submit">
            ダウンロード
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalDownload
