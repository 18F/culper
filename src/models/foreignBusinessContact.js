import name from 'models/shared/name'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const subsequentContact = {
  Subsequent: { presence: true, hasValue: true },
  Recent: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Future: { presence: true, hasValue: true },
}

const foreignBusinessContact = {
  Name: { presence: true, model: { validator: name } },
  Location: { presence: true, location: { validator: usCityStateZipInternationalCity } },
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Governments: { presence: true, country: true },
  Establishment: { presence: true, hasValue: true },
  Representatives: { presence: true, hasValue: true },
  Purpose: { presence: true, hasValue: true },
  SubsequentContacts: {
    presence: true,
    branchCollection: { validator: subsequentContact },
  },
}

export default foreignBusinessContact
