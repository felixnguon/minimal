import React, { useState, useEffect, useMemo } from 'react'
import { FormInstance } from 'antd/lib/form/Form'
import { Form, Table, Tag, Button, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import OpenCollapseIcon from '@/assets/icons/ico_collapse_open.svg'
import CloseCollapseIcon from '@/assets/icons/ico_collapse_close.svg'
import CurrentContractDetailForm from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab/CurrentContractDetailForm'
import ModalConfirmDelete from '@/components/Modal/ModalConfirmDelete'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import styles from './ContractHistory.module.scss'
import { useGetWidth } from '@/utils/useGetWidth'

type HistoryItem = {
  id: string
  updateDate: number
  startDate: number
  endDate: string
  status: string
}

type PropsType = {
  form: FormInstance
}
const ContractHistory: React.FC<PropsType> = ({ form }) => {
  const [tableData, setTableData] = useState<Array<HistoryItem>>([])
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)
  const { width } = useGetWidth()

  const handleConfirmDeleteContract = () => {
    setIsOpenModalDelete(false)

    notification.success({
      message: '運営アカウントを削除しました（ID : 00006)',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
  }

  const handleCancelDeleteContract = () => {
    setIsOpenModalDelete(false)
  }

  const handleClickDeleteButton = () => {
    setIsOpenModalDelete(true)
  }

  const columns: ColumnsType<HistoryItem> = useMemo(
    () => [
      {
        title: '更新日',
        key: 'updateDate',
        dataIndex: 'updateDate',
        width: '19.6%',
        align: 'center',
      },
      {
        title: '開始日時',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '26.2%',
        align: 'center',
      },
      {
        title: '終了日時',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '34.5%',
        align: 'center',
        className: styles.endDateColumn,
      },
      {
        dataIndex: 'status',
        key: 'status',
        width: width > 1600 ? '12%' : '13%',
        className: styles.statusColumn,
        render: (value) => {
          switch (value) {
            case 'notActive':
              return (
                <Tag color="#FFCCC7" className={styles.notActiveTag}>
                  開始前
                </Tag>
              )
              break
            case 'expired':
              return (
                <Tag color="#D9D9D9" className={styles.expired}>
                  終了
                </Tag>
              )
              break
            case 'active':
              return (
                <Tag color="#389E0D" className={styles.active}>
                  履行中
                </Tag>
              )
              break
            default:
              return null
              break
          }
        },
      },
      Table.EXPAND_COLUMN,
    ],
    [width]
  )

  const expandedRowRender = ({ id, status }) => {
    return (
      <div className={styles.expandedWrapper}>
        <CurrentContractDetailForm
          form={form}
          isExpandedElement
          isEffectedContract={status !== 'expired'}
        />
        <Button type="default" className={styles.deleteButton} onClick={handleClickDeleteButton}>
          この契約を削除する
        </Button>
      </div>
    )
  }

  useEffect(() => {
    setTableData(form.getFieldsValue().historyData)
  }, [form])

  return (
    <div>
      <Form.Item label="契約期間更新履歴" name="historyData" className={styles.root}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => expandedRowRender(record),
            defaultExpandAllRows: true,
            expandIcon: ({ expanded, onExpand, record }) =>
              record.status !== 'active' ? (
                expanded ? (
                  <span onClick={(e) => onExpand(record, e)}>
                    <CloseCollapseIcon />
                  </span>
                ) : (
                  <span onClick={(e) => onExpand(record, e)}>
                    <OpenCollapseIcon />
                  </span>
                )
              ) : null,
          }}
        />
      </Form.Item>
      <ModalConfirmDelete
        visible={isOpenModalDelete}
        handleCancel={handleCancelDeleteContract}
        handleConfirm={handleConfirmDeleteContract}
        content="この契約を削除してもよろしいですか？"
      />
    </div>
  )
}

export default ContractHistory
