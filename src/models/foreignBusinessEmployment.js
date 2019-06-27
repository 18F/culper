import name from 'models/shared/name'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import { hasYesOrNo } from 'models/validate'

const foreignBusinessEmployment = {
  Name: { presence: true, model: { validator: name } },
  Description: { presence: true, hasValue: true },
  // TODO must be >= DOB, <= NOW
  Date: { presence: true, date: true },
  Address: { presence: true, location: { validator: usCityStateZipInternationalCity } },
  Accepted: { presence: true, hasValue: { validator: hasYesOrNo } },
  Explanation: { presence: true, hasValue: true },
}

export default foreignBusinessEmployment
