import { validateModel } from 'models/validate'
import identificationName from 'models/sections/identificationName'

export const validateIdentificationName = (data) => {
  return validateModel(data, identificationName) === true
}

/** LEGACY */
export default class IdentificationNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationName(this.data)
  }
}
