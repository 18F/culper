import { validateModel } from 'models/validate'
import birthplace from 'models/shared/locations/birthplace'

export const validateIdentificationBirthPlace = (data) => {

  const applicantBirthPlaceModel = {
    Location: {
      presence: true,
      location: { validator: birthplace, requireCity: !data.Location.county, requireCounty: !data.Location.city },
    },
  }

  return validateModel(data, applicantBirthPlaceModel)
}

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data) === true
  }
}
