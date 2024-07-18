import React from 'react'

import SDGLogo from '@/assets/icons/ico_sdg_logo.svg'
import styles from './TimeOut.module.scss'

const TimeOut: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.titleContent}>
          <SDGLogo />
          <p>SDGs オンラインカリキュラム管理コンテンツ</p>
        </div>

        <div className={styles.expiredText}>
          <p>URLの有効期限が切れました</p>
          <p>管理者に連絡して再度パスワード設定のURLを送信してもらってください</p>
        </div>
      </div>
    </div>
  )
}

export default TimeOut
