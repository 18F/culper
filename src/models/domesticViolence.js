import offense from 'models/shared/locations/offense'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const domesticViolence = {
  CourtAddress: {
    presence: true,
    location: { validator: offense },
  },
  CourtName: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
  Issued: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default domesticViolence
