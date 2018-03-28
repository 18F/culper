import { validSSN } from './helpers'

export default class IdentificationSSNValidator {
  constructor (data = {}) {
    this.ssn = data.ssn || {}
    this.verified = data.verified || false

    if (this.ssn.notApplicable) {
      this.verified = true
    }
  }

  isValid () {
    return validSSN(this.ssn) && this.verified
  }
}
