import { DEFAULT_LATEST } from 'constants/dateLimits'

const financialGambling = {
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Losses: {
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
  Actions: { presence: true, hasValue: true },
}

export default financialGambling
