import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessPolitical = {
  Position: { presence: true, hasValue: true },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Country: { presence: true, country: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessPolitical
