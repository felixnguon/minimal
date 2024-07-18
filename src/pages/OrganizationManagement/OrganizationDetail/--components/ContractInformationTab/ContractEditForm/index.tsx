import React, { useCallback } from 'react'
import { Moment } from 'moment'
import { Button, Form, FormProps } from 'antd'
import styles from './ContractEditForm.module.scss'
import UploadFormItem from '@/components/UploadFormItem'
import CurrentContractDetailForm from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab/CurrentContractDetailForm'
import ContractHistory from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab/ContractHistory'
import ConsentStatusTable from '@/pages/OrganizationManagement/OrganizationDetail/--components/ConsentStatusTable'
import { useGetWidth } from '@/utils/useGetWidth'

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
  initialValues: ValuesType
  onHandleCancel: () => void
  onRenewalContract: () => void
}

const ContractEditForm: React.FC<PropsType> = ({
  initialValues,
  onHandleCancel,
  onRenewalContract,
  ...rest
}) => {
  const [form] = Form.useForm()
  const { width } = useGetWidth()

  const handleCancel = useCallback(() => {
    onHandleCancel && onHandleCancel()
  }, [onHandleCancel])

  return (
    <div className={styles.root}>
      <div className={styles.updateTimeText}>
        <span>最終更新日時：</span> <span>2022/01/30 - 07:40AM</span>
      </div>
      <Form
        form={form}
        name="contract_information"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        initialValues={initialValues}
        {...rest}
      >
        <Form.Item label="契約書" className="form-item-required" style={{ marginBottom: 0 }}>
          <UploadFormItem name="contracts" form={form} width={width > 1600 ? '60%' : '600px'} />
        </Form.Item>
        <Form.Item label="同意状況">
          <ConsentStatusTable />
        </Form.Item>
        <Form.Item label="現在の契約内容">
          <CurrentContractDetailForm form={form} />
        </Form.Item>
        <Button type="primary" className={styles.extensionUsageButton} onClick={onRenewalContract}>
          利用期間の延長（契約更新）
        </Button>
        <ContractHistory form={form} />
        <Form.Item className={styles.actionButtons}>
          <Button htmlType="button" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContractEditForm
