import name from 'models/shared/name'
import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessVentures = {
  Name: { presence: true, model: { validator: name } },
  Address: { presence: true, location: { validator: address } },
  Citizenship: { presence: true, country: true },
  Description: { presence: true, hasValue: true },
  Relationship: { presence: true, hasValue: true },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Association: { presence: true, hasValue: true },
  Position: { presence: true, hasValue: true },
  Service: { presence: true, hasValue: true },
  Support: { presence: true, hasValue: true },
  Compensation: { presence: true, hasValue: true },
}

export default foreignBusinessVentures
