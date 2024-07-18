import React, { useCallback, useMemo } from 'react'
import { Moment } from 'moment'
import clsx from 'clsx'
import { Button, Form, Input, Radio, Select, InputNumber, DatePicker, FormProps } from 'antd'
import countries from '@/constants/countries'
import gender from '@/constants/gender'
import { hours, minutes } from '@/constants/time'
import contractNumberList from '@/constants/contractNumberList'
import styles from './RegisNewOrganizationForm.module.scss'
import TagFormItem from '@/components/TagFormItem'
import UploadFormItem from '@/components/UploadFormItem'
import RegistrationQuestionSelectionTable from '@/pages/OrganizationManagement/--components/RegistrationQuestionSelectionTable'
import { useGetWidth } from '@/utils/useGetWidth'

const { Option } = Select
const { TextArea } = Input

type Tag = {
  id: string
  text: string
}

type ContractFile = {
  uid: string
  name: string
  status?: string
  url: string
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
  contractPoints: number
  contracts: ContractFile[]
}

type PropsType = FormProps & {
  initialValues?: ValuesType
  onHandleCancel: () => void
}

const dateFormat = 'YYYY/MM/DD'

const lines = Array(300).fill('-')

const RegisNewOrganizationForm: React.FC<PropsType> = ({
  initialValues = { status: '有効' },
  onHandleCancel,
  ...rest
}) => {
  const [form] = Form.useForm()
  const { width } = useGetWidth()
  const isDesktop = useMemo(() => width > 1600, [width])

  const handleCancel = useCallback(() => {
    onHandleCancel && onHandleCancel()
  }, [onHandleCancel])

  return (
    <div className={styles.root}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        name="organization_registration"
        initialValues={initialValues}
        {...rest}
      >
        <p className={styles.subTitle}>基本情報</p>
        <Form.Item
          label="利用組織名"
          name="usingName"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="利用組織名を入力してください" />
        </Form.Item>
        <Form.Item label="代表者氏名" className="form-item-required">
          <Form.Item
            className={styles.inlineFormItem}
            style={{ width: '40%', maxWidth: isDesktop ? '380px' : '350px' }}
            name="representativeName"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="代表者氏名を入力してください" />
          </Form.Item>
          <Form.Item
            className={styles.inlineFormItem}
            style={{
              width: 'calc(15% - 8px)',
              margin: '0 12px',
              maxWidth: '94px',
            }}
            name="representativeGender"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="性別">
              {gender.map((item, index) => (
                <Option key={index} value={item.gender}>
                  {item.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="所在地"
          name="location"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="所在地を入力してください" />
        </Form.Item>
        <Form.Item
          label="郵便番号 (ZIP)"
          name="zipCode"
          wrapperCol={{ span: isDesktop ? 6 : 8 }}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="数字、ハイフン（-）のみ入力可" />
        </Form.Item>
        <Form.Item label="電話番号" className={clsx(styles.flexFormItem, 'form-item-required')}>
          <Form.Item
            name="phoneNumber"
            className={styles.inlineFormItem}
            style={{ width: isDesktop ? '30%' : '40%' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="数字、ハイフン（-）、プラス（+）のみ入力可" />
          </Form.Item>
          <span className={styles.formItemText}>※海外の場合は国番号も入力</span>
        </Form.Item>
        <Form.Item
          label="メールアドレス"
          name="email"
          wrapperCol={{ span: isDesktop ? 6 : 8 }}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="メールアドレスを入力してください" />
        </Form.Item>
        <Form.Item label="利用国" className={clsx(styles.flexFormItem, 'form-item-required')}>
          <Form.Item
            name="country"
            className={styles.inlineFormItem}
            style={{ width: isDesktop ? '18%' : '22%' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="選択してください">
              {countries.map((item) => (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <span className={styles.formItemText}>
            ※選択した国の個人情報保護方針・利用規約が適用されます
          </span>
        </Form.Item>
        <Form.Item
          label="ワークスペース"
          className={clsx(styles.flexFormItem, 'form-item-required')}
        >
          <Form.Item
            name="workSpace"
            className={styles.inlineFormItem}
            style={{ width: isDesktop ? '30%' : '40%' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="ワークスペースを入力してください" />
          </Form.Item>
          <span className={styles.formItemText}>.sdgs-curriculum.jp</span>
        </Form.Item>

        <Form.Item label="タグ">
          <TagFormItem />
        </Form.Item>

        <Form.Item label="備考" style={{ marginBottom: 0 }}>
          <Form.Item name="remarks">
            <TextArea placeholder="備考を設定してください" autoSize={{ minRows: 6, maxRows: 8 }} />
          </Form.Item>
          <span className={styles.formItemTextBottom}>※未入力可</span>
        </Form.Item>

        <Form.Item
          label="ステータス"
          name="status"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Radio.Group>
            <Radio value={'有効'}>有効</Radio>
            <Radio value={'無効'}>無効</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={styles.lines}>{lines.map((line) => line)}</div>
        <p className={styles.subTitle}>契約情報</p>

        <Form.Item label="契約書" className="form-item-required" style={{ marginBottom: 0 }}>
          <UploadFormItem name="contracts" form={form} width={isDesktop ? '60%' : '600px'} />
        </Form.Item>

        <Form.Item label="契約日" className="form-item-required">
          <Form.Item className={clsx(styles.flexFormItem, styles.childrenForm)}>
            <span
              className={clsx(styles.formItemText, styles.firstChildLabel, styles.labelNotBlur)}
            >
              開始日時
            </span>
            <Form.Item
              name="startDateContract"
              className={styles.inlineFormItem}
              style={{ width: '220px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              name="startDateHour"
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
              name="startDateMinute"
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
              name="endDateContract"
              className={styles.inlineFormItem}
              style={{ width: '220px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              name="endDateHour"
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
              name="endDateMinute"
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
            name="questionsNumber"
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
            name="answerersNumber"
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
            name="contractPoints"
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
    </div>
  )
}

export default RegisNewOrganizationForm
