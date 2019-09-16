import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const overthrow = {
  Organization: { presence: true, hasValue: true },
  Address: { presence: true, location: { validator: address } },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Positions: (value, attributes) => {
    if (attributes.PositionsNotApplicable
      && attributes.PositionsNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  Contributions: (value, attributes) => {
    if (attributes.ContributionsNotApplicable
      && attributes.ContributionsNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  Reasons: { presence: true, hasValue: true },
}

export default overthrow
