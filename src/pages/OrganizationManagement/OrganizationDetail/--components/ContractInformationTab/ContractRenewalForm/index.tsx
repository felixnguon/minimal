import React, { useCallback, useState } from 'react'
import { Moment } from 'moment'
import clsx from 'clsx'
import { Button, Form, Select, InputNumber, DatePicker, FormProps, notification } from 'antd'
import { hours, minutes } from '@/constants/time'
import contractNumberList from '@/constants/contractNumberList'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import UploadFormItem from '@/components/UploadFormItem'
import RegistrationQuestionSelectionTable from '@/pages/OrganizationManagement/--components/RegistrationQuestionSelectionTable'
import ModalCancel from '@/components/Modal/ModalCancel'
import { useGetWidth } from '@/utils/useGetWidth'
import styles from './ContractRenewalForm.module.scss'

const { Option } = Select
const dateFormat = 'YYYY/MM/DD'

type ContractFile = {
  uid: string
  name: string
  status?: string
  url: string
}

type Tag = {
  id: string
  text: string
}

type ValuesType = {
  id?: string
  usingName: string
  representativeName: string
  representativeGender: string
  location: string
  zipCode: string
  phoneNumber: string
  email: string
  country: string
  workSpace: string
  tags: Tag[]
  remarks: string
  status: string
  questionsNumber: number
  answerersNumber: number
  startDateContract: Moment
  endDateContract: Moment
  startDateHour: number
  startDateMinute: number
  endDateHour: number
  endDateMinute: number
  contractPoints: number
  contracts: ContractFile[]
  historyData: Array<any>
}

type PropsType = FormProps & {
  initialValues?: ValuesType
  onCancelRenewalContract: () => void
}

const ContractRenewalForm: React.FC<PropsType> = ({
  initialValues = {},
  onCancelRenewalContract,
  ...rest
}) => {
  const [isVisibleModalCancel, setIsVisibleModalCancel] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { width } = useGetWidth()

  const handleCancel = useCallback(() => {
    setIsVisibleModalCancel(true)
  }, [])

  const handleCloseModal = () => {
    setIsVisibleModalCancel(false)
  }

  const handleGoBack = () => {
    setIsVisibleModalCancel(false)
    onCancelRenewalContract()
  }

  const onFinish = () => {
    onCancelRenewalContract()
    setTimeout(() => {
      notification.success({
        message: '運営アカウントを登録しました（ID : 00006)',
        className: 'notification-success',
        duration: 5,
        icon: <SuccessIcon />,
      })
    }, 0)
  }

  return (
    <div className={styles.root}>
      <div className={styles.updateTimeText}>
        <span>最終更新日時：</span> <span>2022/01/30 - 07:40AM</span>
      </div>
      <p className={styles.title}>契約情報 - 利用期間の延長（契約更新）</p>
      <Form
        form={form}
        name="renewal_form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        onFinish={onFinish}
        initialValues={initialValues}
        {...rest}
      >
        <Form.Item label="契約書" className="form-item-required" style={{ marginBottom: 0 }}>
          <UploadFormItem
            name="renewalContracts"
            form={form}
            width={width > 1600 ? '60%' : '600px'}
          />
        </Form.Item>

        <Form.Item label="契約日" className="form-item-required">
          <Form.Item className={clsx(styles.flexFormItem, styles.childrenForm)}>
            <span
              className={clsx(styles.formItemText, styles.firstChildLabel, styles.labelNotBlur)}
            >
              開始日時
            </span>
            <Form.Item
              name="renewalStartDateContract"
              className={styles.inlineFormItem}
              style={{ width: '220px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              name="renewalStartDateHour"
              className={styles.inlineFormItem}
              style={{ width: '80px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {hours.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={styles.formItemText}>時</span>
            <Form.Item
              name="renewalStartDateMinute"
              className={styles.inlineFormItem}
              style={{ width: '80px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {minutes.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={styles.formItemText}>分</span>
          </Form.Item>

          <Form.Item
            className={clsx(styles.flexFormItem, styles.childrenForm)}
            style={{ marginBottom: '0px' }}
          >
            <span
              className={clsx(styles.formItemText, styles.firstChildLabel, styles.labelNotBlur)}
            >
              終了日時
            </span>
            <Form.Item
              name="renewalEndDateContract"
              className={styles.inlineFormItem}
              style={{ width: '220px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              name="renewalEndDateHour"
              className={styles.inlineFormItem}
              style={{ width: '80px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {hours.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={styles.formItemText}>時</span>
            <Form.Item
              name="renewalEndDateMinute"
              className={styles.inlineFormItem}
              style={{ width: '80px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {minutes.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={styles.formItemText}>分</span>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="契約アカウント数"
          className={clsx(styles.flexFormItem, 'form-item-required')}
        >
          <span className={clsx(styles.formItemText, styles.firstChildLabel, styles.labelNotBlur)}>
            出題者数
          </span>
          <Form.Item
            name="renewalQuestionsNumber"
            className={styles.inlineFormItem}
            style={{ width: '130px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber min={1} placeholder="数字のみ入力可" />
          </Form.Item>
          <span className={styles.formItemText} style={{ marginRight: '56px' }}>
            人
          </span>
          <span className={clsx(styles.formItemText, styles.labelNotBlur)}>解答者数</span>
          <Form.Item
            name="renewalAnswerersNumber"
            className={styles.inlineFormItem}
            style={{ width: '130px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber min={1} placeholder="数字のみ入力可" />
          </Form.Item>
          <span className={styles.formItemText}>人</span>
        </Form.Item>
        <Form.Item label="契約点数" className={clsx(styles.flexFormItem, 'form-item-required')}>
          <Form.Item
            name="renewalContractPoints"
            className={styles.inlineFormItem}
            style={{ width: '80px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="_">
              {contractNumberList.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <span className={styles.formItemText}>問</span>
        </Form.Item>
        <Form.Item label="登録問題選択" className="form-item-required">
          <RegistrationQuestionSelectionTable form={form} />
        </Form.Item>

        <Form.Item className={styles.actionButtons}>
          <Button htmlType="button" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>
      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={handleGoBack}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

export default ContractRenewalForm
