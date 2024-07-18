import { Button, Modal, Tabs } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './TopicAdd.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import JapanIcon from '@/assets/icons/ico_flag-japan.svg'
import TaiwanIcon from '@/assets/icons/ico_flag-taiwan.svg'
import ChinaIcon from '@/assets/icons/ico_flag-china.svg'
import MalayIcon from '@/assets/icons/ico_flag-malay.svg'
import IndoIcon from '@/assets/icons/ico_flag-indo.svg'
import ThailandIcon from '@/assets/icons/ico_flag-thailand.svg'
import VietNamIcon from '@/assets/icons/ico_flag-vietnam.svg'
import NewQuestionFrom from '../NewQuestionForm'
import { QUESTION_MANAGEMENT } from '@/constants/routes'

const TopicAdd = () => {
  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <div className={style.buttons}>
          <Button type="link" icon={<ArrowLeftIcon />} className={style.backBtn}>
            <Link to={QUESTION_MANAGEMENT}>出題問題管理に戻る</Link>
          </Button>
          <Button type="link" icon={<PreviewIcon />} className={style.previewBtn}>
            <span>プレビュー</span>
          </Button>
        </div>

        <h1 className={style.title}>新規問題登録</h1>

        <div className={style.tabs}>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane tab={<JapanIcon />} key="1" />
            <Tabs.TabPane tab={<TaiwanIcon />} key="2" />
            <Tabs.TabPane tab={<ChinaIcon />} key="3" />
            <Tabs.TabPane tab={<MalayIcon style={{ width: '24px' }} />} key="4" />
            <Tabs.TabPane tab={<IndoIcon />} key="5" />
            <Tabs.TabPane tab={<ThailandIcon />} key="6" />
            <Tabs.TabPane tab={<VietNamIcon />} key="7" />
          </Tabs>

          <div>
            <p className={style.selectedLanguage}>選択中言語 ： 日本語</p>
          </div>

          <div className={style.form}>
            <NewQuestionFrom />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicAdd
