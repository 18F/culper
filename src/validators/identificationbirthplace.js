import { validateModel } from 'models/validate'
import birthplace from 'models/shared/locations/birthplace'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

export const validateIdentificationBirthPlace = (data) => {
  const { Location } = data

  return validateModel({
    ...Location,
    country: countryString(Location && Location.country),
  }, birthplace) === true
}

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data)
  }
}
