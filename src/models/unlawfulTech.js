import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const unlawfulTech = {
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Incident: { presence: true, hasValue: true },
  Location: { presence: true, location: { validator: address } },
  Action: { presence: true, hasValue: true },
}

export default unlawfulTech
