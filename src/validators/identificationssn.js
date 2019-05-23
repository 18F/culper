import { validateModel } from 'models/validate'

export const validateIdentificationSSN = (data) => {
  const { verified, ssn } = data

  if (ssn && ssn.notApplicable) {
    return true
  }

  if (verified !== true) return false

  const ssnModel = {
    ssn: {
      presence: true,
      ssn: true,
    },
  }

  return validateModel({ ssn }, ssnModel) === true
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
