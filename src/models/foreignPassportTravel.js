import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignPassportTravel = {
  Country: { presence: true, country: true },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default foreignPassportTravel
