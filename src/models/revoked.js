import { DEFAULT_LATEST } from 'constants/dateLimits'

const revoked = {
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Agency: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
}

export default revoked
