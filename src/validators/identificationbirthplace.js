import { validateModel } from 'models/validate'
import birthplace from 'models/shared/locations/birthplace'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

export const validateIdentificationBirthPlace = (data) => {
  const { Location } = data

  Location.country = countryString(Location.country)

  return validateModel(Location, birthplace) === true
}

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data)
  }
}
