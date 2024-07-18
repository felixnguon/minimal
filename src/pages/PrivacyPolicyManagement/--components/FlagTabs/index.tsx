import React from 'react'
import { Tabs } from 'antd'
import JapanFlagIcon from '@/assets/icons/ico_flag-japan.svg'
import TaiwanFlagIcon from '@/assets/icons/ico_flag-taiwan.svg'
import ChinaFlagIcon from '@/assets/icons/ico_flag-china.svg'
import KoreanFlagIcon from '@/assets/icons/ico_flag-korean.svg'
import MalayFlagIcon from '@/assets/icons/ico_flag-malay.svg'
import IndoFlagIcon from '@/assets/icons/ico_flag-indo.svg'
import ThailandFlagIcon from '@/assets/icons/ico_flag-thailand.svg'
import VietNamFlagIcon from '@/assets/icons/ico_flag-vietnam.svg'
import EnglandFlagIcon from '@/assets/icons/ico_flag-england.svg'
import TabTable from '@/pages/PrivacyPolicyManagement/--components/TabTable'

import styles from './FlagTabs.module.scss'

const { TabPane } = Tabs

type PropsType = {
  data: any
}

const FlagTabs: React.FC<PropsType> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<JapanFlagIcon />} key="1">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<EnglandFlagIcon />} key="2">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<TaiwanFlagIcon />} key="3">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<ChinaFlagIcon />} key="4">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<KoreanFlagIcon />} key="5">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<MalayFlagIcon />} key="6">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<IndoFlagIcon />} key="7">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<ThailandFlagIcon />} key="8">
          <TabTable dataSource={data} />
        </TabPane>
        <TabPane tab={<VietNamFlagIcon />} key="9">
          <TabTable dataSource={data} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FlagTabs
