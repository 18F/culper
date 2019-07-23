import { validateModel } from 'models/validate'
import identificationDateOfBirth from 'models/sections/identificationDateOfBirth'

export const validateIdentificationBirthDate = (data) => {
  return validateModel(data, identificationDateOfBirth) === true
}

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
