import * as validators from '../../../validators/index'

const navigation = {
  name: 'Citizenship',
  title: 'Citizenship',
  url: 'citizenship',
  store: 'Citizenship',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Citizenship status',
      url: 'status',
      store: 'Status',
      validator: validators.CitizenshipValidator
    },
    {
      name: 'Dual/multiple citizenship',
      url: 'multiple',
      store: 'Multiple',
      validator: validators.CitizenshipMultipleValidator
    },
    {
      name: 'Foreign passports',
      url: 'passports',
      store: 'Passports',
      validator: validators.CitizenshipPassportsValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
