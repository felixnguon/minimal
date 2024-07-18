import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, notification } from 'antd'

import SDGLogo from '@/assets/icons/ico_sdg_logo.svg'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import styles from './Login.module.scss'
import { useLoginMutation } from '@/services/auth'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const onFinish = async (values: any) => {
    try {
      await login(values).unwrap()

      navigate('otp', {
        state: values,
      })
    } catch (err) {
      notification.error({
        message: 'Fetch login error',
        className: 'notification-error',
        duration: 5,
        icon: <CloseRedIcon />,
      })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    notification.error({
      message: 'メールアドレスもしくはパスワードが正しくありません',
      className: 'notification-error',
      duration: 5,
      icon: <CloseRedIcon />,
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <Form
          name="login"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          className={styles.loginContent}
          labelAlign="left"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.titleContent}>
            <SDGLogo />
            <p>SDGs オンラインカリキュラム管理コンテンツ</p>
          </div>
          <p className={styles.loginText}>ログイン</p>
          <Form.Item
            label="メールアドレス"
            name="username"
            className={styles.userNameFormItem}
            rules={[
              { required: true, message: 'あなたのメールアドレスを入力してください！' },
              {
                type: 'email',
                message: '無効ではないメール！',
              },
            ]}
          >
            <Input placeholder="メールアドレスを入力してください" />
          </Form.Item>

          <Form.Item
            label="パスワード"
            name="password"
            className={styles.passwordFormItem}
            rules={[{ required: true, message: 'パスワードを入力してください！' }]}
          >
            <Input.Password placeholder="パスワードを入力" visibilityToggle={false} />
          </Form.Item>
          <Button
            type="link"
            className={styles.forgetPasswordButton}
            onClick={() => navigate('/reset-password')}
          >
            パスワードを忘れた場合
          </Button>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isLoading}
            >
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
