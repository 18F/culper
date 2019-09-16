import name from 'models/shared/name'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessEmployment = {
  Name: { presence: true, model: { validator: name } },
  Description: { presence: true, hasValue: true },
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Address: { presence: true, location: { validator: usCityStateZipInternationalCity } },
  Accepted: { presence: true, hasValue: { validator: hasYesOrNo } },
  Explanation: { presence: true, hasValue: true },
}

export default foreignBusinessEmployment
