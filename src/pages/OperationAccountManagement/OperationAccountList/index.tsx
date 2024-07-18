import React from 'react'
import OperationAccountHeader from './OperationAccountHeader'
import OperationAccountTable from './OperationAccountTable'

import styles from './OperationAccountList.module.scss'

const OperationAccountList = () => {
  return (
    <div className={styles.wrapper}>
      <OperationAccountHeader />
      <OperationAccountTable />
    </div>
  )
}

export default OperationAccountList
