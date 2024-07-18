import React, { useState } from 'react'
import clsx from 'clsx'
import { Form, Input, Button, notification } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import styles from './OPT.module.scss'
import services from '@/services'
import { storageKeys } from '@/constants/storage-keys'
import { LoginRequest, useVerifyLoginCodeMutation } from '@/services/auth'
import { setCredentials } from '@/store/auth'
import { useAppDispatch } from '@/hooks/store'
import { ERoles } from '@/enums/roles'

const StorageService = services.get('StorageService')

const OTP: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const stateLocation = location.state as LoginRequest
  const [isCorrectOTP, setIsCorrectOTP] = useState<boolean>(true)
  const [otp, setOtp] = useState<string>('')
  const [verifyLoginCode, { isLoading }] = useVerifyLoginCodeMutation()

  const onFinish = async (values: any) => {
    if (!otp) setIsCorrectOTP(false)
    else {
      try {
        const { otp } = values
        await verifyLoginCode(otp).unwrap()

        const username = stateLocation.username
        const fakeUser = {
          token: 'token',
          user: {
            username,
            role: username === 'admin@sdg.com' ? ERoles.SDG_ADMIN : ERoles.SDG_MANAGER,
          },
        }
        dispatch(setCredentials(fakeUser))
        StorageService.set(storageKeys.authProfile, fakeUser)
        navigate('/')
      } catch (error) {
        setIsCorrectOTP(false)
      }
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
        <div className={styles.header}>
          <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
            <Link to={'/login'}>ログインページに戻る</Link>
          </Button>
        </div>
        <Form
          name="otp-form"
          wrapperCol={{ span: 24 }}
          className={styles.otpContent}
          labelAlign="left"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className={styles.description}>
            メールアドレスにログインキーを送信しました 受信したログインキーを入力してください
          </p>
          <Form.Item name="otp" className={styles.otpFormItem}>
            <Input
              placeholder="ログインキーを入力"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Item>
          <p className={clsx(styles.errorText, !isCorrectOTP && styles.visibleErrorText)}>
            ログインキーが正しくありません
          </p>
          <Form.Item wrapperCol={{ span: 24 }} className={styles.submitFormItem}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isLoading}
            >
              ログイン
            </Button>
          </Form.Item>
          <Button type="link" className={styles.resentButton}>
            ログインキーを再送する
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default OTP
