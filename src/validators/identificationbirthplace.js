import { validateModel } from 'models/validate'
import birthplace from 'models/shared/locations/birthplace'

export const validateIdentificationBirthPlace = (data) => {
  const applicantBirthPlaceModel = {
    Location: {
      model: { validator: birthplace },
    },
  }

  return validateModel(data, applicantBirthPlaceModel) === true
}

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data)
  }
}
