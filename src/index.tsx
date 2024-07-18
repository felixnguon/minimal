import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setupStore } from '@/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import locale from '@/locale'

const store = setupStore()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()
