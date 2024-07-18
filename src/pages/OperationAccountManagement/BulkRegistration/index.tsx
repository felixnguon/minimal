import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Upload, notification, Pagination, Table } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
import { ColumnsType } from 'antd/es/table'
import { Transition } from 'history'
import { DraggerProps } from 'antd/lib/upload/Dragger'

import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import CsvIcon from '@/assets/icons/ico_csv.svg'
import FileIcon from '@/assets/icons/ico_file.svg'
import CloseIcon from '@/assets/icons/ico_close.svg'
import CloseRedIcon from '@/assets/icons/ico_close-red.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'

import styles from './BulkRegistration.module.scss'
import { data as dataSource } from './__mocks__/list'
import ModalCancel from '@/components/Modal/ModalCancel'
import { useBlocker, useConfirmNavigate } from '@/utils/usePrompt'
import { OPERATION_ACCOUNT_MANAGEMENT } from '@/constants/routes'

const { Dragger } = Upload

export interface DataSourceType {
  key: string
  fullName: string
  emailAddress: string
  authority: string
  tag: string
  status: string
}

const BulkRegistration = () => {
  const navigate = useNavigate()
  const [isIgnoreFile, setIsIgnoreFile] = useState<boolean>(false)
  const [infoFile, setInfoFile] = useState<RcFile>()

  const uploadedDate = '2022/01/30'

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    action: '',

    beforeUpload: (file: RcFile) => {
      setInfoFile(file)
      if (file.type !== 'text/csv') {
        notification.error({
          message: '登録用CSVフォーマットのファイルを選択してください',
          className: 'notification-error',
          duration: 5,
          icon: <CloseRedIcon />,
        })
      }

      return true
    },

    onChange(info) {
      const { type } = info.file

      const isCSV = type === 'text/csv'
      if (!isCSV) {
        setIsIgnoreFile(true)
      } else {
        setIsIgnoreFile(false)
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const columns: ColumnsType<DataSourceType> = [
    {
      title: '氏名',
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: 'メールアドレス',
      dataIndex: 'emailAddress',
      align: 'center',
      width: '20%',
    },
    {
      title: '権限',
      dataIndex: 'authority',
      align: 'center',
      width: 130,
    },
    {
      title: 'タグ作成',
      dataIndex: 'tag',
      align: 'center',
      width: '10%',
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      align: 'center',
      render: (text: string) => (
        <>
          {(() => {
            switch (text) {
              case '無効':
                return <p className={styles.textRed}>{text}</p>
              default:
                return <p>{text}</p>
            }
          })()}
        </>
      ),
      width: 130,
    },
  ]

  const handleRemoveFileUpload = () => {
    setInfoFile(undefined)
  }

  const handleSubmit = () => {
    setIsEnablePrompt(false)

    setTimeout(() => {
      notification.success({
        message: '運営アカウントを登録しました（ID : 00006)',
        className: 'notification-success',
        duration: 5,
        icon: <SuccessIcon />,
      })
      navigate(OPERATION_ACCOUNT_MANAGEMENT)
    }, 0)
  }

  const {
    isEnablePrompt,
    isVisibleModalCancel,
    setIsVisibleModalCancel,
    handleCloseModalCancel,
    handleGoBack,
    setPathTarget,
    onHandleCancel,
    setIsEnablePrompt,
  } = useConfirmNavigate()

  useBlocker((tx: Transition) => {
    setPathTarget(tx?.location?.pathname)
    setIsVisibleModalCancel(true)
  }, isEnablePrompt)

  return (
    <>
      <div className={styles.registrationWrapper}>
        <div className={styles.registrationContent}>
          <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
            <Link to={OPERATION_ACCOUNT_MANAGEMENT}>運営アカウント管理に戻る</Link>
          </Button>

          <h1 className={styles.title}>新規運営アカウント一括登録</h1>

          <div className={styles.formWrapper}>
            <p className={styles.uploadLabel}>アップロード</p>

            <div className={styles.formContent}>
              <div className={styles.downloadWrapper}>
                <Button type="link" icon={<CsvIcon />} className={styles.downloadBtn}>
                  登録用CSVフォーマットダウンロード
                </Button>
              </div>

              <Dragger {...draggerProps} disabled={!!infoFile && !isIgnoreFile}>
                <div className={styles.uploadTextWrapper}>
                  <p>ファイルをここにドラッグ</p>
                  <p>または</p>
                </div>
                <Button type="primary" disabled={!!infoFile && !isIgnoreFile}>
                  ファイルを選択
                </Button>
              </Dragger>

              {isIgnoreFile ? (
                <p className={styles.errorText}>もう一度ファイルを選択してください</p>
              ) : (
                infoFile && (
                  <>
                    <div className={styles.infoFile}>
                      <FileIcon />
                      <p>{infoFile?.name || ''}</p>
                      <p className={styles.infoDate}>({uploadedDate})</p>
                      <Button
                        icon={<CloseIcon />}
                        className={styles.removeBtn}
                        onClick={handleRemoveFileUpload}
                      ></Button>
                    </div>

                    <div className={styles.tableWrapper}>
                      <Table<DataSourceType>
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        pagination={false}
                        className={styles.table}
                      />

                      <div className={styles.pagination}>
                        <Pagination
                          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
                          defaultCurrent={1}
                          total={120}
                          size="small"
                        />
                      </div>
                    </div>

                    <div className={styles.actionWrapper}>
                      <Button
                        className={styles.actionBtn}
                        onClick={() => onHandleCancel(false, OPERATION_ACCOUNT_MANAGEMENT)}
                      >
                        キャンセル
                      </Button>
                      <Button type="primary" className={styles.actionBtn} onClick={handleSubmit}>
                        登録
                      </Button>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={() => handleGoBack(OPERATION_ACCOUNT_MANAGEMENT)}
        handleCloseModal={handleCloseModalCancel}
      />
    </>
  )
}

export default BulkRegistration
