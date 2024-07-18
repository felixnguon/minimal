import React, { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import FlagTabs from '@/pages/PrivacyPolicyManagement/--components/FlagTabs'
import styles from './TermsOfUseManagement.module.scss'
import dummyData from '@/pages/PrivacyPolicyManagement/--components/FlagTabs/dummyData'

const TermsOfUseManagementPage: React.FC = () => {
  const navigate = useNavigate()

  const onCreateNewTerm = useCallback(() => {
    navigate('new-term-of-use-management')
  }, [navigate])

  return (
    <div className={styles.root}>
      <div className={styles.wrapHeader}>
        <div className={styles.head}>
          <p className={styles.title}>利用規約管理</p>
          <div className={styles.headerRightSide}>
            <span>
              <Button type="primary" onClick={onCreateNewTerm}>
                新規利用規約登録
              </Button>
            </span>
          </div>
        </div>
      </div>
      <FlagTabs data={dummyData} />
    </div>
  )
}

export default TermsOfUseManagementPage
