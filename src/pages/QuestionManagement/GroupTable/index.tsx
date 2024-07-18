import React from 'react'
import { Space, Table, Tooltip } from 'antd'
import { useGetHeight } from '@/utils/useGetHeight'
import style from './GroupTable.module.scss'
import { ColumnsType } from 'antd/es/table'
import { getFlag } from '@/utils/useGetFlag'
import { useNavigate } from 'react-router-dom'

interface ItemTable {
  key: string
  id: string
  dateRegistered: string
  dateModified: string
  group: string[]
  topics: string[]
  status: string
  locale: string[]
  render?: (item: ItemTable) => React.ReactNode
}

const columns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    className: 'idColumn',
    sorter: true,
    width: 95,
  },
  {
    title: '登録日',
    dataIndex: 'dateRegistered',
    className: 'dateColumn',
    align: 'center',
    sorter: true,
    width: 122,
  },
  {
    title: '最終変更日',
    dataIndex: 'dateModified',
    className: 'dateModifiedColumn',
    align: 'center',
    sorter: true,
    ellipsis: true,
    width: 139,
  },
  {
    title: 'グループ名',
    dataIndex: 'group',
    align: 'left',
    ellipsis: true,
    className: 'groupColumn',
  },
  {
    title: '対応言語',
    dataIndex: 'locale',
    className: 'localeColumn',
    align: 'center',
    ellipsis: true,
    width: 126,
    render: (code) => (
      <div className={style.localeColumn}>
        {code.map((item) => (
          <span key={item}>{getFlag(item, '18px')}</span>
        ))}
      </div>
    ),
  },
  {
    title: '登録問題',
    dataIndex: 'topics',
    align: 'center',
    ellipsis: true,
    width: 292,
    className: 'topicsColumn',
    render: (text: string[]) => (
      <div className={style.topics}>
        {text.map((item, index) => (
          <Tooltip
            overlayClassName={style.tooltip}
            key={index}
            placement="top"
            title="問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル"
          >
            <p>{item}</p>
          </Tooltip>
        ))}
      </div>
    ),
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    sorter: true,
    width: 131,
  },
]

const data: ItemTable[] = [
  {
    key: '1',
    id: '0001',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '2',
    id: '0002',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '3',
    id: '0003',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '4',
    id: '0004',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '5',
    id: '0005',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '6',
    id: '0006',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '7',
    id: '0007',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '8',
    id: '0008',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '9',
    id: '0009',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '10',
    id: '0010',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '11',
    id: '0011',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    group: ['グループ名 (1)'],
    topics: ['00002', '00003', '00004', '00005', '00006', '00007', '00008', '00009', '00010'],
    status: '有効',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
]

const GroupTable = () => {
  const navigate = useNavigate()

  const onRowClick = (record: ItemTable) => {
    const id = record.id
    if (!id) return
    navigate(`${id}/edit-group`)
  }

  return (
    <div className={style.root}>
      <Table<ItemTable>
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: true }}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
      />
    </div>
  )
}

export default GroupTable
