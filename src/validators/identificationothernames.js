import { validateModel } from 'models/validate'
import identificationOtherNames from 'models/sections/identificationOtherNames'
import identificationOtherName from 'models/identificationOtherName'

export const validateOtherName = data => (
  validateModel(data, identificationOtherName)
)

export const validateOtherNames = data => (
  validateModel(data, identificationOtherNames)
)

/**
 * Validates a single instance of an other name
 */
export class OtherNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateOtherName(this.data) === true
  }
}
