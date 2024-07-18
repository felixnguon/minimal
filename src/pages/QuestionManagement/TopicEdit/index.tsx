import { Button, Space, Tabs } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './TopicEdit.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import JapanIcon from '@/assets/icons/ico_flag-japan.svg'
import TaiwanIcon from '@/assets/icons/ico_flag-taiwan.svg'
import ChinaIcon from '@/assets/icons/ico_flag-china.svg'
import MalayIcon from '@/assets/icons/ico_flag-malay.svg'
import IndoIcon from '@/assets/icons/ico_flag-indo.svg'
import ThailandIcon from '@/assets/icons/ico_flag-thailand.svg'
import VietNamIcon from '@/assets/icons/ico_flag-vietnam.svg'
import DetailQuestionForm from '@/pages/QuestionManagement/DetailQuestionForm'

const TopicEdit = () => {
  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <div className={style.buttons}>
          <Button type="link" icon={<ArrowLeftIcon />} className={style.backBtn}>
            <Link to={'/question-management?tab=1'}>出題問題管理に戻る</Link>
          </Button>

          <Space size={48} align="center">
            <Space size={24} className={style.flags}>
              <p>対応言語</p>
              <Space size={12}>
                <JapanIcon style={{ height: '24px' }} />
                <TaiwanIcon style={{ height: '24px' }} />
                <ChinaIcon style={{ height: '24px' }} />
                <MalayIcon style={{ height: '24px' }} />
                <IndoIcon style={{ height: '24px' }} />
                <ThailandIcon style={{ height: '24px' }} />
                <VietNamIcon style={{ height: '24px' }} />
              </Space>
            </Space>

            <Button type="link" icon={<PreviewIcon />} className={style.previewBtn}>
              <span>プレビュー</span>
            </Button>
          </Space>
        </div>

        <h1 className={style.title}> 問題の編集</h1>

        <div className={style.tabs}>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane tab={<JapanIcon />} key="1" />
            <Tabs.TabPane tab={<TaiwanIcon />} key="2" />
            <Tabs.TabPane tab={<ChinaIcon />} key="3" />
            <Tabs.TabPane tab={<MalayIcon />} key="4" />
            <Tabs.TabPane tab={<IndoIcon />} key="5" />
            <Tabs.TabPane tab={<ThailandIcon />} key="6" />
            <Tabs.TabPane tab={<VietNamIcon />} key="7" />
          </Tabs>

          <div>
            <p className={style.selectedLanguage}>選択中言語 ： 日本語</p>
          </div>

          <div className={style.time}>
            <span className={style.timeLabel}>最終更新日時 ： </span>
            <span>2022/01/30 - 07:40AM</span>
          </div>

          <div className={style.form}>
            <DetailQuestionForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicEdit
