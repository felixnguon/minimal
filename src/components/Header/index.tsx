import React, { useState } from 'react'
import { Layout, Dropdown, Menu, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import BellIcon from '@/assets/icons/ico_bell.svg'
import AvatarIcon from '@/assets/icons/ico_avatar.svg'
import UserSettingIcon from '@/assets/icons/ico_user-setting.svg'
import LogoutIcon from '@/assets/icons/ico_logout.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import styles from './Header.module.scss'
import services from '@/services'
import { storageKeys } from '@/constants/storage-keys'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/store'
import { resetCredentials } from '@/store/auth'

import ModalUserSetting from '@/components/Modal/ModalUserSetting'
import ModalAskToChangePassword from '@/components/Modal/ModalAskToChangePassword'

const StorageService = services.get('StorageService')

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const [isVisibleUserSettingModal, setIsVisibleUserSettingModal] = useState<boolean>(false)
  const [isVisibleChangePasswordModal, setIsVisibleChangePasswordModal] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch(resetCredentials())
    notification.success({
      message: 'ログアウトしました',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
    StorageService.remove(storageKeys.authProfile)
    navigate('login')
  }

  const handleOpenUserSettingModal = () => {
    setIsVisibleUserSettingModal(true)
  }

  const handleCloseModalUserSetting = () => {
    setIsVisibleUserSettingModal(false)
  }

  const handleOpenModalChangePassword = () => {
    setIsVisibleUserSettingModal(false)
    setIsVisibleChangePasswordModal(true)
  }

  const handleSubmitChangePassword = () => {
    setIsVisibleChangePasswordModal(false)
    StorageService.remove(storageKeys.authProfile)
    navigate('reset-password', { state: { userEmail: 'user@sdg.com' } })
  }

  const handleCloseModalChangePassword = () => {
    setIsVisibleChangePasswordModal(false)
    setIsVisibleUserSettingModal(true)
  }

  const menu = (
    <Menu className={styles.menuDropdown}>
      <Menu.Item key="1">
        <div onClick={handleOpenUserSettingModal} className={styles.menuItemContent}>
          <UserSettingIcon />
          個人設定
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={handleLogout} className={styles.menuItemContent}>
          <LogoutIcon />
          ログアウト
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.root}>
      <Layout.Header>
        <div className={styles.headerContent}>
          <BellIcon className={styles.bellIcon} />

          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.headerProfile}>
              <AvatarIcon />
              <p className={styles.userName}>{user?.username || ''}</p>
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
      <ModalUserSetting
        visible={isVisibleUserSettingModal}
        handleCloseModal={handleCloseModalUserSetting}
        handleOpenModalChangePassword={handleOpenModalChangePassword}
        user={user}
      />
      <ModalAskToChangePassword
        visible={isVisibleChangePasswordModal}
        handleCloseModal={handleCloseModalChangePassword}
        handleSubmitChangePassword={handleSubmitChangePassword}
      />
    </div>
  )
}
