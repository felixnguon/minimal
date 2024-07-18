import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import styles from './NotFound.module.scss'
import notFoundImg from '@/assets/images/404.png'

const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subTitle}>Page not found.</h2>

        <img alt="page not found" width="100%" src={notFoundImg} className={styles.image} />

        <p className={styles.description}>申し訳ございませんが、お探しのページが見つかりません。</p>

        <Button type="primary" className={styles.backBtn}>
          <Link to="/">ダッシュボードへ行く</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
