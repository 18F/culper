import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessVoting = {
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Country: { presence: true, country: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessVoting
