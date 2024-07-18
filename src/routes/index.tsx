/**
 * Example route:
  {
    path: '/a',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('A'),
        element: lazyLoadRoute('A')
      },
      {
        path: 'b',
        element: lazyLoadRoute('Base'),
        children: [
          {
            index: true,
            title: titlePage('B'),
            element: lazyLoadRoute('B')
          },
          {
            path: 'c',
            title: titlePage('C'),
            element: lazyLoadRoute('C')
          },
          {
            path: ':d',
            title: titlePage('D'),
            element: lazyLoadRoute('D')
          }
        ]
      }
    ]
  }
 */

import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { uniqueId } from 'lodash'

import services from '@/services'
import RequireAuth from './RequireAuth'
import ValidateLogin from './ValidateLogin'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { Loader, ScrollToTop, TitlePage } from '@/components'
import { useAuth, useIsRoleAdmin } from '@/hooks/useAuth'
import { storageKeys } from '@/constants/storage-keys'
import { useAppDispatch } from '@/hooks/store'
import { ERoles } from '@/enums/roles'
import { setCredentials } from '@/store/auth'

type RouteType = {
  index?: boolean
  path?: string
  title?: string
  element: React.LazyExoticComponent<React.ComponentType<unknown>>
  children?: RouteType[]
}

const StorageService = services.get('StorageService')
const APP_NAME = process.env.APP_NAME || 'SDG'
const titlePage = (title: string) => `${APP_NAME} - ${title}`
const lazyLoadRoute = (pageName: string) => lazy(() => import(`../pages/${pageName}`))

const publicRoutes: RouteType[] = [
  {
    path: '/login',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Login'),
        element: lazyLoadRoute('Login'),
      },
      {
        path: 'otp',
        title: titlePage('Input OTP Key'),
        element: lazyLoadRoute('Login/OTP'),
      },
    ],
  },
  {
    path: '/password-setting',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Password Setting'),
        element: lazyLoadRoute('PasswordSetting'),
      },
      {
        path: 'time-out',
        title: titlePage('Password Setting - Time Out'),
        element: lazyLoadRoute('PasswordSetting/TimeOut'),
      },
    ],
  },
  {
    path: '/reset-password',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Reset Password'),
        element: lazyLoadRoute('ResetPassword'),
      },
      {
        path: 'time-out',
        title: titlePage('Reset Password - Time Out'),
        element: lazyLoadRoute('ResetPassword/TimeOut'),
      },
    ],
  },
]

const privateRoutes: RouteType[] = [
  {
    path: '/',
    title: titlePage('Dashboard'),
    element: lazyLoadRoute('Dashboard'),
  },
  {
    path: '/billing-management',
    title: titlePage('Billing Management'),
    element: lazyLoadRoute('BillingManagement'),
  },
  {
    path: '/question-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Question Management'),
        element: lazyLoadRoute('QuestionManagement'),
      },
      {
        path: 'new-topic',
        title: titlePage('Question Management Add'),
        element: lazyLoadRoute('QuestionManagement/TopicAdd'),
      },
      {
        path: 'new-group',
        title: titlePage('Question Management Group'),
        element: lazyLoadRoute('QuestionManagement/NewTopicGroup'),
      },
      {
        path: ':id/edit-topic',
        title: titlePage('Question Management Edit'),
        element: lazyLoadRoute('QuestionManagement/TopicEdit'),
      },
      {
        path: ':id/edit-group',
        title: titlePage('Question Management Group Edit'),
        element: lazyLoadRoute('QuestionManagement/EditTopicGroup'),
      },
    ],
  },
  {
    path: '/operation-account-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('OperationAccountManagement'),
        element: lazyLoadRoute('OperationAccountManagement'),
      },
      {
        path: 'individual-registration',
        title: titlePage('IndividualRegistration'),
        element: lazyLoadRoute('OperationAccountManagement/IndividualRegistration'),
      },
      {
        path: 'bulk-registration',
        title: titlePage('BulkRegistration'),
        element: lazyLoadRoute('OperationAccountManagement/BulkRegistration'),
      },
      {
        path: ':id/edit',
        title: titlePage('Edit Operation Account'),
        element: lazyLoadRoute('OperationAccountManagement/Edit'),
      },
    ],
  },
  {
    path: '/organization-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Organization Management'),
        element: lazyLoadRoute('OrganizationManagement'),
      },
      {
        path: 'new-organization',
        title: titlePage('Regis New Organization'),
        element: lazyLoadRoute('OrganizationManagement/RegisNewOrganization'),
      },
      {
        path: ':id/edit',
        title: titlePage('Organization Detail'),
        element: lazyLoadRoute('OrganizationManagement/OrganizationDetail'),
      },
      {
        path: ':id/edit/answerer/:userId',
        title: titlePage('User Detail'),
        element: lazyLoadRoute(
          'OrganizationManagement/OrganizationDetail/--components/RegisteredAccountTab/--components/UserDetail'
        ),
      },
      {
        path: ':id/edit/question/:questionId',
        title: titlePage('User Detail'),
        element: lazyLoadRoute(
          'OrganizationManagement/OrganizationDetail/--components/RegisteredAccountTab/--components/UserDetail'
        ),
      },
      {
        path: ':id/edit/answer/:questionId',
        title: titlePage('Answer List'),
        element: lazyLoadRoute(
          'OrganizationManagement/OrganizationDetail/--components/AnswerTab/AnswerList'
        ),
      },
    ],
  },
]

const adminPrivateRoutes: RouteType[] = [
  {
    path: '/',
    title: titlePage('Dashboard'),
    element: lazyLoadRoute('Dashboard'),
  },
  {
    path: '/operation-account-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('OperationAccountManagement'),
        element: lazyLoadRoute('OperationAccountManagementAdmin'),
      },
      {
        path: 'individual-registration',
        title: titlePage('IndividualRegistration'),
        element: lazyLoadRoute('OperationAccountManagementAdmin/IndividualRegistration'),
      },
      {
        path: 'bulk-registration',
        title: titlePage('BulkRegistration'),
        element: lazyLoadRoute('OperationAccountManagementAdmin/BulkRegistration'),
      },
      {
        path: ':id/edit',
        title: titlePage('Edit Operation Account'),
        element: lazyLoadRoute('OperationAccountManagementAdmin/Edit'),
      },
    ],
  },
  {
    path: '/access-log-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Access Log Management'),
        element: lazyLoadRoute('AccessLogManagement'),
      },
      {
        path: ':id',
        title: titlePage('Access Log Management Detail'),
        element: lazyLoadRoute('AccessLogManagement/Detail'),
      },
    ],
  },
  {
    path: '/privacy-policy-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Privacy Policy Management'),
        element: lazyLoadRoute('PrivacyPolicyManagement'),
      },
      {
        path: 'new-privacy-policy-management',
        title: titlePage('Create New PrivacyPolicyManagement'),
        element: lazyLoadRoute('PrivacyPolicyManagement/PolicyForm'),
      },
      {
        path: ':id/review',
        title: titlePage('Review PrivacyPolicyManagement'),
        element: lazyLoadRoute('PrivacyPolicyManagement/PolicyForm'),
      },
    ],
  },
  {
    path: '/terms-of-use-management',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Terms Of Use Management'),
        element: lazyLoadRoute('TermsOfUseManagement'),
      },
      {
        path: 'new-term-of-use-management',
        title: titlePage('Create New Terms Of Use Management'),
        element: lazyLoadRoute('TermsOfUseManagement/TermForm'),
      },
      {
        path: ':id/review',
        title: titlePage('Review Terms Of Use Management'),
        element: lazyLoadRoute('TermsOfUseManagement/TermForm'),
      },
    ],
  },
]

const NotFoundPage = lazyLoadRoute('NotFound')

const renderRoutes = (routes: RouteType[]) =>
  routes.map(({ element: Element, ...pageOptions }) => {
    const routeOptions = pageOptions.index ? { index: true } : { path: pageOptions.path }

    return (
      <Route
        key={uniqueId('__page__')}
        path={pageOptions.path}
        element={
          <Suspense fallback={<Loader mode="reverse-color" />}>
            <TitlePage title={pageOptions.title}>
              <Element />
            </TitlePage>
          </Suspense>
        }
        {...routeOptions}
      >
        {pageOptions?.children?.map(({ element: ChildrenElement, ...childrenOption }) =>
          childrenOption.index ? (
            <Route
              key={uniqueId('__page__')}
              index
              element={
                <Suspense fallback={<Loader mode="reverse-color" />}>
                  <TitlePage title={childrenOption.title}>
                    <ChildrenElement />
                  </TitlePage>
                </Suspense>
              }
            />
          ) : (
            <Route
              key={uniqueId('__page__')}
              path={childrenOption.path}
              element={
                <Suspense fallback={<Loader mode="reverse-color" />}>
                  <TitlePage title={childrenOption.title}>
                    <ChildrenElement />
                  </TitlePage>
                </Suspense>
              }
            >
              {childrenOption?.children && renderRoutes(childrenOption.children)}
            </Route>
          )
        )}
      </Route>
    )
  })

const RoutesApp = () => {
  const [routes, setRoutes] = useState<RouteType[]>([])
  const isAdmin = useIsRoleAdmin()
  const dispatch = useAppDispatch()
  const { user: authProfileStore } = useAuth()

  const authProfileLocal = StorageService.get(storageKeys.authProfile)
  const isAuthenticated = !!authProfileLocal

  useEffect(() => {
    // TODO: fetch profile
    if (isAuthenticated && !authProfileStore) {
      const username = authProfileLocal?.user?.username
      const fakeUser = {
        token: 'token',
        user: {
          username,
          role: username === 'admin@sdg.com' ? ERoles.SDG_ADMIN : ERoles.SDG_MANAGER,
        },
      }

      dispatch(setCredentials(fakeUser))
      StorageService.set(storageKeys.authProfile, fakeUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProfileLocal])

  useEffect(() => {
    const routeList = isAdmin ? adminPrivateRoutes : privateRoutes
    setRoutes(routeList)
  }, [isAdmin])

  return (
    <BrowserRouter>
      <ScrollToTop>
        {isAdmin === null && isAuthenticated ? (
          <Loader />
        ) : (
          <>
            <Routes>
              <Route
                element={
                  <ValidateLogin>
                    <AuthLayout />
                  </ValidateLogin>
                }
              >
                {renderRoutes(publicRoutes)}
              </Route>
              <Route
                element={
                  <RequireAuth>
                    <MainLayout />
                  </RequireAuth>
                }
              >
                {renderRoutes(routes)}
              </Route>
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader />}>
                    <TitlePage title={titlePage('Page not found')}>
                      <NotFoundPage />
                    </TitlePage>
                  </Suspense>
                }
              />
            </Routes>
          </>
        )}
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default RoutesApp
