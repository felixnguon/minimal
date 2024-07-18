import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, notification } from 'antd'

import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import styles from './IndividualRegistration.module.scss'
import OperationAccountForm from '@/pages/OperationAccountManagement/-components/OperationAccountForm'
import { OPERATION_ACCOUNT_MANAGEMENT } from '@/constants/routes'

const IndividualRegistration = () => {
  const navigate = useNavigate()

  const initialValues = {
    fullName: '',
    email: '',
    authority: 2,
    tagCreation: 2,
    status: '有効',
  }

  const onFinish = () => {
    console.log('sds')
    notification.success({
      message: '運営アカウントを登録しました（ID : 00006)',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
    navigate(OPERATION_ACCOUNT_MANAGEMENT)
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContent}>
        <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
          <Link to={OPERATION_ACCOUNT_MANAGEMENT}>運営アカウント管理に戻る</Link>
        </Button>

        <h1 className={styles.title}>新規運営アカウント登録</h1>

        <div className={styles.profileWrapper}>
          <OperationAccountForm initialValues={initialValues} onFinish={onFinish} />
        </div>
      </div>
    </div>
  )
}

export default IndividualRegistration
