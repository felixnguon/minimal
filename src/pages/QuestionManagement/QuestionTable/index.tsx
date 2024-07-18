import React, { FC } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space, Table, Tag } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useHoverTable } from '@/hooks/useHoverTable'
import style from './QuestionTable.module.scss'
import { useNavigate } from 'react-router-dom'
import { getFlag } from '@/utils/useGetFlag'

interface ItemTable {
  key: string
  id: string
  dateRegistered: string
  dateModified: string
  title: string
  group: string[]
  status: string
  locale: string[]
}

const columns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    className: 'idColumn',
    sorter: true,
  },
  {
    title: '登録日',
    dataIndex: 'dateRegistered',
    align: 'center',
    sorter: true,
    className: 'dateColumn',
    width: 106,
  },
  {
    title: '最終変更日',
    dataIndex: 'dateModified',
    align: 'center',
    sorter: true,
    className: 'dateModifiedColumn',
    width: 123,
  },
  {
    title: '問題タイトル',
    dataIndex: 'title',
    align: 'left',
    className: 'titleColumn',
  },
  {
    title: 'グループ',
    dataIndex: 'group',
    align: 'center',
    render: (text: string[]) => (
      <>
        {text.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </>
    ),
    className: 'groupColumn',
    width: 146,
  },
  {
    title: '対応言語',
    dataIndex: 'locale',
    align: 'center',
    width: 110,
    render: (code) => (
      <div className={style.localeColumn}>
        {code.map((item) => (
          <span key={item}>{getFlag(item, '18px')}</span>
        ))}
      </div>
    ),
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    align: 'center',
    sorter: true,
    className: 'statusColumn',
    width: 130,
  },
  Table.EXPAND_COLUMN,
]

const data: ItemTable[] = [
  {
    key: '1',
    id: '0001',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],
    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '2',
    id: '0002',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],

    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '3',
    id: '0003',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],

    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '4',
    id: '0004',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],

    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '5',
    id: '0005',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],
    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '6',
    id: '0006',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],
    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '7',
    id: '0007',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],
    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '8',
    id: '0008',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],
    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '9',
    id: '0009',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],

    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
  {
    key: '10',
    id: '0010',
    dateRegistered: '2022/01/30',
    dateModified: '2022/01/30',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    group: ['グループ名 (1)', 'グループ名 (2)', 'グループ名 (3)'],

    status: '公開',
    locale: ['jp', 'tw', 'cn', 'my', 'id', 'th', 'vn'],
  },
]

const dataTag = new Array(20).fill('').map((_, index) => index + 1)

const QuestionTable: FC = () => {
  const scroll = (key: string, scrollOffset: number) => {
    const swiper = document.querySelector(`.swiper-${key}`)
    if (swiper) {
      swiper.scrollLeft += scrollOffset
    }
  }

  const expandedRowRender = ({ id, key }) => {
    return (
      <div
        onClick={() => {
          onExpandedRowClick(id)
        }}
      >
        <div className={style.swiperWrapper}>
          <LeftOutlined
            style={{ color: '#298055' }}
            onClick={(e) => {
              e.stopPropagation()
              scroll(key, -40)
            }}
          />
          <div className={clsx(style.swiper, `swiper-${key}`)}>
            {dataTag.map((_, index) => (
              <Tag color="#ebebeb" key={index}>
                ＃タグ
              </Tag>
            ))}
          </div>
          <RightOutlined
            onClick={(e) => {
              e.stopPropagation()
              scroll(key, 40)
            }}
            style={{ color: '#298055' }}
          />
        </div>
      </div>
    )
  }

  const navigate = useNavigate()

  const onRowClick = (record: ItemTable) => {
    const id = record.id
    if (!id) return
    navigate(`${id}/edit-topic`)
  }

  const onExpandedRowClick = (id) => {
    if (!id) return
    navigate(`${id}/edit-topic`)
  }

  useHoverTable()

  return (
    <div className={style.root}>
      <Table<ItemTable>
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
          defaultExpandAllRows: true,
          expandIcon: () => <></>,
          columnWidth: 0,
        }}
        scroll={{ x: true }}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
        className="hasExpandedHoverBehavior"
      />
    </div>
  )
}

export default QuestionTable
