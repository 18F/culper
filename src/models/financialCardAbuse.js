import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const financialCardAbuse = {
  Agency: { presence: true, hasValue: true },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Date: (value, attributes, attributeName, options = {}) => {
    if (options.requireFinancialCardDisciplinaryDate) {
      const { applicantBirthdate } = options

      return {
        presence: true,
        date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
      }
    }
    return {}
  },
  Reason: { presence: true, hasValue: true },
  Amount: {
    presence: true,
    hasValue: {
      validator: {
        numericality: {
          greaterThan: 0,
        },
      },
    },
  },
  Description: { presence: true, hasValue: true },
}

export default financialCardAbuse
