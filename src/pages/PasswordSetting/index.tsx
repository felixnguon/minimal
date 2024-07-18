import React, { useState, useMemo, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import SDGLogo from '@/assets/icons/ico_sdg_logo.svg'
import { Form, Input, Button, notification, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import XIcon from '@/assets/icons/ico_x-red.svg'
import TickIcon from '@/assets/icons/ico_tick-green.svg'
import styles from './PasswordSetting.module.scss'
import regex from '@/constants/regex'

const PasswordSetting: React.FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')

  const validPassword = useMemo(() => {
    if (password) return regex.password.test(password)
    return false
  }, [password])

  const onFinish = useCallback(
    (values: any) => {
      if (rePassword !== password) {
        notification.error({
          message: 'パスワードが一致しません',
          className: 'notification-error',
          duration: 5,
          icon: <CloseRedIcon />,
        })
      } else navigate('time-out')
    },
    [navigate, password, rePassword]
  )

  const onFinishFailed = (errorInfo: any) => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <Form
          name="password-reset"
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
          <p className={styles.title}>パスワードの設定</p>
          <Form.Item
            label="パスワード"
            name="password"
            className={styles.passwordFormItem}
            rules={[{ required: true, message: 'パスワードを入力してください！' }]}
          >
            <Input.Password
              placeholder="8文字以上の半角英数字記号"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              visibilityToggle={false}
            />
          </Form.Item>
          <Row>
            <Col span={6} />
            <Col span={18}>
              <div className={clsx(styles.descriptionTextGroup, password && styles.visibleText)}>
                {validPassword ? (
                  <div className={styles.successText}>
                    <TickIcon />
                    パスワードの安全性OK
                  </div>
                ) : (
                  <div className={styles.errorText}>
                    <XIcon />
                    パスワードの安全性NG
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Form.Item
            label="パスワード（確認）"
            name="newPassword"
            className={styles.newPasswordFormItem}
            rules={[{ required: true, message: 'パスワードを入力してください！' }]}
          >
            <Input.Password
              disabled={!validPassword}
              onChange={(e) => setRePassword(e.target.value)}
              visibilityToggle={false}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} className={styles.submitFormItem}>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default PasswordSetting
