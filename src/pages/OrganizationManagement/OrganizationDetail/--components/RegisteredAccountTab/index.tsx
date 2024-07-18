import React, { useState, useEffect } from 'react'
import { Tabs, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import styles from './RegisteredAccountTab.module.scss'
import UserTable from '@/pages/OrganizationManagement/OrganizationDetail/--components/RegisteredAccountTab/--components/UserTable'

const { TabPane } = Tabs
type PropsType = {
  userData: any
}

const RegisteredAccountTab: React.FC<PropsType> = ({ userData }) => {
  const { state }: any = useLocation()
  const [currentTab, setCurrentTab] = useState<string>('1')

  useEffect(() => {
    if (state) {
      state.tab === '1' ? setCurrentTab('1') : setCurrentTab('2')
    }
  }, [state])

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabButtons}>
        <Button
          type="default"
          className={currentTab === '1' ? styles.activated : undefined}
          onClick={() => setCurrentTab('1')}
        >
          解答者数：9,999,999人
        </Button>
        <Button
          type="default"
          className={currentTab === '2' ? styles.activated : undefined}
          onClick={() => setCurrentTab('2')}
        >
          出題者数：9,999,999人
        </Button>
      </div>
      <Tabs activeKey={currentTab}>
        <TabPane tab={null} key="1">
          <UserTable data={userData.answerers} />
        </TabPane>
        <TabPane tab={null} key="2">
          <UserTable data={userData.questioners} isQuestioners />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RegisteredAccountTab
