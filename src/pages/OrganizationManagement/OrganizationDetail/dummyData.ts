import moment from 'moment'
const dateFormat = 'YYYY/MM/DD'

const dummyData = {
  id: '0001',
  usingName: 'VAND',
  representativeName: 'Void Kondo',
  representativeGender: 'male',
  location: 'Japan',
  zipCode: '9999',
  phoneNumber: '0123456789',
  email: 'vand@creative.com',
  country: 'vn',
  workSpace: 'Vand Creative',
  tags: [{ id: '0001', text: 'タグ' }],
  remarks: 'remarks abcd',
  status: '有効',
  questionsNumber: 5,
  answerersNumber: 6,
  startDateContract: moment('2022/01/01', dateFormat),
  endDateContract: moment('2022/01/30', dateFormat),
  startDateHour: 10,
  startDateMinute: 25,
  endDateHour: 12,
  endDateMinute: 30,
  contractPoints: 12,
  contracts: [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ],
  historyData: [
    {
      id: '1',
      key: '1',
      updateDate: '2022/01/30',
      startDate: '2022/01/30 - 07:40',
      endDate: '2022/01/30 - 07:40',
      status: 'notActive',
    },
    {
      id: '2',
      key: '2',
      updateDate: '2022/01/30',
      startDate: '2022/01/30 - 07:40',
      endDate: '2022/01/30 - 07:40',
      status: 'active',
    },
    {
      id: '3',
      key: '3',
      updateDate: '2022/01/30',
      startDate: '2022/01/30 - 07:40',
      endDate: '2022/01/30 - 07:40',
      status: 'expired',
    },
  ],
  userData: {
    answerers: [
      {
        id: '00001',
        key: '00001',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '男性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00002',
        key: '00002',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '無効',
      },
      {
        id: '00003',
        key: '00003',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '無効',
      },
      {
        id: '00004',
        key: '00004',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '無効',
      },
      {
        id: '00005',
        key: '00005',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '有効',
      },
      {
        id: '00006',
        key: '00006',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '男性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00007',
        key: '00007',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '無効',
      },
      {
        id: '00008',
        key: '00008',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '有効',
      },
      {
        id: '00009',
        key: '00009',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '有効',
      },
      {
        id: '00010',
        key: '00010',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        age: 18,
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: true,
        status: '有効',
      },
    ],
    questioners: [
      {
        id: '00001',
        key: '00001',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '男性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00002',
        key: '00002',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '無効',
      },
      {
        id: '00003',
        key: '00003',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00004',
        key: '00004',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '無効',
      },
      {
        id: '00005',
        key: '00005',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00006',
        key: '00006',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '女性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '無効',
      },
      {
        id: '00007',
        key: '00007',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00008',
        key: '00008',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '男性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00009',
        key: '00009',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: '男性',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
      {
        id: '00010',
        key: '00010',
        registrationDate: '2022/01/02',
        name: '団体名団体名団体名',
        gender: 'その他',
        isHasPersonalInformation: true,
        isHasTermsOfService: false,
        status: '有効',
      },
    ],
  },
}

export default dummyData
