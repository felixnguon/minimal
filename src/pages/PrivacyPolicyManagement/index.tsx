import React, { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import FlagTabs from '@/pages/PrivacyPolicyManagement/--components/FlagTabs'
import styles from './PrivacyPolicyManagement.module.scss'
import dummyData from '@/pages/PrivacyPolicyManagement/--components/FlagTabs/dummyData'

const PrivacyPolicyManagementPage: React.FC = () => {
  const navigate = useNavigate()

  const onCreateNewPolicy = useCallback(() => {
    navigate('new-privacy-policy-management')
  }, [navigate])

  return (
    <div className={styles.root}>
      <div className={styles.wrapHeader}>
        <div className={styles.head}>
          <p className={styles.title}>個人情報保護方針管理</p>
          <div className={styles.headerRightSide}>
            <span>
              <Button type="primary" onClick={onCreateNewPolicy}>
                新規個人情報保護方針登録
              </Button>
            </span>
          </div>
        </div>
      </div>
      <FlagTabs data={dummyData} />
    </div>
  )
}

export default PrivacyPolicyManagementPage
