import { DEFAULT_LATEST } from 'constants/dateLimits'

const debarred = {
  Agency: { presence: true, hasValue: true },
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Explanation: { presence: true, hasValue: true },
}

export default debarred
