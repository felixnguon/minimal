import React, { useState } from 'react'
import { Moment } from 'moment'
import ContractEditForm from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab/ContractEditForm'
import ContractRenewalForm from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab/ContractRenewalForm'

type ContractFile = {
  uid: string
  name: string
  status?: string
  url: string
}

type Tag = {
  id: string
  text: string
}

type ValuesType = {
  id?: string
  usingName: string
  representativeName: string
  representativeGender: string
  location: string
  zipCode: string
  phoneNumber: string
  email: string
  country: string
  workSpace: string
  tags: Tag[]
  remarks: string
  status: string
  questionsNumber: number
  answerersNumber: number
  startDateContract: Moment
  endDateContract: Moment
  startDateHour: number
  startDateMinute: number
  endDateHour: number
  endDateMinute: number
  contractPoints: number
  contracts: ContractFile[]
  historyData: Array<any>
}

type PropsType = {
  initialValues: ValuesType
  onHandleCancel: () => void
}

const OrganizationDetailForm: React.FC<PropsType> = ({ initialValues, onHandleCancel }) => {
  const [isRenewingContract, setIsRenewingContract] = useState<boolean>(false)
  return (
    <div>
      {isRenewingContract ? (
        <ContractRenewalForm
          // initialValues={initialValues}
          onCancelRenewalContract={() => setIsRenewingContract(false)}
        />
      ) : (
        <ContractEditForm
          initialValues={initialValues}
          onHandleCancel={onHandleCancel}
          onRenewalContract={() => setIsRenewingContract(true)}
        />
      )}
    </div>
  )
}

export default OrganizationDetailForm
