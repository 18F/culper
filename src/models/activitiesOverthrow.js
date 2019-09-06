import { DEFAULT_LATEST } from 'constants/dateLimits'

const activitiesOverthrow = {
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Reasons: { presence: true, hasValue: true },
}

export default activitiesOverthrow
