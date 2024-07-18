import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, Pagination } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { getFlag } from '@/utils/useGetFlag'
import { useHoverTable } from '@/hooks/useHoverTable'
import style from './OrganizationTable.module.scss'
import XIcon from '@/assets/icons/ico_line_close.svg'
import OIcon from '@/assets/icons/ico_line_circle.svg'
import { Locale } from '@/types/locale'
import { data } from './dummyData'

interface ItemTable {
  key: string
  id: string
  dateStart: string
  dateEnd: string
  organizationName: string
  numberOfContract: number
  isHasPersonalInformation: boolean
  isHasTermsOfService: boolean
  locale: Locale
  status: string
}

const dataTag = new Array(30).fill('').map((_, index) => index + 1)

const OrganizationTable: React.FC = () => {
  const navigate = useNavigate()

  const scroll = (key: string, scrollOffset: number) => {
    const swiper = document.querySelector(`.swiper-${key}`)
    if (swiper) {
      swiper.scrollLeft += scrollOffset
    }
  }

  const onExpandedRowClick = (id) => {
    if (!id) return
    navigate(`${id}/edit?tab=1`)
  }

  const expandedRowRender = ({ id, key }) => {
    return (
      <div onClick={() => onExpandedRowClick(id)}>
        <div className={style.swiperWrapper}>
          <LeftOutlined
            onClick={(e) => {
              e.stopPropagation()
              scroll(key, -40)
            }}
          />
          <div className={clsx(style.swiper, `swiper-${key}`)}>
            {dataTag.map((_, index) => (
              <Tag color="#EBEBEB" key={index}>
                #タグ
              </Tag>
            ))}
          </div>
          <RightOutlined
            onClick={(e) => {
              e.stopPropagation()
              scroll(key, 40)
            }}
          />
        </div>
      </div>
    )
  }
  const onRowClick = (record: ItemTable) => {
    const id = record.id
    if (!id) return
    navigate(`${id}/edit?tab=1`)
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
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
        className="hasExpandedHoverBehavior"
      />
      <div className={style.pagination}>
        <Pagination
          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
          defaultCurrent={2}
          total={50}
          size="small"
        />
      </div>
    </div>
  )
}

export default OrganizationTable

const columns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    className: 'idColumn',
    sorter: true,
    width: '84px',
  },
  {
    title: '利用開始日',
    dataIndex: 'dateStart',
    align: 'center',
    className: 'dateColumn',
    sorter: true,
    width: '10.3%',
  },
  {
    title: '利用終了日',
    dataIndex: 'dateEnd',
    align: 'center',
    className: 'dateColumn',
    sorter: true,
    width: '10.3%',
  },
  {
    title: '利用組織名',
    dataIndex: 'organizationName',
    align: 'left',
    className: 'nameColumn',
    width: '30%',
    render: (_, record) => <Link to={`${record.id}/edit?tab=1`}>{record.organizationName}</Link>,
  },
  {
    title: '契約問題数',
    dataIndex: 'numberOfContract',
    align: 'center',
    width: '9%',
  },
  {
    title: '規約同意状況',
    children: [
      {
        title: '個人情報',
        dataIndex: 'isHasPersonalInformation',
        align: 'center',
        className: 'agreementStatusColumn',
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
      {
        title: '利用規約',
        dataIndex: 'isHasTermsOfService',
        align: 'center',
        className: 'agreementStatusColumn',
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
    ],
  },
  {
    title: '利用国',
    dataIndex: 'locale',
    align: 'center',
    width: '10.8%',
    className: 'flag',
    render: ({ code, name }) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {getFlag(code)} <span style={{ marginLeft: '5px' }}>{name}</span>
      </div>
    ),
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    align: 'center',
    sorter: true,
    width: '10.3%',
  },
  Table.EXPAND_COLUMN,
]
