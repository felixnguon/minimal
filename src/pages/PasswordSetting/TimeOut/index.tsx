import React from 'react'

import SDGLogo from '@/assets/icons/ico_sdg_logo.svg'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './TimeOut.module.scss'

const TimeOut: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.titleContent}>
          <SDGLogo />
          <p>SDGs オンラインカリキュラム管理コンテンツ</p>
        </div>

        <div className={styles.expiredText}>
          <p>URLの有効期限が切れました。</p>
          <p>現在のメールアドレス・パスワードでログインして</p>
          <p>再度パスワードリセットをおこなってください。</p>
        </div>

        <Button
          type="primary"
          className={styles.backToLoginButton}
          onClick={() => navigate('/login')}
        >
          ログインページ
        </Button>
      </div>
    </div>
  )
}

export default TimeOut
