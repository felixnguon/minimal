import React, { useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { Button, Form, Input, Radio, Select, FormProps } from 'antd'
import countries from '@/constants/countries'
import gender from '@/constants/gender'
import styles from './BasicInformationTab.module.scss'
import TagFormItem from '@/components/TagFormItem'
import { useGetWidth } from '@/utils/useGetWidth'
const { Option } = Select
const { TextArea } = Input

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
}

type PropsType = FormProps & {
  initialValues: ValuesType
  onHandleCancel: () => void
}

const BasicInformationTab: React.FC<PropsType> = ({ initialValues, onHandleCancel, ...rest }) => {
  const { width } = useGetWidth()
  const isDesktop = useMemo(() => width > 1600, [width])

  const handleCancel = useCallback(() => {
    onHandleCancel && onHandleCancel()
  }, [onHandleCancel])

  return (
    <div className={styles.root}>
      <div className={styles.updateTimeText}>
        <span>最終更新日時：</span> <span>2022/01/30 - 07:40AM</span>
      </div>

      <Form
        name="basic_information"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        initialValues={initialValues}
        {...rest}
      >
        <Form.Item label="ID" name="id" wrapperCol={{ span: isDesktop ? 3 : 4 }}>
          <Input disabled placeholder="IDを入力してください" />
        </Form.Item>
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
            <TextArea placeholder="備考を設定してください" autoSize={{ minRows: 8, maxRows: 10 }} />
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

export default BasicInformationTab
