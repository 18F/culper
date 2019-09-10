import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const federal = {
  Name: { presence: true, hasValue: true },
  Position: { presence: true, hasValue: true },
  Address: { presence: true, location: { validator: address } },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default federal
