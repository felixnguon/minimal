import React, { useState, useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import SDGLogo from '@/assets/icons/ico_sdg_logo.svg'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import styles from './ResetPassword.module.scss'

const ResetPassword: React.FC = () => {
  const { state }: any = useLocation()
  const [isSentEmail, setIsSentEmail] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    setIsSentEmail(true)
  }

  const onFinishFailed = (errorInfo: any) => {
    notification.error({
      message: 'メールアドレスが正しくありません',
      className: 'notification-error',
      duration: 5,
      icon: <CloseRedIcon />,
    })
  }

  useEffect(() => {
    if (state?.userEmail) {
      const myPromise = new Promise<any>((resolve, reject) => {
        try {
          form.setFieldsValue({ email: state.userEmail })
          resolve(true)
        } catch (error) {
          reject()
        }
      })

      myPromise
        .then(() => {
          setIsSentEmail(true)
        })
        .catch((err) => {
          throw err
        })
    }
  }, [form, state.userEmail])

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        {isSentEmail ? (
          <div className={styles.sentEmailContent}>
            <div className={styles.titleContent}>
              <SDGLogo />
              <p>SDGs オンラインカリキュラム管理コンテンツ</p>
            </div>
            <p className={styles.sentEmailTitle}>パスワードのリセット</p>
            <div className={styles.acceptDescription}>
              <p>パスワードをリセットしました。</p>
              <p>メールに送信されたURLに30分以内にアクセスし、パスワードを再設定してください。</p>
            </div>
            <div className={styles.ignoreDescription}>
              <p>パスワードのリセットをキャンセルしたい場合は、送信されたメールを無視して</p>
              <p>
                <Link to="/login">ログインページより</Link> ログインしてください。
              </p>
            </div>
          </div>
        ) : (
          <Form
            form={form}
            name="forget-password"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            className={styles.content}
            labelAlign="left"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className={styles.titleContent}>
              <SDGLogo />
              <p>SDGs オンラインカリキュラム管理コンテンツ</p>
            </div>
            <p className={styles.title}>パスワードをリセットします</p>
            <p className={styles.description}>
              登録したメールアドレスを入力してパスワードをリセットしてください。
            </p>
            <Form.Item
              label="メールアドレス"
              name="email"
              className={styles.emailFormItem}
              rules={[
                { required: true, message: 'メールアドレスを入力' },
                { type: 'email', message: '無効ではないメール！' },
              ]}
            >
              <Input placeholder="メールアドレスを入力してください" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} className={styles.submitFormItem}>
              <Button type="primary" htmlType="submit" className={styles.submitButton}>
                パスワードをリセット
              </Button>
            </Form.Item>
            <div className={styles.footerDescription}>
              <p>パスワードのリセットをキャンセルしたい場合は</p>
              <p>
                送信されたメールを無視し<Link to="/login">ログインページより</Link>
                ログインしてください。
              </p>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
