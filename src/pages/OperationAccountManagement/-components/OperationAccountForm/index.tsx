import React, { useCallback, useState } from 'react'
import { Button, Checkbox, Form, Input, Radio, notification, FormProps } from 'antd'
import { Transition } from 'history'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import styles from './OperationAccountForm.module.scss'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import { useBlocker, useConfirmNavigate } from '@/utils/usePrompt'
import ModalCancel from '@/components/Modal/ModalCancel'
import { NUMBER_LIST } from '@/constants/errors'
import { OPERATION_ACCOUNT_MANAGEMENT } from '@/constants/routes'

type ValuesType = {
  id?: string
  registrationDate?: string
  fullName: string
  email: string
  authority: number
  tagCreation: number
  status: string
}

type PropsType = FormProps & {
  isEditForm?: boolean
  initialValues: ValuesType
  onFinish: () => void
  onHandleCheckDelete?: (e: CheckboxChangeEvent) => void
}

const OperationAccountForm: React.FC<PropsType> = ({
  isEditForm = false,
  initialValues,
  onFinish,
  onHandleCheckDelete,
}) => {
  const {
    isEnablePrompt,
    isVisibleModalCancel,
    onHandleCancel,
    handleCloseModalCancel,
    handleGoBack,
    setPathTarget,
    setIsEnablePrompt,
  } = useConfirmNavigate()

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(initialValues?.status === '無効')

  const onFinishFormFailed = ({ errorFields }) => {
    const errorCount = errorFields.length
    notification.error({
      message: `正しく入力されていない項目が${NUMBER_LIST[errorCount]}あります。ご確認の上、もう一度ご入力下さい。`,
      className: 'notification-error',
      duration: 5,
      icon: <CloseRedIcon />,
    })
  }

  const onValuesChange = (_, allValues) => {
    setIsDeleteUser(allValues?.status === '無効')
  }

  const handleFinishWrapper = useCallback(() => {
    setIsEnablePrompt(false)
    setTimeout(() => {
      onFinish()
    }, 0)
  }, [onFinish, setIsEnablePrompt])

  useBlocker((tx: Transition) => {
    setPathTarget(tx?.location?.pathname)
    onHandleCancel(isEditForm, OPERATION_ACCOUNT_MANAGEMENT)
  }, isEnablePrompt && !isEditForm)

  return (
    <>
      <Form
        name="individual_registration"
        className={styles.formRegistration}
        initialValues={initialValues}
        onFinishFailed={onFinishFormFailed}
        onFinish={handleFinishWrapper}
        onValuesChange={onValuesChange}
      >
        {isEditForm && (
          <>
            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: '氏名を正しく入力してください' }]}
            >
              <Input disabled style={{ width: '180px' }} placeholder="IDを入力してください" />
            </Form.Item>

            <Form.Item
              label="登録日"
              name="registrationDate"
              rules={[{ required: true, message: '氏名を正しく入力してください' }]}
            >
              <Input disabled style={{ width: '180px' }} />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="氏名"
          name="fullName"
          rules={[{ required: true, message: '氏名を正しく入力してください' }]}
        >
          <Input placeholder="入力してください" />
        </Form.Item>

        <Form.Item
          label="メールアドレス"
          name="email"
          className="form-item__email"
          rules={[
            { required: true, message: 'メールアドレスもしくはパスワードが正しくありません' },
            {
              type: 'email',
              message: 'メールアドレスもしくはパスワードが正しくありません',
            },
          ]}
        >
          <Input placeholder="メールアドレスを入力してください" />
        </Form.Item>

        <Form.Item
          label="権限"
          name="authority"
          className="form-item__radio-group"
          rules={[{ required: true, message: '氏名を正しく入力してください' }]}
        >
          <Radio.Group>
            <Radio value={1}>管理者</Radio>
            <Radio value={2}>オペレーター</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="タグ作成"
          name="tagCreation"
          className="form-item__radio-group"
          rules={[{ required: true, message: '氏名を正しく入力してください' }]}
        >
          <Radio.Group>
            <Radio value={1}>可</Radio>
            <Radio value={2}>不可</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="ステータス"
          name="status"
          className="form-item__radio-group"
          rules={[{ required: true, message: '氏名を正しく入力してください' }]}
        >
          <Radio.Group>
            <Radio value={'有効'}>有効</Radio>
            <Radio value={'無効'}>無効</Radio>
            {isEditForm && isDeleteUser && (
              <Checkbox onChange={onHandleCheckDelete}>このアカウントを削除する</Checkbox>
            )}
          </Radio.Group>
        </Form.Item>

        <Form.Item className={styles.actionButtons}>
          <Button
            htmlType="button"
            onClick={() => onHandleCancel(isEditForm, OPERATION_ACCOUNT_MANAGEMENT)}
          >
            キャンセル
          </Button>

          <Button type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>

      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={() => handleGoBack(OPERATION_ACCOUNT_MANAGEMENT)}
        handleCloseModal={handleCloseModalCancel}
      />
    </>
  )
}

export default OperationAccountForm
