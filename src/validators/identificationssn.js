import { validateModel } from 'models/validate'
import ssnModel from 'models/shared/ssn'

export const validateIdentificationSSN = (data) => {
  const { verified, ssn } = data

  if (ssn && ssn.notApplicable) {
    return true
  }

  if (verified !== true) return false

  const { first, middle, last } = ssn
  const completeSSN = `${first}-${middle}-${last}`
  ssn.ssn = completeSSN

  return validateModel(ssn, ssnModel) === true
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
