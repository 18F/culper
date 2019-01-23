import compact from 'lodash/compact'
import * as validators from '../../../validators/index'

function citizenshipNavigation(formType) {

  return {
    name: 'Citizenship',
    title: 'Citizenship',
    url: 'citizenship',
    store: 'Citizenship',
    showNumber: true,
    locked: validators.formIsLocked,
    subsections: compact([
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
        validator: {
          85: validators.CitizenshipMultiple85Validator,
          86: validators.CitizenshipMultipleValidator
        }[formType]
      },
      ['86'].indexOf(formType) > -1 && {
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
    ])
  }
}

export default citizenshipNavigation
