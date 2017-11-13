import { validSSN } from './helpers'

export default class IdentificationSSNValidator {
  constructor (data = {}) {
    this.ssn = data.ssn || {}
    this.verified = data.verified || false
  }

  isValid () {
    return validSSN(this.ssn) && this.verified
  }
}
