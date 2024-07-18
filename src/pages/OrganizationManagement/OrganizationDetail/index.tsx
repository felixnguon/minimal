import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import queryString from 'query-string'
import styles from './OrganizationDetail.module.scss'
import ModalCancel from '@/components/Modal/ModalCancel'
import OrganizationDetailForm from '@/pages/OrganizationManagement/OrganizationDetail/--components/OrganizationDetailForm'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import CSVIcon from '@/assets/icons/ico_csv.svg'
import dummyData from './dummyData'
import { ORGANIZATION_MANAGEMENT } from '@/constants/routes'

const OrganizationDetail: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isVisibleModalCancel, setIsVisibleModalCancel] = useState<boolean>(false)

  const [, setSearchParams] = useSearchParams()

  const [key, setKey] = useState<string>(String(queryString.parse(location.search)?.tab || '1'))

  useEffect(() => {
    setSearchParams({ tab: key })
  }, [])

  const onTabClick = (key) => {
    setSearchParams({ tab: String(key) })
    setKey(key)
  }

  const onHandleCancel = () => {
    setIsVisibleModalCancel(true)
  }

  const handleGoBack = () => {
    setIsVisibleModalCancel(false)
    navigate(ORGANIZATION_MANAGEMENT)
  }

  const handleCloseModal = () => {
    setIsVisibleModalCancel(false)
  }

  const onFormFinish = (name, { forms }) => {
    console.log('current form: ', name)
    console.log('forms value: ', forms[name].getFieldsValue())
  }

  return (
    <div className={styles.root}>
      <div className={styles.formContent}>
        <div className={styles.header}>
          <div className={styles.buttonGroup}>
            <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
              <Link to={ORGANIZATION_MANAGEMENT}>利用組織管理に戻る</Link>
            </Button>
            <div className={styles.rightHeader}>
              {key === '1' ? (
                <span className={styles.csvButton}>
                  <Button type="text" icon={<CSVIcon />}>
                    CSVダウンロード
                  </Button>
                </span>
              ) : null}
              <Button type="primary">管理代替</Button>
            </div>
          </div>
          <p className={styles.title}>利用組織名利用組織名利用組織名利用組織名</p>
        </div>
      </div>
      <OrganizationDetailForm
        initialValues={dummyData}
        onHandleCancel={onHandleCancel}
        onFormFinish={onFormFinish}
        onTabClick={onTabClick}
        activeKey={key}
      />
      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={handleGoBack}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

export default OrganizationDetail
