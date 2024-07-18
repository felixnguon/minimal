import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'

import CsvIcon from '@/assets/icons/ico_csv.svg'
import ArrowDownIcon from '@/assets/icons/ico_arrow-down.svg'
import styles from './OperationAccountManagement.module.scss'

const OperationAccountManagementPage: React.FC = () => {
  const menu = (
    <Menu className={styles.menu}>
      <Menu.Item key="1">
        <Link to="/operation-account-management/individual-registration">個別登録</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/operation-account-management/bulk-registration">一括登録</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>運営アカウント管理</h1>
        <div className={styles.contentRight}>
          <Button type="text" className={styles.csvBtn} icon={<CsvIcon />}>
            CSVダウンロード
          </Button>

          <Dropdown overlay={menu}>
            <Button className={styles.createBtn}>
              新規アカウント登録
              <ArrowDownIcon className={styles.arrowIcon} />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default OperationAccountManagementPage
