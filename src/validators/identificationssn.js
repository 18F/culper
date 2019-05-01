import { validateModel } from 'models/validate'
import ssn from 'models/shared/ssn'

export const validateIdentificationSSN = data => (
  validateModel(data, ssn) === true
)

export default class IdentificationSSNValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationSSN(this.data)
  }
}
