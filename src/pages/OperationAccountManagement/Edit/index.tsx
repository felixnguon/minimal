import React, { useEffect, useState } from 'react'
import { Button, Avatar, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import AvatarIcon from '@/assets/icons/ico_avatar.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import OperationAccountForm from '../-components/OperationAccountForm'
import ModalConfirmDelete from '@/components/Modal/ModalConfirmDelete'
import styles from './Edit.module.scss'
import { OPERATION_ACCOUNT_MANAGEMENT } from '@/constants/routes'

const initialValues = {
  id: '00001',
  registrationDate: '2022/01/30',
  fullName: 'ユーザ氏名',
  email: 'xxxxxxxxxxxxxx@xxxxxxxxxx.xxx',
  authority: 1,
  tagCreation: 2,
  status: '無効',
}

const EditPage = () => {
  const navigate = useNavigate()

  const [firstNameCharacter, setFirstNameCharacter] = useState<string>(
    initialValues.fullName.split('')[0]
  )
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)
  const [isCheckedDelete, setIsCheckedDelete] = useState<boolean>(false)

  const onFinish = () => {
    if (!isCheckedDelete) {
      notification.success({
        message: '運営アカウントを登録しました（ID : 00006)',
        className: 'notification-success',
        duration: 5,
        icon: <SuccessIcon />,
      })
      navigate(OPERATION_ACCOUNT_MANAGEMENT)
    } else {
      setIsOpenModalDelete(true)
    }
  }

  const onHandleCheckDelete = (e) => {
    setIsCheckedDelete(e?.target?.checked || false)
  }

  const handleConfirmDeleteUser = () => {
    setIsOpenModalDelete(false)

    notification.success({
      message: '運営アカウントを削除しました（ID : 00006)',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
    navigate(OPERATION_ACCOUNT_MANAGEMENT)
  }

  const handleCancelDeleteUser = () => {
    setIsOpenModalDelete(false)
  }

  useEffect(() => {
    setFirstNameCharacter(initialValues.fullName.split('')[0])
  }, [])

  return (
    <div>
      <div className={styles.formWrapper}>
        <div className={styles.formContent}>
          <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
            <Link to={OPERATION_ACCOUNT_MANAGEMENT}>運営アカウント管理に戻る</Link>
          </Button>

          <h1 className={styles.title}>運営アカウントの編集</h1>

          <p className={styles.lastUpdate}>
            最終更新日時： <span>2022/01/30 - 07:40AM</span>
          </p>

          <div className={styles.profileWrapper}>
            {firstNameCharacter ? (
              <Avatar className={styles.avatar}>{firstNameCharacter}</Avatar>
            ) : (
              <AvatarIcon width="80px" height="80px" />
            )}

            <OperationAccountForm
              isEditForm
              initialValues={initialValues}
              onFinish={onFinish}
              onHandleCheckDelete={onHandleCheckDelete}
            />
          </div>
        </div>
      </div>

      <ModalConfirmDelete
        visible={isOpenModalDelete}
        handleCancel={handleCancelDeleteUser}
        handleConfirm={handleConfirmDeleteUser}
      />
    </div>
  )
}

export default EditPage
