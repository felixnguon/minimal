import React from 'react'
import { Button, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Transition } from 'history'
import RegisNewOrganizationForm from './-components/RegisNewOrganizationForm'
import ModalCancel from '@/components/Modal/ModalCancel'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import styles from './RegisNewOrganization.module.scss'
import { NUMBER_LIST } from '@/constants/errors'
import { ORGANIZATION_MANAGEMENT } from '@/constants/routes'
import { useBlocker, useConfirmNavigate } from '@/utils/usePrompt'

const RegisNewOrganization: React.FC = () => {
  const navigate = useNavigate()

  const {
    isEnablePrompt,
    isVisibleModalCancel,
    setIsVisibleModalCancel,
    handleCloseModalCancel,
    handleGoBack,
    setPathTarget,
    onHandleCancel,
    setIsEnablePrompt,
  } = useConfirmNavigate()

  useBlocker((tx: Transition) => {
    setPathTarget(tx?.location?.pathname)
    setIsVisibleModalCancel(true)
  }, isEnablePrompt)

  const onFinishFormFailed = ({ errorFields }) => {
    const errorCount = errorFields.length
    notification.error({
      message: `正しく入力されていない項目が${NUMBER_LIST[errorCount]}あります。ご確認の上、もう一度ご入力下さい。`,
      className: 'notification-error',
      duration: 5,
    })
  }

  const onFinish = (values) => {
    setIsEnablePrompt(false)
    notification.success({
      message: '運営アカウントを登録しました（ID : 00006)',
      className: 'notification-success',
      duration: 5,
    })
    console.log('form values: ', values)
    navigate(ORGANIZATION_MANAGEMENT)
  }

  return (
    <div className={styles.root}>
      <div className={styles.formContent}>
        <div className={styles.header}>
          <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
            <Link to={ORGANIZATION_MANAGEMENT}>利用組織管理に戻る</Link>
          </Button>
          <p className={styles.title}>新規利用組織登録</p>
        </div>
        <div>
          <RegisNewOrganizationForm
            onFinishFailed={onFinishFormFailed}
            onFinish={onFinish}
            onHandleCancel={() => onHandleCancel(false, ORGANIZATION_MANAGEMENT)}
          />
        </div>
      </div>
      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={() => handleGoBack(ORGANIZATION_MANAGEMENT)}
        handleCloseModal={handleCloseModalCancel}
      />
    </div>
  )
}

export default RegisNewOrganization
