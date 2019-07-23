import { validateModel } from 'models/validate'
import identificationSSN from 'models/sections/identificationSSN'

export const validateIdentificationSSN = (data) => {
  const { verified, ssn } = data

  if (ssn && ssn.notApplicable) {
    return true
  }

  if (verified !== true) return false

  return validateModel({ ssn }, identificationSSN) === true
}

/** LEGACY */
export default class IdentificationSSNValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationSSN(this.data)
  }
}
