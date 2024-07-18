import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { find } from 'lodash'

import LogoIcon from '@/assets/icons/ico_logo.svg'
import MenuCloseIcon from '@/assets/icons/ico_menu-close.svg'
import MenuOpenIcon from '@/assets/icons/ico_menu-open.svg'
import CompanyIcon from '@/assets/icons/ico_company.svg'
import GroupUserIcon from '@/assets/icons/ico_group-user.svg'
import MoneyIcon from '@/assets/icons/ico_money.svg'
import ProblemsIcon from '@/assets/icons/ico_problems.svg'
import HistoryLogIcon from '@/assets/icons/ico_history-log.svg'
import PrivateIcon from '@/assets/icons/ico_user-private.svg'
import PolicyIcon from '@/assets/icons/ico_policy.svg'

import styles from './Sidebar.module.scss'
import { useIsRoleAdmin } from '@/hooks/useAuth'

type MenuListType = {
  key: string
  href: string
  linkText: string
  icon: JSX.Element
}

const { Sider } = Layout

const menuList: MenuListType[] = [
  {
    key: '1',
    href: '/organization-management',
    linkText: '利用組織管理',
    icon: <CompanyIcon />,
  },
  {
    key: '2',
    href: '/question-management',
    linkText: '出題問題管理',
    icon: <ProblemsIcon />,
  },
  {
    key: '3',
    href: '/operation-account-management',
    linkText: '運営アカウント管理',
    icon: <GroupUserIcon />,
  },
  {
    key: '4',
    href: '/billing-management',
    linkText: '請求管理',
    icon: <MoneyIcon />,
  },
]

const adminMenuList: MenuListType[] = [
  {
    key: '1',
    href: '/operation-account-management',
    linkText: '運営アカウント管理',
    icon: <GroupUserIcon />,
  },
  {
    key: '2',
    href: '/access-log-management',
    linkText: 'アクセスログ管理',
    icon: <HistoryLogIcon />,
  },
  {
    key: '3',
    href: '/privacy-policy-management',
    linkText: '個人情報保護方針管理',
    icon: <PrivateIcon />,
  },
  {
    key: '4',
    href: '/terms-of-use-management',
    linkText: '利用規約管理',
    icon: <PolicyIcon />,
  },
]

export const SideBar: React.FC = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])
  const isAdmin = useIsRoleAdmin()

  useEffect(() => {
    const menu = isAdmin ? adminMenuList : menuList
    setCurrentMenu(menu)
  }, [isAdmin])

  const toggleCollapsed = () => {
    setIsCollapsed((val) => !val)
  }

  useEffect(() => {
    const parentRoute = `/${location.pathname.split('/')[1]}`
    const routeFound = find(currentMenu, { href: parentRoute })

    if (routeFound) {
      setSelectedKeys([routeFound.key])
    } else {
      setSelectedKeys([])
    }
  }, [currentMenu, location])

  useEffect(() => {
    if (isCollapsed) document.documentElement.style.setProperty('--position-left-noti', '72px')
    else document.documentElement.style.setProperty('--position-left-noti', '232px')
  }, [isCollapsed])

  return (
    <div className={styles.root}>
      <Sider trigger={null} collapsible collapsed={isCollapsed} width={232} collapsedWidth={72}>
        <div className={styles.logo}>
          {!isCollapsed && (
            <Link to="/">
              <LogoIcon />
            </Link>
          )}

          <div onClick={toggleCollapsed} className={styles.btnCollapse}>
            {isCollapsed ? <MenuOpenIcon /> : <MenuCloseIcon />}
          </div>
        </div>

        <Menu mode="inline" selectedKeys={selectedKeys}>
          {currentMenu.map((menu) => (
            <Menu.Item key={menu.key} icon={menu.icon}>
              <Link to={menu.href}>
                <p>{menu.linkText}</p>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  )
}
