import React, { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import style from './OrganizationManagement.module.scss'
import CSVIcon from '@/assets/icons/ico_csv.svg'
import OrganizationsTable from '@/pages/OrganizationManagement/OrganizationsTable'

// const { Search } = Input

const OrganizationManagementPage: React.FC = () => {
  const navigate = useNavigate()
  // const onSearch = useCallback((value) => {
  //   console.log('search value: ', value)
  // }, [])

  // const onCreateNewOrganization = useCallback(() => {
  //   navigate('new')
  // }, [navigate])

  const onCreateNewOrganization = useCallback(() => {
    navigate('new-organization')
  }, [navigate])

  return (
    <div className={style.root}>
      <div className={style.wrapHeader}>
        <div className={style.head}>
          <p className={style.title}>利用組織管理</p>
          <div className={style.headerRightSide}>
            {/* <Search placeholder="団体検索" allowClear onSearch={onSearch} /> */}
            <span className={style.csvButton}>
              <Button type="text" icon={<CSVIcon />}>
                CSVダウンロード
              </Button>
            </span>

            <span>
              <Button type="primary" onClick={onCreateNewOrganization}>
                新規利用組織登録
              </Button>
            </span>
          </div>
        </div>
        <div className={style.count}>
          <a href="#">登録利用組織数：9,999,999 組織</a>
        </div>
      </div>
      <OrganizationsTable />
    </div>
  )
}

export default OrganizationManagementPage
