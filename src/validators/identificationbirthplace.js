import { validateModel } from 'models/validate'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'

export const validateIdentificationBirthPlace = (data) => {
  return validateModel(data, identificationPlaceOfBirth) === true
}

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthPlace(this.data)
  }
}
